"use client";
import { createContext, useState } from "react";

import { AuthUser } from "@aws-amplify/auth";

interface AuthContextType {
  userId: AuthUser["userId"] | null;
  setUserId: React.Dispatch<React.SetStateAction<AuthUser["userId"] | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  userId: null,
  setUserId: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<AuthUser["userId"] | null>(null);
  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
