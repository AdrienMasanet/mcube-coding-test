import { Db, MongoClient } from "mongodb";

import {
  MONGO_DOMAIN,
  MONGO_PORT,
  MONGO_ROOT_PASSWORD,
  MONGO_ROOT_USERNAME,
} from "./config";

let db: Db | null = null;

export const setupDatabase = async () => {
  const mongoClient: MongoClient = new MongoClient(
    `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_DOMAIN}:${MONGO_PORT}`,
  );

  await mongoClient.connect();

  db = mongoClient.db("core");

  console.log("💿 API successfully established MongoDb connection");
};

export const getDb = () => {
  if (!db) throw new Error("Database was not initialized");
  return db;
};
