import { SyntheticEvent } from "react";

import { MovieBase } from "../../../../types/Movie";
import styles from "./MovieCard.module.css";

type MovieCardProps = {
  movie: MovieBase;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  const handleImageErrorFallback = (
    event: SyntheticEvent<HTMLImageElement>,
  ) => {
    (event.target as HTMLImageElement).src =
      "/images/movie-poster-fallback.webp";
  };

  return (
    <div className={styles.container}>
      <img
        onError={handleImageErrorFallback}
        className={styles.poster}
        src={movie.posterPath}
        alt={`${movie.title} poster`}
      />
    </div>
  );
};

export default MovieCard;
