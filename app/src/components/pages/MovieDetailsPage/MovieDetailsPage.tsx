import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import moviesService from "../../../services/moviesService";
import { MovieBase } from "../../../types/Movie";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieBase | null>(null);

  useEffect(() => {
    if (!location.state || !location.state["tmdbMovieId"]) {
      navigate("/");
      return;
    }

    const fetchMovie = async () => {
      try {
        const movieDetails = await moviesService.getMovieDetails(
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

  return (
    <div className={styles.container}>
      <p>{movie.title}</p>
    </div>
  );
};

export default MovieDetailsPage;
