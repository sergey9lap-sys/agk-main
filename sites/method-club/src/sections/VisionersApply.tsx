"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fitItems = [
  "Ваш бизнес уже приносит стабильный доход, но вы чувствуете потолок и не знаете, как его пробить",
  'Вы хотите не просто "быть в курсе трендов", а задавать тренды в своей нише',
  "Вам нужен не коуч и не наставник, а равный партнер-визионер, который видит ваш бизнес целиком",
  "Вы готовы инвестировать в свой личный бренд и публичную узнаваемость",
  "Вы понимаете: чтобы расти дальше, нужно окружать себя теми, кто уже вырос",
];

const APPLY_URL =
  "https://agkedu.getcourse.ru/pl/teach/control/lesson/view?id=340007008&editMode=0";

export function VisionersApply() {
  return (
    <section className="bg-bg section-compact">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="panel-dark relative mx-auto max-w-5xl border-gold-2/28 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:p-8"
        >
          <h2 className="section-title--gold text-center">
            Мастер-группа «Визионеры» для вас, если:
          </h2>

          <div className="mt-8 space-y-3">
            {fitItems.map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card-gold-soft px-5 py-4"
              >
                <p className="card-copy text-text-primary sm:text-[18px]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              className="w-full max-w-[540px]"
              onClick={() => window.location.assign(APPLY_URL)}
            >
              Оставить заявку в «Визионеры»
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
