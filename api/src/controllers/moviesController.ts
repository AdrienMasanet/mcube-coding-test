import { Request, Response } from "express";

import moviesServices from "../services/moviesService";

const moviesController = {
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
};

export default moviesController;
