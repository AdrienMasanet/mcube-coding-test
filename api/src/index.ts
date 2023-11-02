import express, { Express } from "express";

import setupMiddlewares from "./middlewares";
import startExpressServer from "./server";

const app: Express = express();

setupMiddlewares(app);
startExpressServer(app);
