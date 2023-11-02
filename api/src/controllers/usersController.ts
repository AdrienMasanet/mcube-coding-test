import { Request, Response } from "express";

import usersService from "../services/usersService";

const usersController = {
  wipeAndSeedFakeUsers: async (req: Request, res: Response) => {
    try {
      await usersService.wipeUsers();
      await usersService.seedFakeUsers();
      return res.send("Fake users seeded successfully");
    } catch {
      return res.status(500).send("Error while wiping then seeding fake users");
    }
  },
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await usersService.getUsers();
      return res.json(users);
    } catch {
      return res.status(500).send("Error while fetching users");
    }
  },
};

export default usersController;
