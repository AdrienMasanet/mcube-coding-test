import { TMDB_API_KEY, TMDB_BASE_URL } from "../config";

const moviesServices = {
  getMoviesBySearch: async (searchString: string): Promise<JSON> => {
    const response = await fetch(
      `${TMDB_BASE_URL}search/movie?query=${searchString}&api_key=${TMDB_API_KEY}`,
    );
    const result = await response.json();
    return result;
  },
};

export default moviesServices;
