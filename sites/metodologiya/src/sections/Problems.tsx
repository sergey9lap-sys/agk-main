"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const problemGroups = [
  {
    title: "Эксперты",
    items: [
      "Не понимают, как упаковать большой опыт в простую и понятную систему.",
      "Перегружают курс и теряют фокус на результате ученика.",
      "Говорят сложным языком, из-за чего знания не превращаются в действие.",
      "Не могут объяснить, в чём уникальность своего продукта.",
    ],
  },
  {
    title: "Методологи",
    items: [
      "Работают без ясных границ роли и часто застревают в операционке.",
      "Решают задачи “по наитию”, а не через систему проектирования продукта.",
      "Не растут в цене, потому что не умеют показывать ценность своей работы.",
      "Слабо влияют на продуктовую стратегию и путь ученика.",
    ],
  },
  {
    title: "Предприниматели",
    items: [
      "Продают продукт, который не доводит учеников до результата.",
      "Создают линейку наугад и зависят от одного продукта.",
      "Не могут выстроить команду вокруг понятной образовательной системы.",
      "Тратят слишком много времени и ресурсов на хаос вместо роста.",
    ],
  },
];

const problemNumerals = ["I", "II", "III"];

function renderProblemItem(item: string) {
  if (item === "Говорят сложным языком, из-за чего знания не превращаются в действие.") {
    return (
      <>
        Говорят сложным языком,
        <br />
        из-за чего знания
        <br />
        не превращаются в действие.
      </>
    );
  }

  if (item === "Решают задачи “по наитию”, а не через систему проектирования продукта.") {
    return (
      <>
        Решают задачи “по&nbsp;наитию”,
        <br />
        а&nbsp;не через систему проектирования продукта.
      </>
    );
  }

  if (item === "Не растут в цене, потому что не умеют показывать ценность своей работы.") {
    return (
      <>
        Не растут в&nbsp;цене,
        <br />
        потому что не&nbsp;умеют показывать ценность своей работы.
      </>
    );
  }

  if (item === "Продают продукт, который не доводит учеников до результата.") {
    return (
      <>
        Продают продукт, который не&nbsp;доводит
        <br />
        учеников до&nbsp;результата.
      </>
    );
  }

  return item;
}

export function Problems() {
  return (
    <section className="relative overflow-hidden bg-[#2B1207] py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-22.jpg"
        variant="orange"
        position="object-bottom"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_16%,rgba(255, 255, 255, 0.24),transparent_24rem),linear-gradient(180deg,rgba(43,18,7,0.18),rgba(43,18,7,0.58))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.18] [background-image:linear-gradient(rgba(255, 255, 255, 0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255, 255, 255, 0.10)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <Container className="relative z-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center font-heading text-3xl font-black uppercase text-text-primary lg:mb-6 lg:text-4xl"
        >
          Распространённые ошибки
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-8 max-w-2xl text-center text-lg font-medium text-text-primary/90 lg:mb-10 lg:text-xl"
        >
          тех, кто пока не выстроил методологию продукта и обучения
        </motion.p>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {problemGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.48,
                ease: [0.22, 1, 0.36, 1],
                delay: groupIndex * 0.08,
              }}
              className="relative flex min-h-[430px] flex-col rounded-[20px] border border-orange-1/62 bg-card-bg p-6 text-text-primary shadow-[0_20px_54px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,176,96,0.12),inset_0_1px_0_rgba(255,255,255,0.10)]"
            >
              <div className="relative mb-6 min-h-12">
                <h3 className="min-w-0 pr-24 font-heading text-[23px] font-black uppercase leading-tight text-text-primary xl:text-[24px]">
                  {group.title}
                </h3>
                <span className="absolute right-0 top-0 flex h-11 min-w-11 items-center justify-center rounded-[14px] border border-orange-2/70 bg-card-bg px-3 font-heading text-base font-black uppercase tracking-wide text-orange-3 shadow-[0_10px_20px_rgba(240,120,48,0.18)]">
                  {problemNumerals[groupIndex]}
                </span>
              </div>

              <ul className="mt-auto space-y-3 text-left">
                {group.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{
                      duration: 0.44,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.2 + groupIndex * 0.08 + itemIndex * 0.045,
                    }}
                    className="flex items-start gap-3 rounded-[14px] border border-white/10 bg-bg p-3 text-base font-semibold leading-snug text-text-primary"
                  >
                    <span className="mt-[0.45rem] h-2 w-2 flex-shrink-0 rotate-45 bg-orange-1 shadow-[0_0_12px_rgba(217,106,50,0.38)]" />
                    <span>{renderProblemItem(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
