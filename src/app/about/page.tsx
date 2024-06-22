import CTA from "@/components/CTA";
import { getServerSession } from "next-auth";

const AboutPage = async () => {
  const session = await getServerSession();
  const isLogged = !!session?.user?.email;

  return (
    <main className="flex-1 p-4 lg:p-6">
      <h1 className="font-bold text-2xl lg:text-3xl mb-2">About Us</h1>

      <p className=" text-sm lg:text-base mb-4">
        This project is a WebApp powered by AI to provide a better SEO
        experience for your blog posts, social media posts, etc.
      </p>
      <p className=" text-sm lg:text-base mb-4">
        The code is open source and you can find it on{" "}
        <a
          href="https://github.com/PedroMarianoAlmeida/hashtag-thumbnail-generator"
          target="blank"
          rel="noreferrer noopener"
          className="underline underline-offset-4"
        >
          Github
        </a>
      </p>
      <p className=" text-sm lg:text-base mb-4">
        <span className="font-bold">Tech Stack: </span>Next 14, , NextAuth,
        TailwindCSS, Daisy UI, OpenAI API, Firebase, Vercel
      </p>
      <CTA isLogged={isLogged} />
    </main>
  );
};

export default AboutPage;
