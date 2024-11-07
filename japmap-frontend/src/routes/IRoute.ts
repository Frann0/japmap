import { ReactNode } from "react";

export interface IRoute {
  path: string;
  component: ReactNode;
  name: string;
  icon?: string;
}
