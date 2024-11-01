"use client";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import Link from "next/link";

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
          onClick={() => {}}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <button
      className="text-sm font-medium hover:underline underline-offset-4"
      onClick={() => {}}
    >
      Login
    </button>
  );
};

export default ConditionalAction;
