import useMovieLibrary from "../../../hooks/useMovieLibrary";
import MovieGrid from "../../common/MovieGrid/MovieGrid";
import styles from "./PersonalLibraryPage.module.css";

const PersonalLibraryPage = () => {
  const { movieLibrary } = useMovieLibrary();

  return (
    <div className={styles.container}>
      <MovieGrid movies={movieLibrary} />
    </div>
  );
};

export default PersonalLibraryPage;
