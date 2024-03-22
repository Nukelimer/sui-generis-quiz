import type { Metadata } from "next";
import { Raleway, Hedvig_Letters_Serif } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/providers/LayoutProvider";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";

const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-grotesque",
  display: "swap",
  adjustFontFallback: false,
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  adjustFontFallback: false,
});
export const metadata: Metadata = {
  title: "Sui Generis Class",
  description:
    "This is a fun project to see how many of you can answer the following questions correctly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${hedvig.className} custom-height`}>
          <LayoutProvider>{children}</LayoutProvider>
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
