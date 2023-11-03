import { API_DOMAIN, API_PORT, API_PROTOCOL } from "../config";
import User from "../types/User";

const usersService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(
        `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}/users`,
        { method: "GET" },
      );

      if (response.status !== 200) throw new Error("API request failed");
      const result: User[] = await response.json();
      return result;
    } catch {
      throw new Error("API request failed");
    }
  },

  getAuthenticatedUser: async (): Promise<User | null> => {
    try {
      const currentUserId = localStorage.getItem("currentUserId");
      if (!currentUserId) return null;

      const response = await fetch(
        `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}/me`,
        {
          method: "GET",
          headers: {
            userid: currentUserId,
          },
        },
      );

      if (response.status === 401) return null;
      if (response.status !== 200) throw new Error("API request failed");
      const result: User = await response.json();
      return result;
    } catch {
      throw new Error("API request failed");
    }
  },
};

export default usersService;
