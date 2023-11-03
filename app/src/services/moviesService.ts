import { API_DOMAIN, API_PORT, API_PROTOCOL } from "../config";
import { MovieBase, MovieDetailed } from "../types/Movie";

const moviesService = {
  searchMovies: async (searchString: string): Promise<MovieBase[]> => {
    if (!searchString) return [];

    try {
      const response = await fetch(
        `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}/movies/?search=${searchString}`,
        { method: "GET" },
      );

      if (response.status !== 200) throw new Error("API request failed");

      const result: MovieBase[] = await response.json();
      return result;
    } catch {
      throw new Error("API request failed");
    }
  },

  getMovieDetails: async (tmdbMovieId: number): Promise<MovieDetailed> => {
    try {
      const response = await fetch(
        `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}/movies/${tmdbMovieId}`,
        { method: "GET" },
      );

      if (response.status !== 200) throw new Error("API request failed");

      const result: MovieDetailed = await response.json();
      return result;
    } catch {
      throw new Error("API request failed");
    }
  },

  getRelatedMovies: async (tmdbMovieId: number): Promise<MovieBase[]> => {
    try {
      const response = await fetch(
        `${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}/movies/${tmdbMovieId}/related`,
        { method: "GET" },
      );

      if (response.status !== 200) throw new Error("API request failed");

      const result: MovieBase[] = await response.json();
      return result;
    } catch {
      throw new Error("API request failed");
    }
  },
};

export default moviesService;
