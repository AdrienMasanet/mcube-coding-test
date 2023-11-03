export interface MovieBase {
  title: string;
  overview: string;
  posterPath: string;
  releaseDate?: Date;
  tmdbMovieId: number;
}

export interface LibraryMovie extends MovieBase {
  _id: string;
  userId: string;
  rating?: number;
  createdAt: Date;
}
