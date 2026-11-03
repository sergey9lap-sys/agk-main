"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const modules = [
  {
    title: "Основа методологии",
    text: "Соберёте логику сильного продукта: путь ученика, структуру обучения, задания, практику и результат.",
  },
  {
    title: "Продукт и линейка",
    text: "Разберётесь, как формировать отдельный курс и как выстраивать из продуктов систему, которая масштабируется.",
  },
  {
    title: "Внедрение и рост",
    text: "Поймёте, как внедрять методологию в экспертизу, команду и текущие процессы без лишнего хаоса.",
  },
];

const romanNumerals = ["I", "II", "III"];

const marblePlateClassName =
  "program-plate group relative isolate mx-auto flex min-h-[230px] w-full max-w-[390px] flex-col items-center justify-start overflow-hidden rounded-[18px] border border-white/32 bg-card-bg px-6 pb-7 pt-9 text-center opacity-0 shadow-[0_18px_42px_rgba(40,25,10,0.16),inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.58),transparent_30%),linear-gradient(135deg,#1C1C1C,#151515)] hover:-translate-y-1.5 hover:border-white/70 hover:bg-bg hover:shadow-[0_24px_54px_rgba(85,11,24,0.18),inset_0_1px_0_rgba(255,255,255,0.78)]";

export function HowItWorks() {
  const routeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: routeRef.current,
          start: "top 72%",
          once: true,
        },
      });

      gsap.set(".program-plate", { autoAlpha: 0, y: 34, scale: 0.96 });
      gsap.set(".program-route-segment", { scaleX: 0, scaleY: 0, transformOrigin: "left center" });
      gsap.set(".program-route-segment-mobile", { transformOrigin: "top center" });

      timeline
        .to('[data-program-step="0"]', { autoAlpha: 1, y: 0, scale: 1, duration: 0.28 })
        .to('[data-route-segment="0"]', { scaleX: 1, scaleY: 1, duration: 0.28, ease: "power2.inOut" }, ">-0.02")
        .to('[data-program-step="1"]', { autoAlpha: 1, y: 0, scale: 1, duration: 0.28 }, ">-0.03")
        .to('[data-route-segment="1"]', { scaleX: 1, scaleY: 1, duration: 0.28, ease: "power2.inOut" }, ">-0.02")
        .to('[data-program-step="2"]', { autoAlpha: 1, y: 0, scale: 1, duration: 0.3 }, ">-0.03");
    }, routeRef);

    return () => context.revert();
  }, []);

  return (
    <section id="program" className="relative overflow-hidden bg-black py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-27.jpg"
        variant="orange"
        position="object-bottom"
        className="opacity-38 blur-[3px] scale-[1.02] saturate-[0.72]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(255, 255, 255, 0.18),transparent_24rem),linear-gradient(180deg,rgba(43,18,7,0.08),rgba(43,18,7,0.42))]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 z-10 hidden h-[72%] w-44 opacity-[0.08] lg:block"
        initial={{ y: 16 }}
        whileInView={{ y: -10 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent_0_20px,rgba(255, 255, 255, 0.9)_20px_29px,transparent_29px_50px)]" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 z-10 hidden h-[74%] w-44 opacity-[0.08] lg:block"
        initial={{ y: -8 }}
        whileInView={{ y: 12 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent_0_20px,rgba(255, 255, 255, 0.9)_20px_29px,transparent_29px_50px)]" />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-25 [background-image:radial-gradient(circle,rgba(240, 120, 48, 0.34)_0_1px,transparent_1.6px),radial-gradient(circle,rgba(255, 255, 255, 0.34)_0_1px,transparent_1.7px)] [background-position:16%_22%,76%_34%] [background-size:210px_190px,300px_270px]"
      />
      <Container className="relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center lg:mb-10"
        >
          <h2 className="mb-4 font-heading text-3xl font-black uppercase text-white lg:text-4xl">
            Программа обучения
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-white/90 lg:text-xl">
            Программа выстроена так, чтобы вы последовательно собрали сильный
            продукт, продуктовую систему и понятную логику внедрения.
          </p>
        </motion.div>

        <div ref={routeRef} className="relative mx-auto max-w-6xl">
          <div
            aria-hidden="true"
            className="absolute left-[18%] right-[18%] top-[48px] z-0 hidden h-[4px] lg:flex"
          >
            <span
              data-route-segment="0"
              className="program-route-segment h-full flex-1 rounded-full bg-[linear-gradient(90deg,#F07830,#FFB060,#F07830)] shadow-[0_0_18px_rgba(240, 120, 48, 0.28)]"
            />
            <span
              data-route-segment="1"
              className="program-route-segment h-full flex-1 rounded-full bg-[linear-gradient(90deg,#F07830,#FFB060,#F07830)] shadow-[0_0_18px_rgba(240, 120, 48, 0.28)]"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-0 lg:grid-cols-3 lg:gap-7">
            {modules.map((module, index) => (
              <div key={module.title} className="relative">
                <div data-program-step={index} className={marblePlateClassName}>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[18px] border border-orange-3/46 bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.24),transparent_30%),linear-gradient(145deg,#F07830,#151515_52%,#080808)] font-heading text-3xl font-black text-orange-3 shadow-[0_12px_28px_rgba(85,11,24,0.24),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-6px_12px_rgba(58,0,12,0.26)]">
                    {romanNumerals[index]}
                  </div>
                  <h3 className="mb-3 font-heading text-2xl font-black text-text-primary">
                    {module.title}
                  </h3>
                  <p className="text-base font-semibold leading-relaxed text-text-secondary">
                    {module.text}
                  </p>
                </div>

                {index < modules.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="flex h-14 justify-center lg:hidden"
                  >
                    <span
                      data-route-segment={index}
                      className="program-route-segment program-route-segment-mobile block h-full w-[4px] rounded-full bg-[linear-gradient(180deg,#F07830,#FFB060,#F07830)] shadow-[0_0_18px_rgba(240, 120, 48, 0.28)]"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
