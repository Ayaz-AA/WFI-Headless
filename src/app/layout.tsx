import type { Metadata } from "next";
import { Inter, Arimo, Bayon } from "next/font/google";
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

const bayon = Bayon({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bayon",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} ${arimo.variable} ${bayon.variable}`}>
      <body className="font-inter">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
