import { ObjectId } from "mongodb";

import { DbCollections, TMDB_IMAGES_PATH } from "../config";
import { getDb } from "../database";
import LibraryMovie from "../models/LibraryMovie";
import User from "../models/User";
import { TMDBMovieDetails } from "../types/TMDBApi";
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
  ): Promise<LibraryMovie[] | null> => {
    const db = getDb();

    const result = await db
      .collection(DbCollections.USERS)
      .aggregate([
        { $match: { _id: new ObjectId(userId) } }, // Trouve l'utilisateur avec l'ID spécifié
        { $unwind: "$movieLibrary" }, // Décompose le tableau movieLibrary en documents individuels
        { $replaceRoot: { newRoot: "$movieLibrary" } }, // Remplace le document racine par les éléments de movieLibrary
      ])
      .toArray();

    return result.length ? (result as LibraryMovie[]) : null;
  },

  addMovieToUserLibrary: async (
    userId: string,
    tmdbMovieId: number,
  ): Promise<void> => {
    const movie: TMDBMovieDetails =
      await moviesServices.getMovieById(tmdbMovieId);

    const db = getDb();

    const newLibraryMovie: LibraryMovie = {
      title: movie.title,
      overview: movie.overview,
      posterPath: `${TMDB_IMAGES_PATH}${movie.poster_path}`,
      releaseDate: movie.release_date
        ? new Date(movie.release_date)
        : undefined,
      userId: new ObjectId(userId),
      tmdbMovieId: tmdbMovieId,
      createdAt: new Date(),
    };

    const result = await db.collection(DbCollections.USERS).updateOne(
      {
        _id: new ObjectId(userId),
        "movieLibrary.tmdbMovieId": { $ne: tmdbMovieId },
      },
      { $push: { movieLibrary: newLibraryMovie } },
    );

    if (result.modifiedCount === 0) {
      throw new Error(
        `Failed to add movie to user ${userId}'s library. The user id could be wrong or the movie may already be in the library`,
      );
    }
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
};

export default usersService;
