import Image from "next/image";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log({ session });
  const isLogged = !!session?.user?.email;

  return (
    <main className="flex-1">
      <section className="w-full py-12 sm:py-24 md:py-32 lg:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Improve your SEO with no effort (and for free)
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Add a AI generated thumbnail and hashtags for your blog posts/
                  social media posts, etc (the sky is the limit)
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                  Get Started
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/hero-image.png"
                width={550}
                height={550}
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
