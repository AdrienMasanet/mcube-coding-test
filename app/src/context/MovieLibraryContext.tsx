import { createContext, useEffect, useState } from "react";

import useAuthentication from "../hooks/useAuthentication";
import usersService from "../services/usersService";
import { LibraryMovie } from "../types/Movie";
import MoviesSortBy from "../types/MoviesSortBy";

export const MovieLibraryContext = createContext<LibraryMovie[]>([]);
export const MovieLibraryActionsContext = createContext({
  addToLibrary: (tmdbMovieId: number): Promise<void> => {
    tmdbMovieId;
    return Promise.resolve();
  },
  removeFromLibrary: (tmdbMovieId: number): Promise<void> => {
    tmdbMovieId;
    return Promise.resolve();
  },
  rateLibraryMovie: (tmdbMovieId: number, rating: number): Promise<void> => {
    tmdbMovieId;
    rating;
    return Promise.resolve();
  },
  sortingOrder: MoviesSortBy.ADDED_DATE,
  setSortingOrder: (sortingOrder: MoviesSortBy): void => {
    sortingOrder;
  },
});

export const MovieLibraryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [movieLibrary, setMovieLibrary] = useState<LibraryMovie[]>([]);
  const [sortingOrder, setSortingOrder] = useState<MoviesSortBy>(
    MoviesSortBy.ADDED_DATE,
  );
  const { loggedInUser } = useAuthentication();

  const addToLibrary = async (tmdbMovieId: number) => {
    try {
      const newLibraryMovie: LibraryMovie | null =
        await usersService.addMovieToLibrary(tmdbMovieId);
      if (newLibraryMovie) setMovieLibrary([newLibraryMovie, ...movieLibrary]);
    } catch {
      console.error("Error while trying to add movie to library");
    }
  };

  const removeFromLibrary = async (tmdbMovieId: number) => {
    try {
      await usersService.removeMovieFromLibrary(tmdbMovieId);
      setMovieLibrary(
        movieLibrary.filter((movie) => movie.tmdbMovieId !== tmdbMovieId),
      );
    } catch {
      console.error("Error while trying to remove movie from library");
    }
  };

  const rateLibraryMovie = async (tmdbMovieId: number, rating: number) => {
    try {
      const ratedLibraryMovie: LibraryMovie | null =
        await usersService.rateMovieFromLibrary(tmdbMovieId, rating);
      console.log(rateLibraryMovie);
      if (ratedLibraryMovie) {
        setMovieLibrary(
          movieLibrary.map((movie) =>
            movie.tmdbMovieId === tmdbMovieId ? { ...movie, rating } : movie,
          ),
        );
      }
    } catch {
      console.error("Error while trying to rate movie from library");
    }
  };

  useEffect(() => {
    setMovieLibrary([]);
    const getCurrentMovieLibrary = async () => {
      const currentMovieLibrary =
        await usersService.getMovieLibrary(sortingOrder);
      if (currentMovieLibrary) setMovieLibrary(currentMovieLibrary);
    };

    if (loggedInUser) getCurrentMovieLibrary();
  }, [loggedInUser, sortingOrder]);

  return (
    <MovieLibraryContext.Provider value={movieLibrary}>
      <MovieLibraryActionsContext.Provider
        value={{
          addToLibrary,
          removeFromLibrary,
          rateLibraryMovie,
          sortingOrder,
          setSortingOrder,
        }}
      >
        {children}
      </MovieLibraryActionsContext.Provider>
    </MovieLibraryContext.Provider>
  );
};
