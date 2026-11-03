"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "@/components/ui/CountdownTimer";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { COURSE_START_DATE, COURSE_START_DATE_RAW } from "@/lib/constants";
import { Award, BookOpen, Calendar, Globe, Target } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";

const heroStats = [
  { value: "16", label: "потоков курса", icon: BookOpen },
  { value: "> 40 000", label: "выпускников из 50 стран", icon: Globe },
  { value: "98-100%", label: "учеников с результатом", icon: Target },
  { value: "5", label: "премий за вклад в образование", icon: Award },
];

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleReady, setTitleReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageScrollY = useTransform(scrollY, [0, 1000], [0, -72]);
  const imageScrollScale = useTransform(scrollY, [0, 420], [1.03, 1]);
  const backgroundScrollY = useTransform(scrollY, [0, 1000], [0, -26]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 70, damping: 24, mass: 0.6 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 70, damping: 24, mass: 0.6 });
  const photoX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const photoY = useTransform(smoothMouseY, [-1, 1], [-7, 7]);
  const dustX = useTransform(smoothMouseX, [-1, 1], [10, -10]);
  const dustY = useTransform(smoothMouseY, [-1, 1], [7, -7]);
  const lightX = useTransform(smoothMouseX, [-1, 1], [-5, 5]);
  const lightY = useTransform(smoothMouseY, [-1, 1], [-3, 3]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTitleReady(true);
      return;
    }

    let split: { chars?: HTMLElement[]; revert: () => void } | undefined;
    let context: { revert: () => void } | undefined;

    const animateTitle = async () => {
      if (!titleRef.current) return;

      const [{ default: SplitType }, { gsap }] = await Promise.all([
        import("split-type"),
        import("gsap"),
      ]);

      if (!titleRef.current) return;

      split = new SplitType(titleRef.current, {
        types: "words,chars",
        tagName: "span",
      }) as unknown as { chars?: HTMLElement[]; revert: () => void };

      context = gsap.context(() => {
        const chars = split?.chars ?? [];
        gsap.set(chars, {
          yPercent: 72,
          opacity: 0,
          filter: "blur(10px)",
          transformOrigin: "50% 100%",
        });
        setTitleReady(true);
        gsap.to(chars, {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.82,
          ease: "power3.out",
          stagger: 0.026,
          delay: 0.12,
        });
      }, titleRef);
    };

    animateTitle().catch(() => setTitleReady(true));

    return () => {
      context?.revert();
      split?.revert();
    };
  }, [shouldReduceMotion]);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;

    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const renderStatValue = (value: string) => {
    if (value === "16") return <AnimatedCounter end={16} duration={1400} />;
    if (value === "> 40 000") return <AnimatedCounter end={40000} duration={1800} prefix=">" />;
    if (value === "98-100%") {
      return (
        <>
          <AnimatedCounter end={98} duration={1300} />
          -
          <AnimatedCounter end={100} duration={1500} suffix="%" />
        </>
      );
    }
    if (value === "5") return <AnimatedCounter end={5} duration={1100} />;
    return value;
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-20 overflow-hidden bg-bg py-8 lg:py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_1100px_760px_at_78%_12%,rgba(240,120,48,0.24),transparent_70%),radial-gradient(ellipse_780px_560px_at_10%_88%,rgba(240,120,48,0.12),transparent_65%),linear-gradient(180deg,#080808_0%,#0E0E0E_58%,#080808_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] opacity-45 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <motion.div
        style={{
          y: shouldReduceMotion ? 0 : imageScrollY,
          x: shouldReduceMotion ? 0 : photoX,
          scale: shouldReduceMotion ? 1 : imageScrollScale,
        }}
        className="pointer-events-none absolute inset-y-0 right-0 z-[4] hidden w-[51vw] lg:block"
      >
        <div className="absolute right-[8%] top-[18%] z-20 h-40 w-40 rounded-full border border-white/16 shadow-[inset_0_0_0_1px_rgba(240,120,48,0.20)]">
          <motion.span
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 rounded-full"
          >
            <span className="absolute -right-1 top-8 h-3 w-3 rounded-full bg-orange-1" />
            <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-orange-3 shadow-[0_0_0_4px_rgba(240,120,48,0.10)]" />
            <span className="absolute bottom-2 left-12 h-2.5 w-2.5 rounded-full bg-bg" />
          </motion.span>
        </div>
        <Image
          src="/metodologiya/images/blok-1.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="51vw"
          className="object-cover object-top"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.62) 24%, #000 42%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.62) 24%, #000 42%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.26)_0%,rgba(240,120,48,0.16)_20%,rgba(240,120,48,0.03)_48%,rgba(8,8,8,0.08)_100%)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: shouldReduceMotion ? 0 : backgroundScrollY, x: shouldReduceMotion ? 0 : lightX }}
        className="hero-light-rays pointer-events-none absolute inset-0 z-[1]"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: shouldReduceMotion ? 0 : dustX, y: shouldReduceMotion ? 0 : dustY }}
        className="hero-gold-dust pointer-events-none absolute inset-0 z-[1] opacity-20"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: shouldReduceMotion ? 0 : lightX, y: shouldReduceMotion ? 0 : lightY }}
        className="hero-antique-columns pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[24vw] lg:block"
      />

      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 lg:min-h-[650px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="max-w-[820px] space-y-4 text-left lg:max-w-[740px] lg:space-y-5 xl:max-w-[800px]"
          >
            <div className="space-y-3 lg:space-y-4">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <div className="inline-flex max-w-full items-center gap-3 rounded-[12px] border border-orange-1/32 bg-orange-5/80 px-4 py-2 font-mono text-xs font-semibold uppercase leading-snug tracking-[0.12em] text-orange-2 shadow-sm backdrop-blur-sm">
                  <Award className="h-4 w-4 flex-shrink-0" />
                  <span className="min-w-0 break-words">Легендарный курс Академии методологии Александры Горевой-Куртышевой</span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex max-w-full items-center gap-3 rounded-xl border border-orange-1/28 bg-card-bg/86 px-5 py-2.5 font-bold leading-snug text-text-primary shadow-md transition-all hover:-translate-y-0.5 hover:border-orange-1/55 hover:text-orange-3 hover:shadow-lg"
                >
                  <Calendar className="h-5 w-5 flex-shrink-0 text-white" />
                  <span className="min-w-0 break-words">Старт 17-го потока: {COURSE_START_DATE}</span>
                </motion.div>
              </div>

              <div className="lg:hidden">
                <h1 className="max-w-full whitespace-nowrap font-heading text-[clamp(35px,10.2vw,42px)] font-black leading-[0.88] tracking-normal text-text-primary uppercase">
                  МЕТОДОЛОГИЯ
                </h1>
                <p className="mt-4 text-[20px] font-semibold leading-[1.18] text-text-primary">
                  Пошаговая система создания онлайн‑курсов и&nbsp;продуктовых
                  линеек для&nbsp;экспертов и&nbsp;предпринимателей
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.58, ease: "easeOut", delay: 0.24 }}
                  className="relative mt-5 h-[300px] w-full overflow-hidden rounded-[18px] border border-white/10 bg-card-bg shadow-[0_22px_48px_rgba(0,0,0,0.28)]"
                >
                  <Image
                    src="/metodologiya/images/blok-1.jpg"
                    alt="Александра Горева-Куртышева"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.05)_0%,rgba(240,120,48,0.08)_58%,rgba(8,8,8,0.40)_100%)]" />
                </motion.div>
              </div>
              <h1
                ref={titleRef}
                style={{ visibility: titleReady ? "visible" : "hidden" }}
                className="hero-title hidden w-max max-w-none pr-8 font-heading font-black leading-[0.9] tracking-normal text-text-primary uppercase lg:block lg:text-[66px] xl:text-[72px]"
              >
                МЕТОДОЛОГИЯ
              </h1>

              <p className="hidden max-w-[760px] text-xl font-semibold text-text-primary lg:block lg:text-[23px] xl:text-2xl">
                Пошаговая система создания онлайн‑курсов
                <br />
                <span className="whitespace-nowrap">и продуктовых линеек для экспертов и предпринимателей</span>
              </p>

            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.34 }}
              className="flex w-full max-w-[760px] flex-col items-start gap-4 pt-1 lg:flex-row lg:items-center"
            >
              <a href="#program" className="w-full lg:flex-[1_1_430px]">
                <Button variant="primary" size="lg" className="min-h-[68px] w-full px-8 text-lg lg:text-xl">
                  Посмотреть программу обучения
                </Button>
              </a>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="hero-timer-card relative w-full overflow-hidden rounded-2xl border border-white/10 bg-card-bg/86 px-5 py-3.5 shadow-card backdrop-blur-md lg:w-[340px] lg:flex-none"
              >
                <p className="mb-2 text-sm font-semibold text-text-secondary">
                  До старта курса:
                </p>
                <CountdownTimer targetDate={COURSE_START_DATE_RAW} compact />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.32 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.09,
                    delayChildren: 0.08,
                  },
                },
              }}
              className="grid max-w-[760px] grid-cols-2 gap-3 pt-2 lg:grid-cols-4 lg:gap-4"
            >
              {heroStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
                      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.56, ease: "easeOut" }}
                    className="rounded-2xl border border-white/10 bg-card-bg/86 px-5 py-5 text-center shadow-card backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-2/42 hover:shadow-card-hover"
                  >
                    <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-1 text-[#090909] shadow-button">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="font-heading text-2xl font-black leading-none text-text-primary lg:text-3xl">
                      {renderStatValue(stat.value)}
                    </div>
                    <div className="mx-auto my-1.5 h-px w-8 bg-orange-1/45" />
                    <p className="text-xs font-semibold leading-tight text-text-primary">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
