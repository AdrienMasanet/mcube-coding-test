export interface TMDBMovieBase {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string | null;
}

export interface TMDBMovieDetails extends TMDBMovieBase {
  overview: string;
}
