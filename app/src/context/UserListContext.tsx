import { createContext, useEffect, useState } from "react";

import usersService from "../services/usersService";
import User from "../types/User";

export const UserListContext = createContext<User[]>([]);

export const UserListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userList, setUserList] = useState<User[]>([]);

  const refreshUserList = async () => {
    const availableUsers: User[] = await usersService.getUsers();
    setUserList(availableUsers);
  };

  useEffect(() => {
    refreshUserList();
  }, []);

  return (
    <UserListContext.Provider value={userList}>
      {children}
    </UserListContext.Provider>
  );
};
