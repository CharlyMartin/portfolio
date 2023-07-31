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
          "h-full min-h-screen bg-zinc-50 dark:bg-black",
          inter.className
        )}
      >
        <div className="mx-auto max-w-6xl" style={fullHeight}>
          <div
            className="h-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"
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
