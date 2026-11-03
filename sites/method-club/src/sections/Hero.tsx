"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const featureCards = [
  "Динамическая библиотека",
  "Живые разборы лидеров рынка",
  "Золотой билет на все мастер-классы и интенсивы 2026",
  "1400 часов контента",
  "~130 рублей в день",
  "500+ экспертов и предпринимателей из разных стран",
];

const heroImagePath = encodeURI("/method-club/images/Фото 1 блок.jpg");

export function Hero() {
  const [hasHeroImage, setHasHeroImage] = useState(true);
  const leftCards = useMemo(() => featureCards.slice(0, 3), []);
  const rightCards = useMemo(() => featureCards.slice(3), []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-bg py-8 lg:min-h-[86vh] lg:py-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-[60px] h-[340px] w-[340px] bg-[radial-gradient(circle,rgba(214,166,92,0.16),transparent_62%)] blur-xl" />
        <div className="absolute right-[-50px] top-[120px] h-[360px] w-[360px] bg-[radial-gradient(circle,rgba(240,212,165,0.12),transparent_62%)] blur-xl" />
        <div className="absolute bottom-[-120px] left-1/2 h-[320px] w-[620px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(214,166,92,0.10),transparent_68%)] blur-2xl" />
      </div>

      <Container>
        <div className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="mx-auto max-w-[320px] text-center text-[20px] leading-[1.2] text-text-secondary sm:max-w-2xl sm:text-[22px] md:text-[28px]">
              Экосистема создателей образования будущего
            </p>
            <h1
              id="hero-title"
              className="gold-gradient-text mt-4 font-heading text-[52px] leading-[0.9] tracking-[0.01em] sm:text-[72px] md:text-[96px] lg:text-[120px] xl:text-[144px]"
            >
              МЕТОД:КЛУБ
            </h1>
            <p className="mt-5 text-center text-[18px] leading-[1.32] text-text-primary sm:text-[22px] md:text-[28px]">
              {widont("Стратегия, методология и разборы лидеров рынка")}
            </p>
            <p className="mx-auto mt-2 max-w-[340px] text-center text-[17px] leading-[1.5] text-text-secondary sm:max-w-4xl sm:text-body md:text-[18px]">
              {widont("Сообщество для тех, кто хочет расти быстрее, чем рынок")}
            </p>
          </motion.div>

          <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] px-3 py-4 shadow-[0_34px_80px_rgba(0,0,0,0.42)] sm:px-4 sm:py-5 lg:rounded-[42px] lg:px-6 lg:py-6">
            {hasHeroImage ? (
              <div className="pointer-events-none absolute inset-x-[16%] bottom-0 top-[13%] hidden overflow-hidden rounded-[34px] xl:block">
                <Image
                  src={heroImagePath}
                  alt="Участники сообщества МЕТОД:КЛУБ на встрече клуба"
                  fill
                  priority
                  className="object-cover object-[center_20%] scale-[1.18] saturate-[0.94] brightness-[0.84]"
                  onError={() => setHasHeroImage(false)}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0)_0%,rgba(8,7,6,0.01)_10%,rgba(8,7,6,0.04)_20%,rgba(8,7,6,0.1)_34%,rgba(8,7,6,0.24)_48%,rgba(8,7,6,0.5)_64%,rgba(8,7,6,0.82)_80%,rgba(8,7,6,1)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,236,0.09)_0%,rgba(255,248,236,0.04)_14%,rgba(255,248,236,0.01)_26%,rgba(255,248,236,0)_40%,rgba(255,248,236,0)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,0.18)_0%,rgba(8,7,6,0.03)_22%,rgba(8,7,6,0)_50%,rgba(8,7,6,0.03)_78%,rgba(8,7,6,0.18)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,166,92,0.04),transparent_62%)]" />
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,0.08),rgba(10,9,8,0.18))]" />

            <div className="relative grid gap-3 sm:gap-4 xl:grid-cols-[220px_minmax(0,1fr)_220px] xl:items-center">
            <div className="grid gap-3 sm:gap-4">
              {leftCards.map((card, index) => (
                <motion.div
                  key={card}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
                  className="hover-lift-card relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-4 py-3.5 pl-7 text-[15px] font-semibold leading-[1.22] text-gold-2 shadow-[0_18px_36px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:rounded-[26px] sm:px-5 sm:py-4 sm:pl-8 sm:text-[17px] md:text-[19px]"
                >
                  <span className="absolute inset-y-4 left-0 w-[5px] rounded-full bg-[linear-gradient(180deg,#f1d090_0%,#c99343_100%)]" />
                  {widont(card)}
                </motion.div>
              ))}
            </div>

            {hasHeroImage ? (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
                className="relative mx-auto block h-[390px] w-full max-w-[300px] overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_24px_40px_rgba(0,0,0,0.28)] sm:h-[500px] sm:max-w-[380px] xl:hidden"
              >
                <Image
                  src={heroImagePath}
                  alt="Участники сообщества МЕТОД:КЛУБ на встрече клуба"
                  fill
                  priority
                  className="object-cover object-[center_24%] brightness-[0.9] saturate-[0.95]"
                  onError={() => setHasHeroImage(false)}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0)_0%,rgba(8,7,6,0.01)_10%,rgba(8,7,6,0.03)_20%,rgba(8,7,6,0.08)_34%,rgba(8,7,6,0.18)_48%,rgba(8,7,6,0.38)_64%,rgba(8,7,6,0.66)_80%,rgba(8,7,6,0.92)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,236,0.06)_0%,rgba(255,248,236,0.025)_14%,rgba(255,248,236,0)_28%,rgba(255,248,236,0)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,0.1)_0%,rgba(8,7,6,0)_24%,rgba(8,7,6,0)_76%,rgba(8,7,6,0.1)_100%)]" />
              </motion.div>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
              className="relative hidden min-h-[350px] lg:min-h-[430px] xl:block"
            >
              {!hasHeroImage ? (
                <div className="absolute inset-0">
                  <div className="flex aspect-[16/9] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(214,166,92,0.22),transparent_35%),linear-gradient(180deg,#181412_0%,#0d0b0a_100%)] p-8 text-center">
                    <div>
                      <div className="font-heading text-4xl text-white">
                        Method Club
                      </div>
                      <p className="mt-3 text-sm text-text-secondary">
                        Сюда можно положить групповое фото в
                        /public/images/Фото 1 блок.jpg
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.div>

            <div className="grid gap-3 sm:gap-4">
              {rightCards.map((card, index) => (
                <motion.div
                  key={card}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.18 + index * 0.08 }}
                  className="hover-lift-card relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(270deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] px-4 py-3.5 pl-7 text-[15px] font-semibold leading-[1.22] text-gold-2 shadow-[0_18px_36px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:rounded-[26px] sm:px-5 sm:py-4 sm:pl-8 sm:text-[17px] md:text-[19px]"
                >
                  <span className="absolute inset-y-4 left-0 w-[5px] rounded-full bg-[linear-gradient(180deg,#f1d090_0%,#c99343_100%)]" />
                  {widont(card)}
                </motion.div>
              ))}
            </div>
          </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.38 }}
            className="mt-6 flex justify-center"
          >
            <a href="#pricing">
              <Button variant="primary" size="lg" className="w-full min-w-0 sm:min-w-[320px]">
                Получить стратегию роста
              </Button>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
