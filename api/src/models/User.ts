import { ObjectId } from "mongodb";

interface User {
  _id?: ObjectId;
  name: string;
}

export default User;
