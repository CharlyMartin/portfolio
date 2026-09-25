import React from "react";
import { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { twJoin } from "tailwind-merge";

import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import ScreenSizeIndicator from "@/components/atoms/screen-size-indicator";
import { BASE_URL, META } from "@/data/config";
import "../css/index.css";

const satoshi = localFont({
  src: [
    {
      path: "../fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
});

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: META.name,
    template: `%s | ${META.name}`,
  },
  creator: "Charly Martin",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: BASE_URL,
    siteName: META.name,
    title: META.title,
    description: META.name + " | Portfolio",
    images: ["/home-screenshot.png"],
  },
  twitter: {
    title: META.title,
    description: META.name + " | Portfolio",
    images: ["/home-screenshot.png"],
  },
};

type Props = {
  children: React.ReactNode;
};

const padding = "sm:px-6 md:px-10 lg:px-14 xl:px-20";

// Applies the saved theme (or the system one) before first paint.
const themeScript = `(function(){try{var s=localStorage.isDarkMode;var d=s===undefined?matchMedia("(prefers-color-scheme: dark)").matches:s==="true";document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export default function RootLayout(props: Props) {
  const { children } = props;

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={twJoin("h-full bg-zinc-50 dark:bg-black", satoshi.className)}
      >
        <a
          href="#content"
          className="sr-only z-50 rounded-md bg-white text-sm font-medium text-zinc-900 shadow-lg ring-1 ring-zinc-900/10 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-4 focus:py-2 dark:bg-zinc-800 dark:text-zinc-100"
        >
          Skip to content
        </a>
        <div className="w-full">
          {/* Background */}
          <div className={twJoin("fixed inset-0 flex justify-center", padding)}>
            <div className="site-container flex">
              <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
            </div>
          </div>

          {/* Content */}
          <div className={twJoin("relative w-full overflow-x-hidden", padding)}>
            <Header />
            <main id="content" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
        <ScreenSizeIndicator />
      </body>
    </html>
  );
}
