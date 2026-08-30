import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nikolay Rademacher",
    template: "Nikolay Rademacher | %s",
  },
  description:
    "Homepage of Nikolay Rademacher, Full-stack software developer",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen grid dark:bg-dark-bg">
          <article className="mx-auto max-w-3xl px-4 sm:px-8 md:px-16 my-8 sm:my-16 md:my-32">
            {children}
          </article>
        </main>
      </body>
    </html>
  );
}
