import { ObjectId } from "mongodb";

import { getDb } from "../database";
import LibraryMovie from "../models/LibraryMovie";
import User from "../models/User";
import DbCollections from "../types/DbCollections";
import { MovieDetailed } from "../types/Movie";
import MoviesSortBy from "../types/MoviesSortBy";
import moviesServices from "./moviesService";

const usersService = {
  wipeUsers: async (): Promise<void> => {
    const db = getDb();

    await db.collection(DbCollections.USERS).deleteMany({});
  },

  seedFakeUsers: async (): Promise<void> => {
    const db = getDb();

    const fakeUsers: User[] = [
      { name: "Anakin" },
      { name: "Jotaro" },
      { name: "Kratos" },
      { name: "Shepard" },
    ];

    await db.collection(DbCollections.USERS).insertMany(fakeUsers);
  },

  getUsers: async (): Promise<User[]> => {
    const db = getDb();

    const users: User[] = (await db
      .collection(DbCollections.USERS)
      .find({}, { projection: { movieLibrary: 0 } })
      .toArray()) as User[];

    return users;
  },

  getUserById: async (userId: string): Promise<User | null> => {
    const db = getDb();

    const user: User | null = (await db
      .collection(DbCollections.USERS)
      .findOne(
        { _id: new ObjectId(userId) },
        { projection: { movieLibrary: 0 } },
      )) as User;

    return user;
  },

  getUserMovieLibrary: async (
    userId: string,
    orderBy: MoviesSortBy,
  ): Promise<LibraryMovie[] | null> => {
    const db = getDb();

    const sortDirection = orderBy === MoviesSortBy.TITLE ? 1 : -1;

    const result = await db
      .collection(DbCollections.USERS)
      .aggregate([
        { $match: { _id: new ObjectId(userId) } },
        { $unwind: "$movieLibrary" },
        { $replaceRoot: { newRoot: "$movieLibrary" } },
      ])
      .sort({ [orderBy]: sortDirection })
      .toArray();

    return result.length ? (result as LibraryMovie[]) : null;
  },

  addMovieToUserLibrary: async (
    userId: string,
    tmdbMovieId: number,
  ): Promise<LibraryMovie | null> => {
    const movie: MovieDetailed = await moviesServices.getMovieById(tmdbMovieId);

    const db = getDb();

    const newLibraryMovie: LibraryMovie = {
      ...movie,
      userId: new ObjectId(userId),
      createdAt: new Date(),
    };

    const result = await db.collection(DbCollections.USERS).updateOne(
      {
        _id: new ObjectId(userId),
        "movieLibrary.tmdbMovieId": { $ne: tmdbMovieId },
      },
      { $push: { movieLibrary: newLibraryMovie } },
    );

    if (result.modifiedCount === 0) return null;

    return newLibraryMovie;
  },

  removeMovieFromUserLibrary: async (
    userId: string,
    tmdbMovieId: number,
  ): Promise<void> => {
    const db = getDb();

    const result = await db.collection(DbCollections.USERS).updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $pull: { movieLibrary: { tmdbMovieId: tmdbMovieId } },
      },
    );

    if (result.modifiedCount === 0) {
      throw new Error(
        `Failed to remove movie from user ${userId}'s library. The user id could be wrong or the movie may not be in the library`,
      );
    }
  },

  rateMovieFromUserLibrary: async (
    userId: string,
    tmdbMovieId: number,
    rating: number,
  ): Promise<LibraryMovie | null> => {
    const db = getDb();

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const updateResult = await db.collection(DbCollections.USERS).updateOne(
      {
        _id: new ObjectId(userId),
        "movieLibrary.tmdbMovieId": tmdbMovieId,
      },
      {
        $set: { "movieLibrary.$.rating": rating },
      },
    );

    if (updateResult.modifiedCount === 0) return null;

    const userWithUpdatedMovie = await db
      .collection(DbCollections.USERS)
      .findOne(
        {
          _id: new ObjectId(userId),
          "movieLibrary.tmdbMovieId": tmdbMovieId,
        },
        {
          projection: { "movieLibrary.$": 1 },
        },
      );

    return userWithUpdatedMovie ? userWithUpdatedMovie.movieLibrary[0] : null;
  },
};

export default usersService;
