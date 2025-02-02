import type { Metadata } from "next";
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
  title: "Daily Tech Quiz",
  description: "今日の技術クイズ",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Daily Tech Quiz",
    description: "今日の技術クイズ",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "Daily Tech Quiz",
    description: "今日の技術クイズ",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
