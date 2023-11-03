import { Express } from "express";

import { API_DOMAIN, API_PORT, API_PROTOCOL } from "./config";

const startServer = (app: Express) => {
  app.listen(API_PORT, () => {
    console.log(
      `🤘 Express server is running at ${API_PROTOCOL}://${API_DOMAIN}:${API_PORT}`,
    );
  });
};

export default startServer;
