"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const employers = [
  "Skyeng",
  "СБЕР Университет",
  "РЖД",
  "ВКонтакте",
  "Skillbox",
  "Нетология",
  "Avito",
  "МГТУ им. Баумана",
];

export function Employers() {
  return (
    <section className="bg-card-bg py-10 lg:py-12">
      <Container>
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center font-heading text-2xl font-bold uppercase text-text-primary lg:text-3xl"
        >
          Наши выпускники работают и внедряют методологию в:
        </motion.h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 lg:gap-4"
        >
          {employers.map((name) => {
            const highlighted = name === "Skillbox" || name === "Нетология";

            return (
              <div
                key={name}
                className={`rounded-xl px-6 py-3 text-base font-bold shadow-md transition-all hover:-translate-y-1 hover:shadow-lg lg:text-lg ${
                  highlighted
                    ? "border border-white/70 bg-white text-[#080808] hover:border-orange-2"
                    : "border border-white/35 bg-card-bg text-text-primary hover:border-white/70"
                }`}
              >
                {name}
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
