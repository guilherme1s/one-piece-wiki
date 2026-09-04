import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswaldFont = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "One Piece Wiki",
  description:
    "A enciclopédia do universo de One Piece. Explore personagens, akumas no mi, tripulações e recompensas do mundo da obra.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${interFont.variable} ${oswaldFont.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-bg text-text">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
