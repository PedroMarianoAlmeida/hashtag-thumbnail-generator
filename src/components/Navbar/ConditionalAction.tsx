"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface ConditionalActionProps {
  userEmail: string | null;
}

const ConditionalAction = ({ userEmail }: ConditionalActionProps) => {
  if (userEmail) {
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
    <button
      className="text-sm font-medium hover:underline underline-offset-4"
      onClick={() => signIn()}
    >
      Login
    </button>
  );
};

export default ConditionalAction;
