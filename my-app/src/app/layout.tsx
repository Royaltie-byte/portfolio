import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://portfolio-tsst.onrender.com";
const SITE_NAME = "Allan Kihiu";
const SITE_DESCRIPTION =
  "Full-stack developer and founder of Royaltie Technologies and ChatEase, building scalable AI-powered products and growing into cloud engineering and distributed systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Full-Stack Developer & Founder`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Allan Kihiu",
    "Royaltie Technologies",
    "ChatEase",
    "Matra",
    "full-stack developer",
    "founder",
    "cloud engineer",
    "Kenya software developer",
    "Nairobi developer",
    "AI products Kenya",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} — Full-Stack Developer & Founder`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Full-Stack Developer & Founder`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Full-Stack Developer & Founder`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a10",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Full-Stack Developer & Founder",
  description: SITE_DESCRIPTION,
  worksFor: [
    {
      "@type": "Organization",
      name: "Royaltie Technologies",
    },
  ],
  founder: [
    {
      "@type": "Organization",
      name: "Royaltie Technologies",
    },
    {
      "@type": "Organization",
      name: "ChatEase",
      url: "https://chatease.co.ke",
    },
    {
      "@type": "Organization",
      name: "Matra",
    },
  ],
  sameAs: [
    "https://github.com/Royaltie-byte",
    "https://www.linkedin.com/in/kihiu-njogu-023059353/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}