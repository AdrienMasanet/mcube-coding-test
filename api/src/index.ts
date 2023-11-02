import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: `http://localhost:${
      process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 5173
    }`,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ it: "works" });
});

const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000;

app.listen(port, () => {
  console.log(`🤘 Express server is running at http://localhost:${port}`);
});
