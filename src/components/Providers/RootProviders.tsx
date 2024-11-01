import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";

export const RootProviders = ({ children }: { children: ReactNode }) => (
  <QueryProvider>{children}</QueryProvider>
);

export default RootProviders;
