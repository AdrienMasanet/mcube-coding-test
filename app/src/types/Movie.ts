export interface MovieBase {
  title: string;
  posterPath: string;
  releaseDate?: Date;
  tmdbMovieId: number;
}

export interface MovieDetailed extends MovieBase {
  overview: string;
}

export interface LibraryMovie extends MovieBase {
  _id: string;
  userId: string;
  rating?: number;
  createdAt: Date;
}
