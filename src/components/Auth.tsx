"use client";
import { useContext } from "react";
import { Amplify } from "aws-amplify";
import { AuthUser } from "@aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./../aws-exports";

import { useRouter } from "next/navigation";

import { AuthContext } from "@/components/Providers/AuthProvider";

Amplify.configure(awsExports);

import "@aws-amplify/ui-react/styles.css";
export const AuthenticatorAws = () => {
  const {  setUserId } = useContext(AuthContext);
  const router = useRouter();

  const handleUser = (user: AuthUser | undefined) => {
    if (user) {
      const { userId } = user;
      setUserId(() => userId);
      if (userId) router.push("/");
    } else setUserId(null);
  };

  return (
    <Authenticator>
      {({ user }) => {
        console.log({ user });
        handleUser(user);
        return <></>;
      }}
    </Authenticator>
  );
};
