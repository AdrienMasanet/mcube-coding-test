import { useContext } from "react";

import {
  MovieLibraryActionsContext,
  MovieLibraryContext,
} from "../context/MovieLibraryContext";

const useMovieLibrary = () => {
  const movieLibrary = useContext(MovieLibraryContext);
  const { addToLibrary, removeFromLibrary, sortingOrder, setSortingOrder } =
    useContext(MovieLibraryActionsContext);

  const isMovieInLibrary = (tmdbMovieId: number) => {
    return movieLibrary.some((movie) => movie.tmdbMovieId === tmdbMovieId);
  };

  return {
    movieLibrary,
    addToLibrary,
    removeFromLibrary,
    sortingOrder,
    setSortingOrder,
    isMovieInLibrary,
  };
};

export default useMovieLibrary;
