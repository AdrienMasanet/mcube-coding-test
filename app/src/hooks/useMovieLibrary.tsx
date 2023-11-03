import { useContext } from "react";

import {
  MovieLibraryActionsContext,
  MovieLibraryContext,
} from "../context/MovieLibraryContext";

const useMovieLibrary = () => {
  const movieLibrary = useContext(MovieLibraryContext);
  const { addToLibrary, removeFromLibrary, setSortingOrder } = useContext(
    MovieLibraryActionsContext,
  );

  return { movieLibrary, addToLibrary, removeFromLibrary, setSortingOrder };
};

export default useMovieLibrary;
