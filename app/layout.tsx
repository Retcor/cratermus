import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to your deployed domain so social share images
  // resolve to absolute URLs (e.g. https://cratermus.com).
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.name,
  keywords: ["DJ", "producer", site.name, "booking", "music", "festival"],
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.name,
    images: [{ url: site.seo.ogImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
