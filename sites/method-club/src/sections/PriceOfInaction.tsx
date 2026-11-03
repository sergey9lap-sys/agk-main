"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const losses = [
  {
    text: 'Вы продолжаете гадать, какой продукт "выстрелит", и сливаете бюджет на неработающие связки',
    loss: "Потери: 200-500 тысяч ежемесячно",
  },
  {
    text: "Вы тратите месяцы на набивание собственных шишек, в то время как конкуренты уже используют готовые схемы лидеров рынка",
    loss: "Потери: 20-40 часов еженедельно",
  },
  {
    text: "Вы упускаете тренды и теряете прибыль, потому что ваш продукт устаревает быстрее, чем вы его создаете",
    loss: "Потери: Клиенты ушли к конкурентам",
  },
  {
    text: 'Вместо роста и масштабирования — стагнация и "работа за еду"',
    loss: "Потери за год: от 2 400 000 рублей",
    highlight: true,
  },
];

export function PriceOfInaction() {
  return (
    <section className="bg-bg section-compact">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-5xl text-center lg:mb-12"
        >
          <h2 className="section-title--gold mx-auto max-w-6xl text-center !text-[32px] sm:!text-[40px] lg:!text-[48px]">
            {widont("Цена застоя: Сколько вы теряете, оставаясь в изоляции?")}
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {losses.map((loss, index) => (
            <motion.div
              key={loss.loss}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={[
                "hover-lift-card rounded-[28px] border p-5 lg:p-6",
                loss.highlight
                  ? "hover-lift-card--gold border-gold-2/55 bg-[linear-gradient(180deg,#f0cb89_0%,#d3a35a_100%)] shadow-[0_28px_70px_rgba(211,162,78,0.28)]"
                  : "border-white/10 bg-white/[0.03]",
              ].join(" ")}
            >
              <p
                className={[
                  "text-[18px] leading-[1.5] sm:text-[20px] lg:text-[22px]",
                  loss.highlight ? "text-black/82" : "text-text-secondary",
                ].join(" ")}
              >
                {widont(loss.text)}
              </p>
              <p
                className={[
                  "mt-6 text-[18px] font-semibold leading-[1.35] sm:text-[20px]",
                  loss.highlight ? "text-black" : "text-gold-2",
                ].join(" ")}
              >
                {widont(loss.loss)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
