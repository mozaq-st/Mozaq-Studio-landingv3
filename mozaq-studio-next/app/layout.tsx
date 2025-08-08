import type { Metadata } from "next";
import "./globals.css";
import { Inter, Newsreader } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const news = Newsreader({ subsets: ["latin"], weight: ["600","700"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Mozaq Studio — Architectural & Product Visualization",
  description: "Quiet luxury for bold ideas. Cinematic renders, precise models, and clean brand moments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${news.variable}`}>
      <body>{children}</body>
    </html>
  );
}
