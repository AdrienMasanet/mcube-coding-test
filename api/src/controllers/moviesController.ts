import { Request, Response } from "express";

import moviesServices from "../services/moviesService";

const moviesController = {
  getMovieById: async (req: Request, res: Response) => {
    try {
      const movieId: number = parseInt(req.params.movieId as string);
      if (isNaN(movieId)) return res.status(400).send("Invalid movieId");
      const result = await moviesServices.getMovieById(movieId);
      return res.json(result);
    } catch {
      return res.status(500).send("Error while fetching movie data");
    }
  },

  getMoviesBySearch: async (req: Request, res: Response) => {
    try {
      const searchString: string = req.query.search as string;
      if (!searchString)
        return res.status(400).send("No search string was provided");
      const result = await moviesServices.getMoviesBySearch(searchString);
      return res.json(result);
    } catch {
      return res.status(500).send("Error while searching for movies");
    }
  },

  getRelatedMovies: async (req: Request, res: Response) => {
    try {
      const movieId: number = parseInt(req.params.movieId as string);
      if (isNaN(movieId)) return res.status(400).send("Invalid movieId");
      const result = await moviesServices.getRelatedMovies(movieId);
      return res.json(result);
    } catch {
      return res.status(500).send("Error while searching for related movies");
    }
  },
};

export default moviesController;
