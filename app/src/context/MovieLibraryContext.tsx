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
      if (newLibraryMovie) setMovieLibrary([...movieLibrary, newLibraryMovie]);
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

  useEffect(() => {
    const getCurrentMovieLibrary = async () => {
      const currentMovieLibrary =
        await usersService.getMovieLibrary(sortingOrder);
      if (currentMovieLibrary) setMovieLibrary(currentMovieLibrary);
    };

    if (loggedInUser) getCurrentMovieLibrary();
  }, [loggedInUser, sortingOrder]);

  useEffect(() => {
    console.log(movieLibrary);
  }, [movieLibrary]);

  return (
    <MovieLibraryContext.Provider value={movieLibrary}>
      <MovieLibraryActionsContext.Provider
        value={{ addToLibrary, removeFromLibrary, setSortingOrder }}
      >
        {children}
      </MovieLibraryActionsContext.Provider>
    </MovieLibraryContext.Provider>
  );
};
