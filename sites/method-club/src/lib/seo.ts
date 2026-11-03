import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/faq";
import { PAYMENT_LINKS, PRICING, SUPPORT_LINKS } from "@/lib/constants";

export const SITE_URL = "https://agk-edu.ru/method-club";
export const SITE_NAME = "МЕТОД:КЛУБ";
export const SITE_TITLE =
  "МЕТОД:КЛУБ — закрытый клуб для экспертов и владельцев онлайн-школ";
export const SITE_DESCRIPTION =
  "Закрытый клуб для методологов, продюсеров, экспертов и владельцев онлайн-школ: живые разборы, динамическая библиотека, сильное окружение и инструменты роста в онлайн-образовании.";
export const OG_IMAGE_PATH = "/method-club/images/VZG_4942.jpg";
export const OG_IMAGE_URL = `https://agk-edu.ru${OG_IMAGE_PATH}`;

export const SITE_KEYWORDS = [
  "метод клуб",
  "метод клуб агк",
  "закрытый клуб для экспертов",
  "клуб для методологов",
  "сообщество для онлайн-школ",
  "клуб для продюсеров",
  "онлайн-образование",
  "методология образовательных продуктов",
  "разборы онлайн-школ",
  "рост онлайн-школы",
];

export const siteMetadata: Metadata = {
  manifest: "/method-club/manifest.webmanifest",
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  category: "education",
  alternates: {
    canonical: "/method-club/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "МЕТОД:КЛУБ — закрытый клуб для экспертов онлайн-образования",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export function getStructuredData() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: "info@agkedu.com",
      sameAs: [SUPPORT_LINKS.telegram, SUPPORT_LINKS.max, SUPPORT_LINKS.vk],
      founder: {
        "@type": "Person",
        name: "Александра Горева-Куртышева",
      },
      brand: {
        "@type": "Brand",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "ru-RU",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: SITE_NAME,
      serviceType: "Закрытый клуб для экспертов онлайн-образования",
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      areaServed: "RU",
      audience: {
        "@type": "Audience",
        audienceType:
          "Методологи, продюсеры, эксперты и владельцы онлайн-школ",
      },
      inLanguage: "ru-RU",
      description: SITE_DESCRIPTION,
      offers: [
        {
          "@type": "Offer",
          name: "Тестовая неделя МЕТОД:КЛУБ",
          url: PAYMENT_LINKS.testWeek,
          price: 0,
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "МЕТОД:КЛУБ на 1 месяц",
          url: PAYMENT_LINKS.month,
          price: PRICING.month.price,
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "МЕТОД:КЛУБ на 1 год",
          url: PAYMENT_LINKS.year,
          price: PRICING.year.price,
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}
