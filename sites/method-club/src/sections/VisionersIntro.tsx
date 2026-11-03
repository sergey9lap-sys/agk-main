"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function VisionersIntro() {
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
          <h2 className="section-title--gold text-center uppercase">
            Визионеры
          </h2>
          <p className="content-body-xl mt-4 text-center">
            Личная стратегия, элитное окружение и доступ к кухне лидеров рынка
          </p>
          <p className="mt-6 text-center text-[20px] italic leading-[1.42] text-gold-1 sm:text-[28px]">
            {widont(
              "Мастер-группа для тех, кто строит образование будущего, задаёт тренды и новые стандарты",
            )}
          </p>

          <div className="content-body-xl mt-8 space-y-5">
            <p>
              Здесь вы получаете личное вовлечение Александры в ваш бизнес,
              элитный нетворкинг и выход на новый уровень принятия решений
            </p>
            <p>
              Мы собрали вместе людей, которые не гадают, а знают: как
              масштабироваться, где брать ресурс и как строить компании,
              которые меняют рынок
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
