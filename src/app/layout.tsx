import { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
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

export default function RootLayout(props: Props) {
  const { children } = props;
  const fullHeight = { height: "inherit", minHeight: "inherit" };

  return (
    <html lang="en" className="dark antialiased">
      <body
        className={clsx(
          "lg:px-18 h-full min-h-screen bg-zinc-50 dark:bg-black md:px-12 xl:px-28",
          inter.className
        )}
      >
        <div className="mx-auto max-w-7xl" style={fullHeight}>
          <div
            className="h-full bg-white px-2.5 ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20 sm:px-0"
            style={fullHeight}
          >
            <Header />
            <main>{children}</main>
            <Footer />
            <br />
            <br />
            <br />
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
