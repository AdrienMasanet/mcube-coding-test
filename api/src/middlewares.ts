import bodyParser from "body-parser";
import cors from "cors";
import { Express } from "express";

import { WEBAPP_DOMAIN, WEBAPP_PORT, WEBAPP_PROTOCOL } from "./config";
import meRouter from "./routes/meRoutes";
import moviesRouter from "./routes/moviesRoutes";
import usersRouter from "./routes/usersRoutes";

const setupMiddlewares = (app: Express) => {
  // Config middlewares
  app.use(bodyParser.json());
  app.use(
    cors({ origin: `${WEBAPP_PROTOCOL}://${WEBAPP_DOMAIN}:${WEBAPP_PORT}` }),
  );

  // Route middlewares
  app.use("/users", usersRouter);
  app.use("/movies", moviesRouter);
  app.use("/me", meRouter);

  console.log("👮 Middlewares set up successfully");
};

export default setupMiddlewares;
