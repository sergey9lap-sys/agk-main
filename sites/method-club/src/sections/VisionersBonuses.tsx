"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const bonuses = [
  {
    lead: "Рекламная интеграция в блоге Александры",
    body: "выход на аудиторию 40 000+ учеников и подписчиков",
  },
  {
    lead: "Постановка в качестве спикера на мероприятие",
    body: "выступление на сцене, где вас услышат ваши же клиенты и партнеры",
  },
  {
    lead: "Совместная статья в РБК или издании аналогичного уровня",
    body: "размещение в топовом деловом СМИ, которое работает на ваш личный бренд годами",
  },
  {
    lead: "День с Александрой",
    body: "вы проводите день рядом: планерки, совместное ведение тренинга, переговоры с заказчиком. Вы видите, как принимаются решения на уровне крупного бизнеса, и забираете этот навык себе",
  },
];

export function VisionersBonuses() {
  return (
    <section className="bg-bg section-compact">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="panel-dark relative mx-auto max-w-6xl border-gold-2/28 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:p-8"
        >
          <h2 className="section-title--gold">Бонусы для Визионеров</h2>
          <p className="content-body-xl mt-5 max-w-5xl">
            Это то, что выделяет «Визионеров» из любого другого формата: Вы
            получаете не просто обучение, а интеграцию в инфополе Александры и
            публичное усиление личного бренда
          </p>
          <p className="content-body-xl mt-6 font-medium text-gold-2">
            Выберите один бонус из списка:
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={bonus.lead}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="card-gold-soft card-gold-soft-padded"
              >
                <p className="card-copy text-text-primary sm:text-[18px]">
                  <span className="font-semibold text-gold-2">{bonus.lead}</span>
                  {" — "}
                  {bonus.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="card-gold-soft card-gold-soft-padded mt-6 transition-[border-color,box-shadow,background-color] duration-220 ease-out hover:border-gold-2/38 hover:shadow-[0_26px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(240,212,165,0.08),0_0_40px_rgba(214,166,92,0.16)]">
            <p className="card-copy text-text-primary sm:text-[18px]">
              Плюс эксклюзивный мерч мастер-группы «Визионеры» — закрытый
              атрибут принадлежности к сообществу
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
