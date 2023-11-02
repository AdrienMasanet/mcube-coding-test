import { ObjectId } from "mongodb";

interface MovieRating {
  _id?: ObjectId;
  libraryMovieId: string;
  userId: string;
  rating: number;
}

export default MovieRating;
