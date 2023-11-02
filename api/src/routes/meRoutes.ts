import { Request, Response, Router } from "express";

import meController from "../controllers/meController";

const meRouter: Router = Router();

// Special middleware for "me" routes to extract userId from "userid" header and halt the request if absent,
// ensuring easy user identification for "me" endpoints logic.
meRouter.use((req: Request, res: Response, next) => {
  const userId = req.headers["userid"];
  if (!userId) return res.status(401).send("Pleased, identify yourself !");
  res.locals["userid"] = userId;
  next();
});

meRouter.get("/", meController.getMe);

export default meRouter;
