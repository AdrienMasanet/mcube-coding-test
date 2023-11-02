interface LibraryMovie {
  _id?: string;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: Date;
  userId: string;
  tmdbMovieId: number;
  createdAt: Date;
}

export default LibraryMovie;
