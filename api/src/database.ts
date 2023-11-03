import { Db, MongoClient } from "mongodb";

import {
  MONGO_DOMAIN,
  MONGO_PORT,
  MONGO_ROOT_PASSWORD,
  MONGO_ROOT_USERNAME,
} from "./config";
import usersService from "./services/usersService";
import DbCollections from "./types/DbCollections";

let db: Db | null = null;

export const setupDatabase = async () => {
  const mongoClient: MongoClient = new MongoClient(
    `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_DOMAIN}:${MONGO_PORT}`,
  );

  await mongoClient.connect();

  db = mongoClient.db("core");

  console.log("💿 API successfully established MongoDb connection");

  // Seeding fake users for plug and play's sake if there are none
  try {
    const existingUsersCount = await db
      .collection(DbCollections.USERS)
      .countDocuments({});
    if (existingUsersCount === 0) {
      await usersService.seedFakeUsers();
      console.log("🧌  Fake users seeded successfully");
    }
  } catch {
    console.error("Failed to seed fake users");
  }
};

export const getDb = () => {
  if (!db) throw new Error("Database was not initialized");
  return db;
};
