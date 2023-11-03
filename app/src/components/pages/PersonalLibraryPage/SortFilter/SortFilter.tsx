import { ChangeEvent } from "react";

import useMovieLibrary from "../../../../hooks/useMovieLibrary";
import MoviesSortBy from "../../../../types/MoviesSortBy";
import styles from "./SortFilter.module.css";

const SortFilter = () => {
  const { sortingOrder, setSortingOrder } = useMovieLibrary();

  const sortOptions = (
    Object.keys(MoviesSortBy) as (keyof typeof MoviesSortBy)[]
  ).map((key) => {
    return {
      value: MoviesSortBy[key],
      label: key.replace(/_/g, " ").toLowerCase(),
    };
  });

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSortingOrder(event.target.value as MoviesSortBy);
  };

  return (
    <div className={styles.container}>
      <select
        onChange={handleSelectChange}
        className={styles.select}
        value={sortingOrder}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
