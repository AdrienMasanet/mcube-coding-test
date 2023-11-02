interface MovieRating {
  _id?: string;
  libraryMovieId: string;
  userId: string;
  rating: number;
}

export default MovieRating;
