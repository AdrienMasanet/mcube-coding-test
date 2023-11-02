import { TMDB_API_KEY, TMDB_BASE_URL } from "../config";
import { TMDBMovieBase, TMDBMovieDetails } from "../types/TMDBApi";

const moviesServices = {
  getMoviesBySearch: async (searchString: string): Promise<TMDBMovieBase[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}search/movie?query=${searchString}&api_key=${TMDB_API_KEY}`,
    );
    if (response.status !== 200) throw new Error("TMDB request failed");
    const result: TMDBMovieBase[] = await response.json();
    return result;
  },

  getMovieById: async (tmdbMovieId: number): Promise<TMDBMovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}movie/${tmdbMovieId}?api_key=${TMDB_API_KEY}`,
    );
    if (response.status !== 200) throw new Error("TMDB request failed");
    const result = await response.json();
    return result;
  },

  getRelatedMovies: async (tmdbMovieId: number): Promise<TMDBMovieDetails> => {
    const response = await fetch(
      `${TMDB_BASE_URL}movie/${tmdbMovieId}/similar?api_key=${TMDB_API_KEY}`,
    );
    if (response.status !== 200) throw new Error("TMDB request failed");
    const result = await response.json();
    return result;
  },
};

export default moviesServices;
