import { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import { DEBOUNCE_SEARCH_MS } from "../../../../config";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  searchForMovies: (searchString: string) => void;
};

const SearchBar = ({ searchForMovies }: SearchBarProps) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debounceSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      searchForMovies(value);
    }, DEBOUNCE_SEARCH_MS);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className={styles.container}>
      <input
        className={styles.inputsearch}
        type="text"
        placeholder="Type here to find a movie !"
        onChange={debounceSearch}
      />
    </div>
  );
};

export default SearchBar;
