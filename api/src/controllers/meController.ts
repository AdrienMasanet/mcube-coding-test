import { Request, Response } from "express";

import usersService from "../services/usersService";
import MoviesSortBy from "../types/MoviesSortBy";

const meController = {
  getMe: async (req: Request, res: Response) => {
    try {
      const me = await usersService.getUserById(res.locals["userid"] as string);
      if (!me) return res.status(400).send("No user was found");
      return res.json(me);
    } catch {
      return res.status(500).send("Error while fetching your data");
    }
  },

  getMovieLibrary: async (req: Request, res: Response) => {
    try {
      const queryOrderBy: string = req.query.orderBy as string;

      let orderBy: MoviesSortBy;
      switch (queryOrderBy) {
        case "added-date":
          orderBy = MoviesSortBy.ADDED_DATE;
          break;
        case "release-date":
          orderBy = MoviesSortBy.RELEASE_DATE;
          break;
        case "title":
          orderBy = MoviesSortBy.TITLE;
          break;
        default:
          orderBy = MoviesSortBy.ADDED_DATE;
      }

      const movieLibrary = await usersService.getUserMovieLibrary(
        res.locals["userid"] as string,
        orderBy,
      );

      return res.json(movieLibrary);
    } catch {
      return res.status(500).send("Error while fetching your movie library");
    }
  },

  addMovieToLibrary: async (req: Request, res: Response) => {
    try {
      const movieId: number = parseInt(req.body.movieId);
      if (isNaN(movieId)) return res.status(400).send("Invalid movieId");
      await usersService.addMovieToUserLibrary(
        res.locals["userid"] as string,
        movieId,
      );
      return res.send("Movie added to your library !");
    } catch {
      return res.status(500).send("Error while adding movie to your library");
    }
  },

  removeMovieFromLibrary: async (req: Request, res: Response) => {
    try {
      const movieId: number = parseInt(req.query.movieId as string);
      if (isNaN(movieId)) return res.status(400).send("Invalid movieId");
      await usersService.removeMovieFromUserLibrary(
        res.locals["userid"] as string,
        movieId,
      );
      return res.send("Movie removed from your library !");
    } catch {
      return res
        .status(500)
        .send("Error while removing movie from your library");
    }
  },

  rateLibraryMovie: async (req: Request, res: Response) => {
    try {
      const movieId: number = parseInt(req.body.movieId);
      const rating: number = parseInt(req.body.rating);

      if (isNaN(movieId) || isNaN(rating) || rating < 0 || rating > 5) {
        return res.status(400).send("Invalid movieId or rating");
      }

      await usersService.rateMovieFromUserLibrary(
        res.locals["userid"] as string,
        movieId,
        rating,
      );

      return res.send("Movie rated successfully !");
    } catch (error) {
      return res.status(500).send("Error while rating movie in your library");
    }
  },
};

export default meController;
