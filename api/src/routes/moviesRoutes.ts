import { Router } from "express";

import moviesController from "../controllers/moviesController";

const moviesRouter: Router = Router();

moviesRouter.get("/", moviesController.getMoviesBySearch);

export default moviesRouter;
