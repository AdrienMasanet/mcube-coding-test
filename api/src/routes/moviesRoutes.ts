import { Router } from "express";

import moviesController from "../controllers/moviesController";

const moviesRouter: Router = Router();

moviesRouter.get("/:movieId", moviesController.getMovieById);
moviesRouter.get("/", moviesController.getMoviesBySearch);
moviesRouter.get("/:movieId/related", moviesController.getRelatedMovies);

export default moviesRouter;
