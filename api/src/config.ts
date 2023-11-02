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
