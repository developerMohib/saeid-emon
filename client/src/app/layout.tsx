import type { Metadata, Viewport } from "next";
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
  title: "Saeid Hasan Emon | Graphics Designer",
  description:
    "Saeid Hasan Emon is a professional graphics designer specializing in brand identity, logo design, business cards, and creative visual solutions. Elevate your brand with modern, aesthetic designs tailored to your vision.",
  keywords: [
    "Saeid Hasan Emon",
    "Graphics Designer",
    "Brand Identity Designer",
    "Logo Designer",
    "Creative Designer",
    "Freelance Designer",
    "Business Card Design",
    "Poster Design",
    "Banner Design",
    "Photoshop Expert",
    "Illustrator Expert",
    "Bangladesh Designer",
  ],
  authors: [{ name: "Saeid Hasan Emon" }],
  creator: "Saeid Hasan Emon",
  publisher: "Saeid Hasan Emon",
  metadataBase: new URL("https://www.saeidemon.com"),
  openGraph: {
    title: "Saeid Hasan Emon | Professional Graphics Designer",
    description:
      "Creative and professional graphics designer specializing in logos, brand identity, and print design. Transforming ideas into stunning visuals.",
    url: "https://www.saeidemon.com",
    siteName: "Saeid Hasan Emon",
    images: [
      {
        url: "/emons-logo.png",
        width: 1200,
        height: 630,
        alt: "Saeid Hasan Emon - Professional Graphics Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saeid Hasan Emon | Professional Graphics Designer",
    description:
      "Portfolio of Saeid Hasan Emon — a professional graphics designer specializing in logo and brand identity design.",
    images: ["/emons-logo.png"],
    creator: "@saeidemon", // Optional: Add your Twitter handle if you have one
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  // themeColor: "#0ea5e9",
  category: "Portfolio",
  alternates: {
    canonical: "https://www.saeidemon.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
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
        <main className="container mx-auto p-0 m-0">
          <ReactQueryProvider>
            <Navbar />
            {children}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: "Saeid Emon",
                  jobTitle: "Professional Graphics Designer",
                  url: "https://www.saeidemon.com",
                  sameAs: [
                    "https://www.facebook.com/saeid.emon29",
                    "https://www.freelancer.com/u/saeidemon",
                    "https://www.fiverr.com/saeidemon",
                  ],
                }),
              }}
            />
            <Toaster />
            <Footer />
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
