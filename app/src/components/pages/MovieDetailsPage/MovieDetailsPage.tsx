import { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useMovieLibrary from "../../../hooks/useMovieLibrary";
import moviesService from "../../../services/moviesService";
import { MovieDetailed } from "../../../types/Movie";
import BackButton from "../../common/BackButton/BackButton";
import styles from "./MovieDetailsPage.module.css";
import RelatedMovies from "./RelatedMovies/RelatedMovies";

const MovieDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToLibrary, removeFromLibrary, isMovieInLibrary } =
    useMovieLibrary();
  const [movie, setMovie] = useState<MovieDetailed | null>(null);

  useEffect(() => {
    if (!location.state || !location.state["tmdbMovieId"]) {
      navigate("/");
      return;
    }

    const fetchMovie = async () => {
      try {
        const movieDetails: MovieDetailed = await moviesService.getMovieDetails(
          location.state["tmdbMovieId"],
        );
        setMovie(movieDetails);
      } catch {
        setMovie(null);
      }
    };

    fetchMovie();
  }, [location.state, navigate]);

  if (!movie) return;
  const handleImageErrorFallback = (
    event: SyntheticEvent<HTMLImageElement>,
  ) => {
    (event.target as HTMLImageElement).src =
      "/images/movie-poster-fallback.webp";
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>{movie.title}</h1>
      <img
        className={styles.poster}
        src={movie.posterPath}
        onError={handleImageErrorFallback}
      />
      {movie.releaseDate && (
        <p className={styles.releasedate}>
          Released on&nbsp;
          {new Date(movie.releaseDate).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      )}
      <p className={styles.overview}>{movie.overview}</p>
      {isMovieInLibrary(movie.tmdbMovieId) ? (
        <div
          className={styles.removefromlibrary}
          onClick={() => removeFromLibrary(movie.tmdbMovieId)}
        >
          Remove from my library
        </div>
      ) : (
        <div
          className={styles.addtolibrary}
          onClick={() => addToLibrary(movie.tmdbMovieId)}
        >
          Add to my library
        </div>
      )}
      <RelatedMovies movieId={movie.tmdbMovieId} />
    </div>
  );
};

export default MovieDetailsPage;
