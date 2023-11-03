import { useState } from "react";

import moviesService from "../../../services/moviesService";
import { MovieBase } from "../../../types/Movie";
import styles from "./MovieSearchPage.module.css";
import SearchBar from "./SearchBar/SearchBar";

const MovieSearchPage = () => {
  const [movies, setMovies] = useState<MovieBase[]>();

  const fetchMovies = async (searchString: string) => {
    const fetchedMovies: MovieBase[] =
      await moviesService.searchMovies(searchString);
    setMovies(fetchedMovies);
  };

  return (
    <div className={styles.container}>
      <SearchBar searchForMovies={fetchMovies} />
    </div>
  );
};

export default MovieSearchPage;
