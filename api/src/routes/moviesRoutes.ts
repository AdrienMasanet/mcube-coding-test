import { Router } from "express";

import moviesController from "../controllers/moviesController";

const moviesRouter: Router = Router();

moviesRouter.get("/", moviesController.getAll);

export default moviesRouter;
