import { createContext, useEffect, useState } from "react";

import usersService from "../services/usersService";
import User from "../types/User";

export const AuthenticationContext = createContext<User | null>(null);
export const AuthenticationActionsContext = createContext({
  login: (userId: string): Promise<void> => {
    userId;
    return Promise.resolve();
  },
});

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const login = async (userId: string) => {
    localStorage.setItem("currentUserId", userId);
    const newLoggedInUser = await usersService.getAuthenticatedUser();
    setLoggedInUser(newLoggedInUser);
  };

  useEffect(() => {
    const getCurrentlyAuthenticatedUser = async () => {
      const currentlyLoggedInUser = await usersService.getAuthenticatedUser();
      setLoggedInUser(currentlyLoggedInUser);
    };
    getCurrentlyAuthenticatedUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={loggedInUser}>
      <AuthenticationActionsContext.Provider value={{ login }}>
        {children}
      </AuthenticationActionsContext.Provider>
    </AuthenticationContext.Provider>
  );
};
