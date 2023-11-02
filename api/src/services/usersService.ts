import { ObjectId } from "mongodb";

import { DbCollections } from "../config";
import { getDb } from "../database";
import User from "../models/User";

const usersService = {
  wipeUsers: async (): Promise<void> => {
    const db = getDb();

    await db.collection(DbCollections.USERS).deleteMany({});
  },
  seedFakeUsers: async (): Promise<void> => {
    const db = getDb();

    const fakeUsers: User[] = [
      { name: "Anakin" },
      { name: "Jotaro" },
      { name: "Kratos" },
      { name: "Shepard" },
    ];

    await db.collection(DbCollections.USERS).insertMany(fakeUsers);
  },
  getUsers: async (): Promise<User[]> => {
    const db = getDb();

    const users: User[] = (await db
      .collection(DbCollections.USERS)
      .find()
      .toArray()) as User[];

    return users;
  },
  getUserById: async (userId: string): Promise<User | null> => {
    const db = getDb();

    const user: User | null = (await db
      .collection(DbCollections.USERS)
      .findOne({ _id: new ObjectId(userId) })) as User;

    return user;
  },
};

export default usersService;
