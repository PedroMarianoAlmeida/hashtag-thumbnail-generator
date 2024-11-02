import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import AuthProvider from "./AuthProvider";

export const RootProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <QueryProvider>{children}</QueryProvider>
  </AuthProvider>
);

export default RootProviders;
