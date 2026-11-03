"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const credentials = [
  "Визионер в области современного образования, исследователь, EdTech предприниматель с 17-ти летним опытом",
  "Собственник тренинговой компании, методического агентства и владелец крупнейшей онлайн-школы по методологии, входит в топ Getcourse // более 40 000 выпускников",
  "Генеральный продюсер и архитектор Акселератора «Бизнес 360» в Сбере",
  "Колумнист РБК.ПРО, Форбс, Тинькофф Бизнес-секреты, Коммерческий директор",
  "5 премий за вклад в образование + премия за лучшее методическое агентство",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ExpertIntro() {
  return (
    <section id="author" aria-labelledby="author-heading" className="bg-bg section-compact">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            <h2 id="author-heading" className="section-title">
              Создатель сообщества Александра{" "}
              <span className="whitespace-nowrap">Горева-Куртышева</span>
            </h2>

            <ul className="space-y-3 text-text-secondary section-body">
              {credentials.map((item, index) => (
                <motion.li
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-gold-2 mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative h-[300px] w-[240px] overflow-hidden rounded-[30px] border border-white/12 bg-white/[0.04] shadow-card sm:h-[400px] sm:w-[320px] sm:rounded-[36px] lg:h-[500px] lg:w-[400px]">
              <Image
                src="/method-club/optimized/5818e7bf1468b4.webp"
                alt="Портрет Александры Горевой-Куртышевой, создателя МЕТОД:КЛУБ"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
