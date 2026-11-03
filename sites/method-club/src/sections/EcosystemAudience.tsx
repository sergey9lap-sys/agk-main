"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const audience = [
  "Опытным экспертам, кто хочет масштабировать свой бизнес и выйти на новую аудиторию",
  "Начинающим экспертам, кто ищет ориентиры и способ ускорить свой путь",
  "Предпринимателям / «сбитым летчикам», кто хочет вернуть рост бизнеса после застоя",
  "Онлайн-школам, кто уже растёт и планирует масштабирование",
  "Продюсерам и маркетологам, кто работает с экспертами и школами для глубокого понимания продукта и стратегии",
];

export function EcosystemAudience() {
  return (
    <section className="bg-bg section-compact">
      <Container>
        <div className="panel-dark panel-dark-padded relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute bottom-[-96px] right-[-40px] h-[180px] w-[420px] rounded-full border-t border-gold-2/12 opacity-50" />
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="section-title--gold max-w-3xl uppercase leading-[0.98]"
          >
            Кому подойдет наша экосистема
          </motion.h2>

          <div className="mt-8 space-y-5">
            {audience.map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1.5 h-5 w-5 flex-shrink-0 rounded-full bg-[linear-gradient(180deg,#d6a65c_0%,#f0d4a5_100%)] shadow-[0_8px_18px_rgba(214,166,92,0.22)]" />
                <p className="content-body-xl">
                  {widont(item)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
