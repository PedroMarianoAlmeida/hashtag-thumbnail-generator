import Link from "next/link";
import Image from "next/image";
import ConditionalAction from "./ConditionalAction";

export const Navbar = async () => {
  //const userEmail = session?.user?.email ?? null;

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="/">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        <span>SEO Helper</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
        >
          Home
        </Link>
        {/* <ConditionalAction userEmail={userEmail} /> */}
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/about"
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
