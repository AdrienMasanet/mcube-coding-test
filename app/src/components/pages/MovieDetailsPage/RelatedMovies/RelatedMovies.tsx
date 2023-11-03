import { useEffect, useState } from "react";

import moviesService from "../../../../services/moviesService";
import { MovieBase } from "../../../../types/Movie";
import MovieCard from "../../../common/MovieGrid/MovieCard/MovieCard";
import styles from "./RelatedMovies.module.css";

type RelatedMoviesProps = {
  movieId: number;
};

const RelatedMovies = ({ movieId }: RelatedMoviesProps) => {
  const [relatedMovies, setRelatedMovies] = useState<MovieBase[]>([]);

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      try {
        const fetchedRelatedMovies: MovieBase[] =
          await moviesService.getRelatedMovies(movieId);
        setRelatedMovies(fetchedRelatedMovies);
      } catch {
        setRelatedMovies([]);
      }
    };

    fetchRelatedMovies();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Related movies</p>
      {relatedMovies.length > 0 ? (
        <div className={styles.moviescontainer}>
          {relatedMovies.map((movie: MovieBase) => (
            <MovieCard key={movie.tmdbMovieId} movie={movie} />
          ))}
        </div>
      ) : (
        <div className={styles.norelatedmoviescontainer}>
          <p className={styles.norelatedtext}>
            No related movies were found 😔
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedMovies;
