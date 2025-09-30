import type { Metadata } from "next";
import { Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ReactQueryProvider from "../provider/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const roboto = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Saeid Emon",
  description: "A profession Graphics Designer",
  icons: {
    icon: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${roboto.variable} ${geistMono.variable} antialiased`}
      >
          <ReactQueryProvider>
            <Navbar />
            <main className="container mx-auto p-0 m-0">
              {children}
            </main>
            <Toaster />
            <Footer />
          </ReactQueryProvider>
      </body>
    </html>
  );
}
