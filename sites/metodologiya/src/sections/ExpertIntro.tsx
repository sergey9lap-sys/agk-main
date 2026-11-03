"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const credentials = [
  "EdTech-предприниматель, основатель крупнейшей школы по методологии и методического агентства.",
  "Архитектор и генеральный продюсер крупнейшего акселератора для предпринимателей Бизнес 360 в Сбере (40 000 участников).",
  "3 высших образования в сфере педагогики и обучения, выпускница Сколково.",
  "С 2009 года в бизнес‑обучении, с 2020 года в онлайн‑образовании.",
  "Консультант и тренер СБЕР, РОСНЕФТЬ, Норникель, Nestle, X5, ВкусВилл и других компаний.",
  "Вице-президент Ассоциации Спикеров СНГ.",
  "5 премий за вклад в образование и победа в номинации «Лучшая школа методологии».",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ExpertIntro() {
  return (
    <section id="author" className="relative overflow-hidden bg-bg py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-31-12.jpg"
        variant="light"
        position="object-center"
      />
      <Container className="relative z-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center font-heading text-3xl font-black uppercase text-text-primary lg:mb-10 lg:text-4xl"
        >
          Кто ведёт курс
        </motion.h2>

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative h-[350px] w-[280px] overflow-hidden rounded-2xl border-4 border-orange-1 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:h-[400px] sm:w-[320px] lg:h-[480px] lg:w-[380px]">
              <Image
                src="/metodologiya/optimized/490283206d3631.webp"
                alt="Александра Горева-Куртышева"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <h3 className="font-heading text-2xl font-bold text-text-primary lg:text-3xl">
              Александра Горева-Куртышева
            </h3>

            <ul className="space-y-3">
              {credentials.map((item, index) => (
                <motion.li
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <Star className="mt-0.5 h-5 w-5 flex-shrink-0 fill-orange-1 text-orange-1" />
                  <span className="text-body text-text-secondary">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
