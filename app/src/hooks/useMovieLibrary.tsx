import { useContext } from "react";

import {
  MovieLibraryActionsContext,
  MovieLibraryContext,
} from "../context/MovieLibraryContext";

const useMovieLibrary = () => {
  const movieLibrary = useContext(MovieLibraryContext);
  const { addToLibrary, removeFromLibrary, sortingOrder, setSortingOrder } =
    useContext(MovieLibraryActionsContext);

  return {
    movieLibrary,
    addToLibrary,
    removeFromLibrary,
    sortingOrder,
    setSortingOrder,
  };
};

export default useMovieLibrary;
