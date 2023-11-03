import { TMDB_API_KEY, TMDB_BASE_URL } from "../config";
import { TMDB_IMAGES_PATH } from "../config";
import { MovieBase } from "../types/Movie";
import { TMDBMovieDetails, TMDBResponse } from "../types/TMDBApi";

const moviesServices = {
  getMoviesBySearch: async (searchString: string): Promise<MovieBase[]> => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}search/movie?query=${searchString}&api_key=${TMDB_API_KEY}`,
      );
      if (response.status !== 200) throw new Error("TMDB request failed");
      const result: TMDBResponse = await response.json();
      const parsedMovies: MovieBase[] = result.results.map(
        (tmdbMovie) =>
          ({
            title: tmdbMovie.title,
            overview: tmdbMovie.overview,
            posterPath: `${TMDB_IMAGES_PATH}${tmdbMovie.poster_path}`,
            releaseDate: tmdbMovie.release_date
              ? new Date(tmdbMovie.release_date)
              : null,
            tmdbMovieId: tmdbMovie.id,
          }) as MovieBase,
      );
      return parsedMovies;
    } catch (e) {
      console.log(e);
      return [];
    }
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
