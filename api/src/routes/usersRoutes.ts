import { Router } from "express";

import usersController from "../controllers/usersController";

const usersRouter: Router = Router();

usersRouter.post("/seed", usersController.wipeAndSeedFakeUsers);
usersRouter.get("/", usersController.getUsers);

export default usersRouter;
