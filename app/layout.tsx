import type { Metadata } from "next";
import Script from "next/script";
import { introBootstrap } from "./lib/intro";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alban Richer - Lead Full Stack Developer | Deemply",
  description:
    "Portfolio d'Alban Richer, Lead Full Stack Developer chez Deemply depuis 2020. Développement web full stack, architecture logicielle et leadership technique pour des solutions de conformité digitale des bâtiments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="portfolio-intro-bootstrap" strategy="beforeInteractive">
          {introBootstrap}
        </Script>
        {children}
      </body>
    </html>
  );
}
