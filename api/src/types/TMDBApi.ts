export interface TMDBResponse {
  page: number;
  results: TMDBMovieBase[];
}

export interface TMDBMovieBase {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date?: string;
}

export interface TMDBMovieDetails extends TMDBMovieBase {
  overview: string;
}
