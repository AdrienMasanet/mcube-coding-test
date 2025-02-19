import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

import useMovieLibrary from "../../../../hooks/useMovieLibrary";
import { LibraryMovie, MovieBase } from "../../../../types/Movie";
import styles from "./MovieCard.module.css";
import Rating from "./Rating/Rating";

type MovieCardProps = {
  movie: MovieBase | LibraryMovie;
  personalLibraryMovieCard?: boolean;
};

const MovieCard = ({ movie, personalLibraryMovieCard }: MovieCardProps) => {
  const navigate = useNavigate();
  const { removeFromLibrary } = useMovieLibrary();

  const handleRemoveFromLibrary: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    event.stopPropagation();
    removeFromLibrary(movie.tmdbMovieId);
  };

  const handleImageErrorFallback = (
    event: SyntheticEvent<HTMLImageElement>,
  ) => {
    (event.target as HTMLImageElement).src =
      "/images/movie-poster-fallback.webp";
  };

  return (
    <div
      className={styles.container}
      onClick={() =>
        navigate("/movie-details", {
          state: { tmdbMovieId: movie.tmdbMovieId },
        })
      }
    >
      {personalLibraryMovieCard && (
        <>
          <div
            className={styles.removebutton}
            onClick={handleRemoveFromLibrary}
          >
            ✖
          </div>
          <Rating movie={movie as LibraryMovie} />
        </>
      )}
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
