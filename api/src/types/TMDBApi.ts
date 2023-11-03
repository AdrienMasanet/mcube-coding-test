export interface TMDBResponse {
  page: number;
  results: TMDBMovieBase[];
}

export interface TMDBMovieBase {
  id: number;
  title: string;
  poster_path: string;
  release_date?: string;
}

export interface TMDBMovieDetailed extends TMDBMovieBase {
  overview: string;
}
