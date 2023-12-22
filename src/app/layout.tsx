import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import RootProviders from "@/components/Providers/RootProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEO Helper",
  description: "Create hashtags and thumbnails for your social media posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProviders>
          <Navbar />
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
