import { useState } from "react";
import { MouseEvent } from "react";

import useMovieLibrary from "../../../../../hooks/useMovieLibrary";
import { LibraryMovie } from "../../../../../types/Movie";
import styles from "./Rating.module.css";

type RatingProps = {
  movie: LibraryMovie;
};

const Rating = ({ movie }: RatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const { rateLibraryMovie } = useMovieLibrary();

  const handleRating = (
    event: MouseEvent<HTMLSpanElement>,
    ratingValue: number,
  ) => {
    event.stopPropagation();
    rateLibraryMovie(movie.tmdbMovieId, ratingValue);
    setHoverRating(ratingValue);
  };

  const renderStars = () => {
    const stars = [];
    const rating = hoverRating || movie.rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={styles.star}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(movie.rating || 0)}
          onClick={(event) => handleRating(event, i)}
        >
          {i <= rating ? "★" : "☆"}
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.starscontainer} ${
          !movie.rating && !hoverRating ? styles.unrated : ""
        }`}
        onMouseLeave={() => setHoverRating(movie.rating || 0)}
      >
        {renderStars()}
      </div>
    </div>
  );
};

export default Rating;
