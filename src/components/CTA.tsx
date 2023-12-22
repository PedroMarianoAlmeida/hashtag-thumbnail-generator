"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface CTAProps {
  isLogged: boolean;
}

const CTA = ({ isLogged }: CTAProps) => {
  return (
    <div className="flex flex-col gap-2 min-[400px]:flex-row">
      {isLogged ? (
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/dashboard"
        >
          Get Started
        </Link>
      ) : (
        <button
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          onClick={() => signIn()}
        >
          Login to Get Started
        </button>
      )}
    </div>
  );
};

export default CTA;
