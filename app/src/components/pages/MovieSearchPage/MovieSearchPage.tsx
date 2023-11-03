import { useState } from "react";

import useAuthentication from "../../../hooks/useAuthentication";
import moviesService from "../../../services/moviesService";
import { MovieBase } from "../../../types/Movie";
import MovieGrid from "../../common/MovieGrid/MovieGrid";
import styles from "./MovieSearchPage.module.css";
import SearchBar from "./SearchBar/SearchBar";

const MovieSearchPage = () => {
  const [movies, setMovies] = useState<MovieBase[]>([]);
  const { loggedInUser } = useAuthentication();

  const fetchMovies = async (searchString: string) => {
    const fetchedMovies: MovieBase[] =
      await moviesService.searchMovies(searchString);
    setMovies(fetchedMovies);
  };

  return (
    <div className={styles.container}>
      <SearchBar searchForMovies={fetchMovies} />
      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className={styles.nosearchcontainer}>
          <p className={styles.nosearchtext1}>
            Hello {loggedInUser && loggedInUser?.name}!
          </p>
          <p className={styles.nosearchtext2}>
            Start searching for movies using the search bar 🎬🍿
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieSearchPage;
