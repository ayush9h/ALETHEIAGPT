import type { Metadata } from "next";
import {Fjalla_One, Outfit} from "next/font/google"
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "./auth";


const headerFont = Fjalla_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-header",
  display: "swap",
});

const paragraphFont = Outfit({
  subsets: ["latin"],
  variable: "--font-paragraph",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AletheiaGPT",
  description: "Your assistant for daily productivity",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  return (
    <html lang="en">
      <body
      className={`${headerFont.variable} ${paragraphFont.variable} antialiased`}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
