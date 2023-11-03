import { ReactNode } from "react";

interface Route {
  path: string;
  element: ReactNode;
  linkText?: string;
}

export default Route;
