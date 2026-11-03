"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const items = [
  {
    title: "Динамическая библиотека",
    text: "Экспертная база знаний на актуальные темы всегда под рукой. Обновляется и пополняется ежемесячно",
  },
  {
    title: "Разборы лидеров рынка",
    text: "Изнанка инфобизнеса: взлёты / падения / стратегии лидеров. Только реальные кейсы",
  },
  {
    title: "Сообщество экспертов",
    text: '500+ сильных экспертов и предпринимателей: безопасная среда, где не "хейтят", а помогают',
  },
  {
    title: "Золотой билет 2026",
    text: "Доступ на все живые мастер-классы и интенсивы Александры 2026 года",
  },
  {
    title: "Закрытые эфиры / мастермайнды*",
    text: "Живое общение на актуальные темы, возможность разобрать свой кейс в прямом эфире и получить обратную связь от Александры",
  },
  {
    title: "Живые встречи / нетворкинг",
    text: "Приглашённые спикеры / тренинги / менторские встречи / нетворкинг / живое общение в кругу профессионалов",
  },
];

export function WhatIsClub() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-bg section-compact">
      <Container>
        <motion.h2
          id="about-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="section-title text-center"
        >
          {widont("По цене чашки кофе в день вас ждёт:")}
        </motion.h2>

        <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="card-dark card-dark-padded"
            >
              <h3 className="min-h-[68px] text-[21px] font-semibold leading-[1.2] text-gold-2 sm:min-h-[84px] sm:text-[24px] md:text-[28px]">
                {widont(item.title)}
              </h3>
              <p className="card-copy mt-3 sm:mt-4">
                {widont(item.text)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hover-lift-card hover-lift-card--gold mt-4 rounded-[22px] border border-gold-2/55 bg-[linear-gradient(180deg,#f0cb89_0%,#d3a35a_100%)] p-4 sm:mt-5 sm:rounded-[28px] sm:p-6 lg:p-7"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-[22px] font-semibold leading-[1.16] text-black sm:text-[28px]">
                Окупаемость с первого инсайта
              </p>
              <p className="mt-2 max-w-3xl text-[16px] leading-[1.55] text-black sm:mt-3 sm:text-[18px]">
                Перестаньте терять миллионы на методических ошибках. Стройте
                образование будущего вместе с Александрой.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-8 text-center sm:mt-10"
        >
          <a href="#pricing">
            <Button variant="primary" className="w-full sm:w-auto">Хочу окупить участие</Button>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
