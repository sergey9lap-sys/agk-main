"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { Award, BookOpen, Globe, Target } from "lucide-react";

const stats = [
  {
    value: 15,
    label: "потоков курса",
    icon: BookOpen,
  },
  {
    value: 40000,
    label: "выпускников из 50 стран",
    prefix: ">",
    icon: Globe,
  },
  {
    value: 98,
    label: "учеников с результатом",
    suffix: "-100%",
    icon: Target,
  },
  {
    value: 5,
    label: "премий за вклад в образование",
    icon: Award,
  },
];

const formatStatValue = (stat: (typeof stats)[number]) => {
  const value = stat.value >= 1000 ? stat.value.toLocaleString("ru-RU") : stat.value.toString();
  return `${stat.prefix ?? ""}${value}${stat.suffix ?? ""}`;
};

export function Stats() {
  return (
    <section className="relative -mt-px overflow-hidden bg-black py-4 lg:py-5">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-15.jpg"
        variant="orange"
        position="object-bottom"
      />
      <Container className="relative z-20">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-white/70 bg-card-bg/92 px-3 py-3 text-center shadow-[0_10px_26px_rgba(85,11,24,0.12)] backdrop-blur-md lg:px-4 lg:py-4"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-transparent via-orange-1 to-transparent"
                />
                <div className="relative mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-1 text-white shadow-[0_8px_18px_rgba(85,11,24,0.24)] lg:h-10 lg:w-10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="relative mb-1 font-heading text-3xl font-black leading-none text-text-primary lg:text-4xl">
                  {formatStatValue(stat)}
                </div>
                <div className="relative mx-auto mb-1.5 h-px w-10 bg-orange-1/50" />
                <div className="relative text-xs font-semibold leading-snug text-text-primary lg:text-sm">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
