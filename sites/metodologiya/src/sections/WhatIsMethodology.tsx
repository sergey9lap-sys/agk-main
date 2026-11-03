"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { ArrowRight, Compass, Puzzle, Route } from "lucide-react";
import { useEffect, useRef } from "react";

const cards = [
  {
    icon: Puzzle,
    title: "Методология = конструктор",
    text: "Вы берёте свои знания, опыт и сильные смыслы и собираете из них цельную пошаговую систему обучения.",
    breakBefore: ["обучения."],
  },
  {
    icon: Route,
    title: "Методология = навигатор",
    text: "Каждый шаг в продукте становится понятным: что идёт за чем, почему это работает и куда ведёт ученика.",
    breakBefore: ["и куда"],
  },
  {
    icon: Compass,
    title: "Методология = система решений",
    text: "Она помогает строить продукты, домашние задания, практику и логику обучения так, чтобы ученики доходили до результата.",
    breakBefore: ["чтобы"],
  },
];

export function WhatIsMethodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollRefs = useRef<HTMLDivElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const textRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    let cleanup = () => {};

    const setupAnimation = async () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const scrolls = scrollRefs.current;
        const titles = titleRefs.current;
        const descriptions = textRefs.current;
        const descriptionWords = descriptions.flatMap((item) =>
          Array.from(item.querySelectorAll<HTMLElement>(".scroll-ink-word"))
        );

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          gsap.set(headerRef.current, { opacity: 0, y: 22, filter: "blur(8px)" });
          gsap.set(threadRef.current, { scaleY: 0, transformOrigin: "top center" });
          gsap.set(buttonRef.current, { opacity: 0, y: 18 });
          gsap.set(scrolls, { scaleX: 0.09, opacity: 0.88, transformOrigin: "50% 50%" });
          gsap.set(titles, { opacity: 0, y: 10, filter: "blur(5px)" });
          gsap.set(descriptionWords, { opacity: 0, y: 8, filter: "blur(4px)" });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              once: true,
            },
            defaults: { ease: "power3.out" },
          });

          timeline
            .to(headerRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.72 })
            .to(threadRef.current, { scaleY: 1, duration: 1.1 }, "-=0.26");

          scrolls.forEach((scroll, index) => {
            const words = Array.from(descriptions[index].querySelectorAll<HTMLElement>(".scroll-ink-word"));

            timeline
              .to(scroll, { scaleX: 1, opacity: 1, duration: 0.78 }, index === 0 ? "-=0.54" : "-=0.18")
              .to(titles[index], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.34 }, "-=0.22")
              .to(
                words,
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.28,
                  stagger: 0.018,
                },
                "-=0.08"
              );
          });

          timeline.to(buttonRef.current, { opacity: 1, y: 0, duration: 0.48 }, "-=0.04");
        });

        mm.add("(max-width: 767px)", () => {
          gsap.set(headerRef.current, { opacity: 0, y: 16 });
          gsap.set(threadRef.current, { scaleY: 0, transformOrigin: "top center" });
          gsap.set(buttonRef.current, { opacity: 0, y: 14 });
          gsap.set(scrolls, {
            scaleX: 0.09,
            opacity: 0.88,
            transformOrigin: "50% 50%",
          });
          gsap.set(titles, { opacity: 0, y: 8, filter: "blur(4px)" });
          gsap.set(descriptionWords, { opacity: 0, y: 6, filter: "blur(3px)" });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 76%",
              once: true,
            },
            defaults: { ease: "power2.out" },
          });

          timeline
            .to(headerRef.current, { opacity: 1, y: 0, duration: 0.52 })
            .to(threadRef.current, { scaleY: 1, duration: 0.7 }, "-=0.18");

          scrolls.forEach((scroll, index) => {
            const words = Array.from(descriptions[index].querySelectorAll<HTMLElement>(".scroll-ink-word"));

            timeline
              .to(
                scroll,
                { opacity: 1, scaleX: 1, duration: 0.58 },
                index === 0 ? "-=0.28" : "-=0.05"
              )
              .to(titles[index], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.22 }, "-=0.05")
              .to(words, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2, stagger: 0.01 }, "-=0.02");
          });

          timeline.to(buttonRef.current, { opacity: 1, y: 0, duration: 0.36 }, "-=0.02");
        });

        cleanup = () => {
          mm.revert();
          context.revert();
        };
      }, sectionRef);
    };

    setupAnimation();

    return () => cleanup();
  }, []);

  const renderInkText = (text: string, breakBefore: string[] = []) =>
    text.split(" ").map((word, index, words) => (
      <span key={`${word}-${index}`}>
        {breakBefore.includes(word) ? <br /> : null}
        <span className="scroll-ink-word inline-block">
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      </span>
    ));

  return (
    <section ref={sectionRef} className="methodology-scroll-section relative overflow-hidden bg-black py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-27.jpg"
        variant="orange"
        position="object-bottom"
        className="opacity-70 saturate-[0.82]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_24%_18%,rgba(240,120,48,0.22),transparent_23rem),radial-gradient(circle_at_82%_62%,rgba(255,176,96,0.10),transparent_20rem),linear-gradient(110deg,rgba(8,8,8,0.94),rgba(14,14,14,0.90)_54%,rgba(8,8,8,0.96))]"
      />
      <div aria-hidden="true" className="scroll-section-dust pointer-events-none absolute inset-0 z-10" />

      <Container className="relative z-20">
        <div ref={headerRef} className="mx-auto mb-8 max-w-4xl text-center lg:mb-10">
          <h2 className="mb-4 font-heading text-3xl font-black uppercase text-white lg:text-4xl">
            Что такое методология
          </h2>
          <p className="text-lg text-white/92 lg:text-xl">
            Это не теория ради теории, а рабочая система создания образовательных
            продуктов, которую можно сразу внедрять в курс, продуктовую линейку и
            команду.
          </p>
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col gap-5 pl-5 sm:pl-8 lg:gap-6">
          <div
            ref={threadRef}
            aria-hidden="true"
            className="absolute left-1 top-2 h-[calc(100%-1rem)] w-px origin-top bg-[linear-gradient(180deg,transparent,rgba(240, 120, 48, 0.86)_10%,rgba(240, 120, 48, 0.56)_52%,rgba(240, 120, 48, 0.74)_90%,transparent)] shadow-[0_0_18px_rgba(240, 120, 48, 0.34)] sm:left-3"
          />

          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                ref={(node) => {
                  if (node) scrollRefs.current[index] = node;
                }}
                className={`method-scroll relative min-h-[174px] w-full overflow-visible px-7 py-6 sm:px-10 lg:min-h-[158px] lg:px-14 ${
                  index === 1
                    ? "method-scroll--wine lg:ml-10 lg:w-[calc(100%-2.5rem)]"
                    : index === 2
                      ? "lg:ml-4 lg:w-[calc(100%-1rem)]"
                      : "lg:w-[calc(100%-2rem)]"
                }`}
              >
                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className={`method-scroll-seal flex h-12 w-12 flex-none items-center justify-center rounded-full ${index === 1 ? "method-scroll-seal--light" : ""}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3
                      ref={(node) => {
                        if (node) titleRefs.current[index] = node;
                      }}
                      className={`font-heading text-xl font-bold ${index === 1 ? "text-text-primary" : "text-text-primary"}`}
                    >
                      {card.title}
                    </h3>
                    <p
                      ref={(node) => {
                        if (node) textRefs.current[index] = node;
                      }}
                      className={`mt-2 text-body ${index === 1 ? "text-text-primary/88" : "text-text-secondary"}`}
                    >
                      {renderInkText(card.text, card.breakBefore)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={buttonRef} className="mt-8 flex justify-center">
          <a
            href="#pricing"
            className="inline-flex min-h-[60px] w-full max-w-[340px] items-center justify-center gap-3 rounded-[12px] bg-orange-1 px-9 py-[18px] text-center text-lg font-semibold uppercase tracking-wide text-[#090909] shadow-[0_14px_32px_rgba(217,106,50,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-2 hover:shadow-[0_18px_42px_rgba(217,106,50,0.34)] sm:w-auto"
          >
            Забронировать место
            <ArrowRight className="h-5 w-5 flex-shrink-0" />
          </a>
        </div>
      </Container>
    </section>
  );
}
