import { Request, Response } from "express";

import usersService from "../services/usersService";

const usersController = {
  seedFakeUsers: async (req: Request, res: Response) => {
    try {
      await usersService.seedFakeUsers();
      return res.send("Fake users seeded successfully");
    } catch {
      return res.send("Error while seeding fake users");
    }
  },
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await usersService.getUsers();
      return res.json(users);
    } catch {
      return res.send("Error while fetching users");
    }
  },
};

export default usersController;
