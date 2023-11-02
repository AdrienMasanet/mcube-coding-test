import { Request, Response } from "express";

import usersService from "../services/usersService";

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
      const movieLibrary = await usersService.getUserMovieLibrary(
        res.locals["userid"] as string,
      );
      return res.json(movieLibrary);
    } catch {
      return res.status(500).send("Error while fetching your movie library");
    }
  },

  addMovieToLibrary: async (req: Request, res: Response) => {
    try {
      const movieId: number = req.body.movieId as number;
      if (!movieId) return res.status(400).send("No movieId was given");
      await usersService.addMovieToUserLibrary(
        res.locals["userid"] as string,
        movieId,
      );
      return res.send("Movie added to your library !");
    } catch {
      return res.status(500).send("Error while adding movie to your library");
    }
  },
};

export default meController;
