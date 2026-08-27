import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Piece Wiki",
  description:
    "A enciclopédia do universo de One Piece. Explore personagens, akumas no mi, tripulações e recompensas do mundo da obra.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={interFont.className}>
      <body className="min-h-full flex flex-col bg-bg">{children}</body>
    </html>
  );
}
