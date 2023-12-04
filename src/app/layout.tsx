import { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import TailwindScreenSize from "@/components/atoms/tailwind-screen-size";
import { BASE_URL, META } from "@/data/config";
import "../css/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: META.name,
    template: `%s | ${META.name}`,
  },
  colorScheme: "dark",
  creator: "Charly Martin",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: BASE_URL,
    siteName: META.name,
    title: META.title,
    description: META.name + " | Portfolio",
    images: ["/home-dark.png", "/home-light.png"],
  },
  twitter: {
    title: META.title,
    description: META.name + " | Portfolio",
    images: ["/home-dark.png", "/home-light.png"],
  },
};

type Props = {
  children: React.ReactNode;
};

const p = "sm:px-6 md:px-10 lg:px-14 xl:px-20";

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={clsx("h-full bg-zinc-50 dark:bg-black", inter.className)}
      >
        <div className="w-full">
          {/* Background */}
          <div className={clsx("fixed inset-0 flex justify-center", p)}>
            <div className="container flex">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>

          {/* Content */}
          <div className={clsx("relative w-full overflow-x-hidden", p)}>
            <Header />
            <main>{children}</main>
            <Footer />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <Analytics />
        <TailwindScreenSize />
      </body>
    </html>
  );
}
