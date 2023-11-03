import LibraryMovie from "./LibraryMovie";

interface User {
  _id: string;
  name: string;
  movieLibrary?: LibraryMovie[];
}

export default User;
