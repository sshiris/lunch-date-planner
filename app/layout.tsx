import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dessert Guess Game",
  description: "A tiny little guessing game for Mikko 🍰",
  // title: "Lunch Date Planner",
  // description: "A very official sushi lunch date booking app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
