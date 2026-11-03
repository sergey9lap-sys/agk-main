"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const faqItems: { question: string; answer: ReactNode }[] = [
  {
    question: "Для кого подходит этот курс?",
    answer:
      "Курс подойдёт экспертам, предпринимателям, наставникам и тем, кто создаёт или усиливает образовательные продукты и хочет выстроить понятную, сильную методологию.",
  },
  {
    question: "Нужен ли опыт в методологии?",
    answer:
      "Нет, специальный опыт не обязателен. Мы идём от базы к системе: вы разберётесь в логике методологии и сможете применять её в своём продукте шаг за шагом.",
  },
  {
    question: "Какой формат обучения?",
    answer:
      "Обучение проходит онлайн. Вас ждут видеоуроки, живые встречи с Александрой и домашние задания с обратной связью от наставников Академии.",
  },
  {
    question: "Сколько длится курс?",
    answer:
      "Продолжительность зависит от выбранного тарифа и вашего темпа. Материалы вы проходите в удобном ритме, а практика и сопровождение помогают не просто посмотреть уроки, а внедрить их в работу.",
  },
  {
    question: "Будет ли обратная связь?",
    answer:
      "Да. На курсе предусмотрена обратная связь по домашним заданиям и поддержка от наставников Академии, чтобы вы не оставались один на один с вопросами.",
  },
  {
    question: "Выдаётся ли сертификат?",
    answer:
      "Да. После прохождения курса выдаётся сертификат Академии методологии.",
  },
  {
    question: "У меня нет команды. Я смогу внедрить это один?",
    answer:
      "Да. Методология нужна не только большим школам и командам. Вы сможете собрать сильную основу продукта самостоятельно, а уже потом масштабировать её вместе с командой.",
  },
  {
    question:
      "У меня уже есть курс или, наоборот, ещё нет флагмана. Мне это подходит?",
    answer:
      "Да. Курс подходит и тем, у кого уже есть продукт и его нужно усилить, и тем, кто только собирает флагман. В первом случае вы пересоберёте структуру, путь ученика и логику результата, во втором создадите крепкую основу для продукта с самого начала.",
  },
  {
    question: "Сколько времени нужно на прохождение?",
    answer:
      "Это зависит от тарифа и вашей скорости внедрения. Базовый путь можно пройти быстрее, а старшие тарифы дают больше сопровождения, практики и глубины.",
  },
  {
    question: "Есть ли рассрочка?",
    answer:
      "Да, для тарифов предусмотрены варианты оплаты в рассрочку. Точную схему поможет подобрать служба заботы.",
  },
  {
    question: "Можно ли сделать возврат, если мне не подойдёт?",
    answer:
      <>
        Да, возврат возможен согласно условиям{" "}
        <a
          href="https://agkedu.getcourse.ru/oferta_methodology"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-orange-1 underline underline-offset-4"
        >
          оферты
        </a>
        .
      </>,
  },
];

const romanFaqNumbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

function FAQItem({
  item,
  index,
}: {
  item: (typeof faqItems)[0];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative isolate overflow-hidden rounded-[18px] border border-orange-3/42 bg-card-bg shadow-[0_16px_34px_rgba(58,0,12,0.12),inset_0_1px_0_rgba(255,255,255,0.62)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.44),transparent_30%),radial-gradient(circle_at_86%_84%,rgba(117,22,46,0.07),transparent_28%),repeating-linear-gradient(105deg,rgba(85,11,24,0.022)_0_1px,transparent_1px_10px)] hover:-translate-y-0.5 hover:border-orange-1/42 hover:shadow-[0_20px_42px_rgba(85,11,24,0.16),inset_0_1px_0_rgba(255,255,255,0.68)]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between gap-4 p-4 lg:p-5">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/50 bg-orange-1 font-heading text-sm font-black text-white shadow-[0_10px_20px_rgba(217,106,50,0.20)]">
            {romanFaqNumbers[index]}
          </span>
          <span className="flex-1 pr-2 text-body font-bold text-text-primary lg:text-lg">
            {item.question}
          </span>
          <div
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-orange-3/40 bg-[#151515] text-text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          >
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mx-4 mb-4 border-t border-orange-1/16 px-4 pb-1 pt-4 lg:mx-5 lg:px-5 lg:pt-5">
              <p className="text-body leading-relaxed text-text-secondary">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-bg py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-31-18.jpg"
        variant="light"
        position="object-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(240,120,48,0.16),transparent_24rem),linear-gradient(180deg,rgba(8,8,8,0.88),rgba(14,14,14,0.94))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-24 [background-image:radial-gradient(circle,rgba(240, 120, 48, 0.34)_0_1px,transparent_1.6px),radial-gradient(circle,rgba(117,22,46,0.12)_0_1px,transparent_1.7px)] [background-position:12%_18%,72%_30%] [background-size:190px_170px,270px_240px]"
      />
      <Container className="relative z-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center font-heading text-3xl font-black uppercase text-text-primary lg:mb-10 lg:text-4xl"
        >
          Ответы на вопросы, которые вы нам точно зададите
        </motion.h2>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem key={item.question} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex justify-center"
        >
          <a
            href="#pricing"
            className="inline-flex min-h-[60px] w-full max-w-[380px] items-center justify-center gap-3 rounded-[12px] bg-orange-1 px-9 py-[18px] text-center text-lg font-semibold uppercase tracking-wide text-[#090909] shadow-[0_14px_32px_rgba(217,106,50,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-2 hover:shadow-[0_18px_42px_rgba(217,106,50,0.34)] sm:w-auto"
          >
            Присоединиться к обучению
            <ArrowRight className="h-5 w-5 flex-shrink-0" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
