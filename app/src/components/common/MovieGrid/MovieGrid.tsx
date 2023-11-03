import { MovieBase } from "../../../types/Movie";
import MovieCard from "./MovieCard/MovieCard";
import styles from "./MovieGrid.module.css";

type MovieGridProps = {
  movies: MovieBase[];
};

const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className={styles.container}>
      {movies.map((movie: MovieBase) => (
        <MovieCard key={movie.tmdbMovieId} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
