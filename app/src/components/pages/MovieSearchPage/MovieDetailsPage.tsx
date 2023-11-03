import styles from "./MovieSearchPage.module.css";
import SearchBar from "./SearchBar/SearchBar";

const MovieSearchPage = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
    </div>
  );
};

export default MovieSearchPage;
