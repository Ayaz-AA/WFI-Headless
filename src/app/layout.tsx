import type { Metadata } from "next";
import { Inter, Arimo } from "next/font/google";
import "./globals.css";
import "@/styles/sections.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
  display: "swap",
});

// Note: Bayon font is not available on Google Fonts
// You may need to add it locally or use a similar font
// For now, we'll use a fallback

export const metadata: Metadata = {
  title: "Workforce Institute - Professional Training & Career Support",
  description: "Empowering professionals through expert-led training and career support. Join thousands who have transformed their careers with us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${arimo.variable}`}>
      <body className="font-inter">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
