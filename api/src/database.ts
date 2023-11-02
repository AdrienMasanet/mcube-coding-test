import { MongoClient } from "mongodb";

import {
  MONGO_DOMAIN,
  MONGO_PORT,
  MONGO_ROOT_PASSWORD,
  MONGO_ROOT_USERNAME,
} from "./config";

const setupDatabase = async () => {
  const mongoClient: MongoClient = new MongoClient(
    `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_DOMAIN}:${MONGO_PORT}`,
  );

  await mongoClient.connect();

  console.log("💿 API successfully established MongoDb connection");
};

export default setupDatabase;
