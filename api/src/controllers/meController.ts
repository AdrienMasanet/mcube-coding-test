import { Request, Response } from "express";

import usersService from "../services/usersService";

const meController = {
  getMe: async (req: Request, res: Response) => {
    try {
      const me = await usersService.getUserById(res.locals["userid"] as string);
      if (!me) return res.status(400).send("No user was found");
      return res.json(me);
    } catch {
      return res.status(500).send("Error while fetching your data");
    }
  },
};

export default meController;
