"use client";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import Link from "next/link";
import { signOut } from "@aws-amplify/auth";

const ConditionalAction = () => {
  const user = useCurrentUser();
  if (user.userId) {
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
          onClick={() => signOut()}
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
