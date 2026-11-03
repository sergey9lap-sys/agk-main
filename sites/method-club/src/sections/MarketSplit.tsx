"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, CircleOff } from "lucide-react";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MarketSplit() {
  return (
    <section className="bg-bg section-compact">
      <Container>
        <div className="mx-auto max-w-5xl rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-8 shadow-card backdrop-blur-xl lg:px-10 lg:py-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="section-title text-center"
          >
            {widont("К концу года рынок поделится на:")}
          </motion.h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="hover-lift-card hover-lift-card--gold rounded-[28px] border border-gold-2/55 bg-[linear-gradient(180deg,#f0cb89_0%,#d3a35a_100%)] p-6 text-black shadow-[0_28px_70px_rgba(211,162,78,0.28)]"
            >
              <div className="flex items-center gap-3 text-black">
                <BadgeCheck className="h-7 w-7" />
                <span className="text-[28px] font-semibold leading-[1.24] text-black md:text-[30px]">
                  {widont("Системных игроков")}
                </span>
              </div>
              <p className="mt-4 text-[16px] leading-[1.55] text-black sm:text-[18px]">
                {widont(
                  "Тех, кто строит сильные продукты на системной методологии, растёт за счёт готовых решений и забирает рынок у тех, кто продолжает действовать наугад.",
                )}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="hover-lift-card rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="flex items-center gap-3 text-white/72">
                <CircleOff className="h-7 w-7" />
                <span className="text-[28px] font-semibold leading-[1.24] text-gold-2 md:text-[30px]">
                  {widont("Случайных экспертов")}
                </span>
              </div>
              <p className="card-copy mt-4">
                {widont(
                  "Тех, кто продолжает терять месяцы на хаотичные запуски, не умеет усиливать продукт стратегией и остаётся в режиме стагнации.",
                )}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="mt-6 flex justify-center"
          >
            <a href="#pricing">
              <Button variant="primary" size="lg" className="min-w-[280px]">
                {widont("Я - системный игрок")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
