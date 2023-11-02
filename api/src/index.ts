import express, { Express } from "express";

import setupDatabase from "./database";
import setupMiddlewares from "./middlewares";
import startExpressServer from "./server";

const app: Express = express();

(async () => {
  try {
    await setupDatabase();
    setupMiddlewares(app);
    startExpressServer(app);
  } catch (e) {
    console.error("💀 Error while API setup", e);
  }
})();
