export const API_PROTOCOL = "http";
export const API_DOMAIN = "localhost";
export const API_PORT = process.env.API_PORT
  ? parseInt(process.env.API_PORT)
  : 3000;

export const WEBAPP_PROTOCOL = "http";
export const WEBAPP_DOMAIN = "localhost";
export const WEBAPP_PORT = process.env.APP_PORT
  ? parseInt(process.env.APP_PORT)
  : 5173;

export const MONGO_ROOT_USERNAME = process.env.MONGO_ROOT_USERNAME;
export const MONGO_ROOT_PASSWORD = process.env.MONGO_ROOT_PASSWORD;
export const MONGO_DOMAIN = "db";
export const MONGO_PORT = 27017;

export const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_IMAGES_PATH = "https://image.tmdb.org/t/p/original/";
