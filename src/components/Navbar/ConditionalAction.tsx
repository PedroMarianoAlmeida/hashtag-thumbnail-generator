"use client";
import { useContext } from "react";
import Link from "next/link";
import { signOut } from "@aws-amplify/auth";
import { AuthContext } from "@/components/Providers/AuthProvider";

const ConditionalAction = () => {
  const { setUserId, userId } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    setUserId(null);
  };

  if (userId) {
    return (
      <>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <button
          className="text-sm font-medium hover:underline underline-offset-4"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <Link
      className="text-sm font-medium hover:underline underline-offset-4"
      href="/login"
    >
      Login
    </Link>
  );
};

export default ConditionalAction;
