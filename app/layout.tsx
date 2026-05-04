import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CookieContent from "./components/website/Cookie";

// Heading / UI font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Mono (optional)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Paragraph / body font (NEW)
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SMAIN Reality | Trusted Builders of Modern Living Spaces",
  description:
    "Specialized in premium construction, luxury villas, apartments, and mixed-use developments with precision, quality, and long-term value.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      {/* 👇 Apply Outfit as default body font */}
      <body className="min-h-full flex flex-col font-[var(--font-outfit)]">
        <Toaster position="bottom-center" />

        {children}

        <CookieContent />
      </body>
    </html>
  );
}
