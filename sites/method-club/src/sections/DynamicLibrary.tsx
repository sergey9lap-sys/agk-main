"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const metrics = ["110+ лекций", "16+ мастер-классов", "Золотой билет 2026"];

const expertRows = [
  {
    name: "Аяз Шабутдинов",
    text: "взлеты, падения и фатальные методические ошибки",
    imagePath: encodeURI("/method-club/images/Аяз Шабутдинов 7 блок.png"),
  },
  {
    name: "Силиконовая долина",
    text: "большие разборы из технологического рынка",
    imagePath: encodeURI("/method-club/images/Силиконовая долина 7 блок.png"),
  },
  {
    name: "Михаил Гребенюк",
    text: "большие разборы НСП и продуктовой системы",
    imagePath: encodeURI("/method-club/images/Михаил гребенюк 7 блок.png"),
  },
  {
    name: "Хейтерские разборы",
    text: "разборы без фильтров и слепых зон",
    imagePath: encodeURI("/method-club/images/хейтерские разборы 7 блок.png"),
  },
  {
    name: "Оскар Хартман",
    text: "секрет его системного роста",
    imagePath: encodeURI("/method-club/images/Оскар Хартман 7 блок.png"),
  },
  {
    name: "Николай Картозия",
    text: "2500 участников в чеке 300 тысяч без прогрева",
    imagePath: encodeURI("/method-club/images/Николай Картозия 7 блок.png"),
  },
  {
    name: "Бизнес-Молодость",
    text: "взлет и падение легендарного проекта",
    imagePath: encodeURI("/method-club/images/Бизнес молодость 7 блок.png"),
  },
  {
    name: "Тони Роббинс",
    text: "феномен рынка, почему даже его онлайн-тренинги стоят 4000$",
    imagePath: encodeURI("/method-club/images/Тони Роббинс 7 блок.png"),
  },
];

export function DynamicLibrary() {
  return (
    <section aria-labelledby="dynamic-library-heading" className="bg-bg section-compact">
      <Container>
        <div className="mx-auto max-w-6xl">
          <motion.h2
            id="dynamic-library-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="section-title--gold uppercase"
          >
            Что такое динамическая библиотека?
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="section-subtitle mt-3 max-w-4xl italic"
          >
            {widont("Спойлер: обновляется быстрее, чем конкуренты успевают скопировать вашу старую стратегию")}
          </motion.p>

          <div className="mt-8 grid gap-3 md:mt-10 md:gap-4 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.45, delay: 0.08 + index * 0.06 }}
                className="hover-lift-card hover-lift-card--gold rounded-[20px] border border-gold-2/35 bg-[linear-gradient(180deg,#f0cb89_0%,#d3a35a_100%)] px-4 py-4 text-center text-[18px] font-semibold text-black sm:rounded-[22px] sm:px-6 sm:py-5 sm:text-[23px]"
              >
                {widont(metric)}
              </motion.div>
            ))}
          </div>

          <div className="content-body-lg mt-8 max-w-5xl space-y-4 sm:mt-10 sm:space-y-5">
            <p>
              <span className="font-semibold text-gold-2">
                Динамическая библиотека
              </span>{" "}
              — это ваш личный штаб по разведке трендов. В отличие от обычных
              курсов, библиотека живет и дышит вместе с рынком.
            </p>
            <p>
              Мы уже собрали для вас лучшие фишки у Николая Картозия, Оскара
              Хартмана, Клуба Первых, Михаила Гребенюка и других лидеров рынка.
              Вам осталось просто взять и применить.
            </p>
            <p>
              Перестаньте гадать, как сделать вебинар-миллионник или эффективный
              мастер-класс. В библиотеке есть ответ под любую вашу задачу.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.18 }}
          className="relative mt-8 overflow-hidden rounded-[24px] border border-gold-2/20 bg-[radial-gradient(circle_at_top,rgba(214,166,92,0.10),transparent_34%),linear-gradient(180deg,#14110f_0%,#090909_100%)] p-4 shadow-card sm:mt-10 sm:rounded-[32px] sm:p-6 lg:p-8"
        >
          <div className="max-w-5xl">
            <p className="section-title uppercase">
              {widont("Среда, в которой есть всё для вашего развития на рынке онлайн-образования")}
            </p>
            <p className="card-copy mt-4 text-text-primary sm:mt-5 sm:text-[18px]">
              <span className="font-semibold text-gold-2">Живые разборы и эфиры</span>{" "}
              — лучшие кейсы онлайн-рынка с адаптацией на вашу продуктовую линейку
            </p>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 xl:grid-cols-2">
              {expertRows.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.4, delay: 0.05 + index * 0.04 }}
                  className="hover-lift-card rounded-[20px] border border-gold-2/50 bg-[linear-gradient(90deg,rgba(10,10,10,0.96),rgba(16,16,16,0.92))] px-3 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:rounded-[24px] sm:px-4 sm:py-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-gold-2/25 bg-[radial-gradient(circle_at_top,#f3d7a0_0%,#c99647_68%,#8a5d22_100%)] shadow-[0_8px_22px_rgba(211,162,78,0.24)] sm:h-14 sm:w-14">
                      <Image
                        src={item.imagePath}
                        alt={`Обложка разбора: ${item.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="card-copy leading-[1.4] text-text-primary sm:text-[18px]">
                      <span className="font-semibold text-gold-2">{item.name}</span>
                      {": "}
                      <span className="text-white/92">{item.text}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pointer-events-none mt-8 h-px bg-gradient-to-r from-transparent via-gold-2/30 to-transparent" />
            <div className="pointer-events-none absolute bottom-[-40px] right-[12%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(214,166,92,0.18),transparent_62%)] blur-2xl" />
            <div className="pointer-events-none absolute left-[8%] top-[30%] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(214,166,92,0.10),transparent_62%)] blur-2xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
