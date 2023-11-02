import { Router } from "express";

import usersController from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.get("/seed", usersController.seedFakeUsers);

export default usersRouter;
