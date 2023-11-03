import { LibraryMovie, MovieBase } from "../../../types/Movie";
import MovieCard from "./MovieCard/MovieCard";
import styles from "./MovieGrid.module.css";

type MovieGridProps = {
  movies: MovieBase[] | LibraryMovie[];
  personalLibraryMovieGrid?: boolean;
};

const MovieGrid = ({ movies, personalLibraryMovieGrid }: MovieGridProps) => {
  return (
    <div className={styles.container}>
      {movies.map((movie: MovieBase) => (
        <MovieCard
          key={movie.tmdbMovieId}
          movie={movie}
          personalLibraryMovieCard={personalLibraryMovieGrid}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
