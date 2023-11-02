import { DbCollections } from "../config";
import { getDb } from "../database";
import User from "../models/User";

const usersService = {
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
};

export default usersService;
