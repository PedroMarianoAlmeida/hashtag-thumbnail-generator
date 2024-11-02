"use client";
import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/components/Providers/AuthProvider";

const CTA = () => {
  const { userId } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-2 min-[400px]:flex-row">
      {userId ? (
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/dashboard"
        >
          Get Started
        </Link>
      ) : (
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/login"
        >
          Login to Get Started
        </Link>
      )}
    </div>
  );
};

export default CTA;
