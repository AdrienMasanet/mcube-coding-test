import { ObjectId } from "mongodb";

import LibraryMovie from "./LibraryMovie";

interface User {
  _id?: ObjectId;
  name: string;
  movieLibrary?: LibraryMovie[];
}

export default User;
