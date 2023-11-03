import { TMDB_API_KEY, TMDB_BASE_URL } from "../config";
import { TMDB_IMAGES_PATH } from "../config";
import { MovieBase, MovieDetailed } from "../types/Movie";
import {
  TMDBMovieBase,
  TMDBMovieDetailed,
  TMDBResponse,
} from "../types/TMDBApi";

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

  getMovieById: async (tmdbMovieId: number): Promise<MovieDetailed> => {
    const response = await fetch(
      `${TMDB_BASE_URL}movie/${tmdbMovieId}?api_key=${TMDB_API_KEY}`,
    );
    if (response.status !== 200) throw new Error("TMDB request failed");
    const result: TMDBMovieDetailed = await response.json();
    const parsedMovie: MovieDetailed = {
      title: result.title,
      overview: result.overview,
      posterPath: `${TMDB_IMAGES_PATH}${result.poster_path}`,
      releaseDate: result.release_date
        ? new Date(result.release_date)
        : undefined,
      tmdbMovieId: result.id,
    } as MovieDetailed;
    return parsedMovie;
  },

  getRelatedMovies: async (tmdbMovieId: number): Promise<TMDBMovieBase> => {
    const response = await fetch(
      `${TMDB_BASE_URL}movie/${tmdbMovieId}/similar?api_key=${TMDB_API_KEY}`,
    );
    if (response.status !== 200) throw new Error("TMDB request failed");
    const result = await response.json();
    return result;
  },
};

export default moviesServices;
