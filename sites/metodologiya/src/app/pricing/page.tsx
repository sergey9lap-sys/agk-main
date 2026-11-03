import type { Metadata } from "next";
import { Pricing } from "@/sections/Pricing";

export const metadata: Metadata = {
  title: "Методология 16.0 — тарифы",
  description: "Тарифы курса Методология 16.0, продуктовая стратегия и связь с менеджером.",
  alternates: {
    canonical: "/metodologiya/pricing",
  },
  openGraph: {
    title: "Методология 16.0 — тарифы",
    description: "Тарифы курса Методология 16.0, продуктовая стратегия и связь с менеджером.",
    url: "/metodologiya/pricing",
    type: "website",
    locale: "ru_RU",
    siteName: "МЕТОДОЛОГИЯ",
    images: [
      {
        url: "/metodologiya/images/blok-1.jpg",
        width: 1280,
        height: 1280,
        alt: "Тарифы курса Методология 16.0",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Методология 16.0 — тарифы",
    description: "Тарифы курса Методология 16.0, продуктовая стратегия и связь с менеджером.",
    images: ["/metodologiya/images/blok-1.jpg"],
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-card-bg">
      <Pricing title="Методология 16.0" showStartDate={false} />
    </main>
  );
}
