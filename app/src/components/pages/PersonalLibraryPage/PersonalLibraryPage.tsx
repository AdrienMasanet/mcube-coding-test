import useMovieLibrary from "../../../hooks/useMovieLibrary";
import MovieGrid from "../../common/MovieGrid/MovieGrid";
import styles from "./PersonalLibraryPage.module.css";
import SortFilter from "./SortFilter/SortFilter";

const PersonalLibraryPage = () => {
  const { movieLibrary } = useMovieLibrary();

  return (
    <div className={styles.container}>
      <SortFilter />
      <MovieGrid movies={movieLibrary} personalLibraryMovieGrid />
    </div>
  );
};

export default PersonalLibraryPage;
