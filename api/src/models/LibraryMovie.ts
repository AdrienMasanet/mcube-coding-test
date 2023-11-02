import { ObjectId } from "mongodb";

interface LibraryMovie {
  _id?: ObjectId;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate?: Date;
  userId: ObjectId;
  tmdbMovieId: number;
  createdAt: Date;
}

export default LibraryMovie;
