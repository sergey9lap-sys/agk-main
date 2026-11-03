import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { GetCourseQualityBadge } from "@/components/GetCourseQualityBadge";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Header } from "@/components/Header";
import { SiteMotion } from "@/components/SiteMotion";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agk-edu.ru"),
  title: "МЕТОДОЛОГИЯ — Создай востребованный продукт и стань Учителем с большой буквы",
  description:
    "Курс по методологии от Александры Горевой-Куртышевой. Научитесь создавать сильные образовательные продукты, управлять процессом обучения и доводить до результата 98% учеников.",
  keywords:
    "методология, курс методология, методолог обучение, образовательный продукт, Александра Горева-Куртышева, наставничество",
  alternates: {
    canonical: "/metodologiya/",
  },
  openGraph: {
    title: "МЕТОДОЛОГИЯ — курс от Александры Горевой-Куртышевой",
    description:
      "Создайте востребованный образовательный продукт, выстройте методологию обучения и продуктовую линейку для экспертов и предпринимателей.",
    url: "/",
    type: "website",
    locale: "ru_RU",
    siteName: "МЕТОДОЛОГИЯ",
    images: [
      {
        url: "/metodologiya/images/blok-1.jpg",
        width: 1280,
        height: 1280,
        alt: "Курс МЕТОДОЛОГИЯ Александры Горевой-Куртышевой",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "МЕТОДОЛОГИЯ — курс от Александры Горевой-Куртышевой",
    description:
      "Создайте востребованный образовательный продукт, выстройте методологию обучения и продуктовую линейку для экспертов и предпринимателей.",
    images: ["/metodologiya/images/blok-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        
      </head>
      <body className={`${inter.variable} font-sans`}>
        
        <SiteMotion />
        <Header />
        {children}
        <GetCourseQualityBadge />
        <StickyMobileCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
