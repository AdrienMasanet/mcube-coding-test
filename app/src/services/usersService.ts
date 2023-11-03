import { API_DOMAIN, API_PORT, API_PROTOCOL } from "../config";
import { LibraryMovie } from "../types/Movie";
import MoviesSortBy from "../types/MoviesSortBy";
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

  getMovieLibrary: async (
    orderBy: MoviesSortBy,
  ): Promise<LibraryMovie[] | null> => {
    try {
      const currentUserId = localStorage.getItem("currentUserId");
      if (!currentUserId) return null;

      const response = await fetch(
        `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}/me/my-library?orderBy=${orderBy}`,
        {
          method: "GET",
          headers: {
            userId: currentUserId,
          },
        },
      );

      if (response.status !== 200) throw new Error("API request failed");
      const result: LibraryMovie[] = await response.json();
      return result;
    } catch {
      throw new Error("API request failed");
    }
  },

  addMovieToLibrary: async (
    tmdbMovieId: number,
  ): Promise<LibraryMovie | null> => {
    try {
      const currentUserId = localStorage.getItem("currentUserId");
      if (!currentUserId) return null;

      console.log(
        currentUserId,
        JSON.stringify({
          movieId: tmdbMovieId,
        }),
      );

      const response = await fetch(
        `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}/me/add-movie-to-library`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userid: currentUserId,
          },
          body: JSON.stringify({
            movieId: tmdbMovieId,
          }),
        },
      );

      if (response.status === 304) return null;
      if (response.status !== 201) throw new Error("API request failed");
      const result: LibraryMovie | null = await response.json();
      return result;
    } catch {
      throw new Error("API request failed");
    }
  },

  removeMovieFromLibrary: async (tmdbMovieId: number): Promise<void> => {
    try {
      const currentUserId = localStorage.getItem("currentUserId");
      if (!currentUserId) return;

      const response = await fetch(
        `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}/me/remove-movie-from-library?movieid=${tmdbMovieId}`,
        {
          method: "DELETE",
          headers: {
            userid: currentUserId,
          },
        },
      );

      if (response.status !== 204) throw new Error("API request failed");
    } catch {
      throw new Error("API request failed");
    }
  },
};

export default usersService;
