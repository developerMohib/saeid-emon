import type { Metadata } from "next";
import { Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/elements/Footer";
import Navbar from "@/components/elements/Navbar";
import ReactQueryProvider from "../provider/ReactQueryProvider";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

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
    <html lang="en" data-theme="light">
      <body
        className={`${roboto.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <ReactQueryProvider>
            <Navbar />
            <main className="container mx-auto p-0 m-0">
              {children}
            </main>
            <Toaster />
            <Footer />
          </ReactQueryProvider>
        </UserProvider>
      </body>
    </html>
  );
}
