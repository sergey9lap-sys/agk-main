"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionBackground } from "@/components/SectionBackground";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const testimonials = [
  {
    name: "Константин Воробьев",
    role: "тренер по плаванию, основатель сети клубов по обучению взрослых плаванию",
    image: "/metodologiya/images/konstantin-vorobev.jpg",
    result:
      "Создал онлайн‑курс по обучению взрослых плаванию и запустил тестовую фокус‑группу. Масштабировал свою авторскую методику «Путь Пловца» в онлайн‑формат и вышел на новый уровень развития проекта.",
    financialAmount: "1 990 000 ₽",
  },
  {
    name: "Диана Семенычева",
    role: "лингвокоуч, AI‑архитектор обучения",
    image: "/metodologiya/images/diana-semenecheva.jpg",
    result:
      "Создала две новые продуктовые линейки, запустила продажи интенсивной программы, получила запросы на премиальную личную работу.",
    financialAmount: "550 000 ₽",
  },
  {
    name: "Максим Шаргородский",
    role: "эксперт по построению отделов продаж и увеличению прибыли",
    image: "/metodologiya/images/maksim-shargorodskiy.jpg",
    result:
      "Запустил мастер‑группу по увеличению прибыли, усилил вовлечённость аудитории и выстроил более сильную продуктовую систему внутри проекта.",
    financialLabel: "Финансовый результат запуска",
    financialAmount: "1 990 000 ₽",
  },
  {
    name: "Алиса Задорожная",
    role: "фасилитатор, экс‑маркетинг директор Яндекс Дзена",
    image: "/metodologiya/images/alisa-zadorozhnaya.jpg",
    result:
      "Методологически проработала курс «Навыкология», улучшила лекции, домашние задания, геймификацию и запустила второй поток.",
    financialPrefix: "45 человек на сумму",
    financialAmount: "1 500 000 ₽",
  },
  {
    name: "Вадим Алиев",
    role: "методолог, руководитель методического агентства «КурсМастер»",
    image: "/metodologiya/images/vadim-aliev.jpg",
    result:
      "Разработал новую продуктовую систему и курс‑наставничество для подготовки методологов с нуля. Внедрил автоматизацию процессов и усилил методическую команду новыми решениями.",
  },
  {
    name: "Дарья Кривоженко",
    role: "директор по продуктам, методолог",
    image: "/metodologiya/images/darya-krivozhenko.jpg",
    result:
      "Выстроила продуктовую линейку, усилила курс Нейросети 2.0, запустила марафон, упаковала мастер‑класс, прогрев и допродажи.",
    financialAmount: "2 765 348 ₽",
  },
  {
    name: "Екатерина Заушицына",
    role: "методолог, кандидат тех. наук",
    image: "/metodologiya/images/ekaterina-zaushitsyna.jpg",
    result:
      "Разобралась в форматах продуктов и выстроила продуктовую воронку. Собрала собственный продукт, к которому не могла приступить 3 года.",
    financialAmount: "451 000 ₽",
  },
  {
    name: "Надежда Логинова",
    role: "автор программы «Геном успеха», наставник",
    image: "/metodologiya/images/nadezhda-loginova.jpg",
    result:
      "Пришла с запросом доработать программу и выйти в масштаб. После курса — 100% учеников дошли до конца, все вышли с результатами и оставили отзывы.",
    financialAmount: "205 000 ₽",
  },
];

function keepShortWords(text: string) {
  const shortWords =
    "а|в|во|и|или|к|ко|с|со|у|о|об|обо|по|на|за|из|от|до|для|над|под|при|про|без|не|но|что|как";

  return text.replace(
    new RegExp(`(^|[\\s\\u00A0])(${shortWords})([\\s\\u00A0]+)`, "gi"),
    (_match, prefix: string, word: string) => `${prefix}${word}\u00A0`
  );
}

function getAmountValue(amount?: string) {
  if (!amount) return null;

  const value = Number(amount.replace(/[^\d]/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

function AchievementPlate({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof testimonials)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const financialAmount =
    "financialAmount" in item && item.financialAmount ? item.financialAmount : null;
  const amountValue = getAmountValue(financialAmount ?? undefined);
  const resultLead = keepShortWords(item.result.split(".")[0] || item.result);
  const fullFinancialText =
    financialAmount
      ? `${"financialLabel" in item && item.financialLabel ? item.financialLabel : "Финансовый результат"} — ${
          "financialPrefix" in item && item.financialPrefix ? `${item.financialPrefix} ` : ""
        }${financialAmount}`
      : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.5, delay: index * 0.06 },
        y: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
      }}
      className="relative isolate flex min-h-[260px] flex-col overflow-hidden rounded-[18px] border border-orange-1/58 bg-card-bg text-text-primary shadow-[0_18px_38px_rgba(58,0,12,0.16),0_0_0_1px_rgba(255,176,96,0.10),inset_0_1px_0_rgba(255,255,255,0.10)] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_18%_12%,rgba(240,120,48,0.10),transparent_28%),linear-gradient(135deg,#151515,#080808)]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full flex-1 cursor-pointer flex-col px-4 pb-4 pt-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-orange-1 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <div className="grid grid-cols-[74px_minmax(0,1fr)] gap-3">
          <div className="relative h-[74px] w-[74px] overflow-hidden rounded-[14px] border border-orange-1/22 bg-card-bg shadow-[0_10px_20px_rgba(58,0,12,0.16)]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="74px"
              className="object-cover grayscale-[18%] contrast-[1.04] saturate-[0.92]"
            />
          </div>

          <div className="min-w-0">
            <p className="font-heading text-xl font-black leading-tight text-text-primary">
              {keepShortWords(item.name)}
            </p>
            <p className="mt-1 line-clamp-3 text-sm font-semibold leading-snug text-text-primary/78">
              {resultLead}
            </p>
          </div>
        </div>

        <div className="mt-auto border-y border-white/16 py-3">
          {amountValue ? (
            <p className="whitespace-nowrap font-heading text-[28px] font-black leading-none text-text-primary">
              <AnimatedCounter end={amountValue} duration={1500} suffix=" ₽" />
            </p>
          ) : (
            <p className="font-heading text-[26px] font-black leading-none text-text-primary">
              Новая система
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm font-black uppercase tracking-[0.03em] text-text-primary">
            {isOpen ? "Свернуть ↑" : "Читать кейс ↓"}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ y: isOpen ? 0 : [0, 3, 0], rotate: isOpen ? 180 : 0 }}
            transition={{
              y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 0.25 },
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/22 bg-card-bg/12 text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mx-4 mb-4 border-t border-white/18 pt-4">
              <p className="text-sm font-bold leading-relaxed text-text-primary">
                {keepShortWords(item.result)}
              </p>
              {fullFinancialText && (
                <p className="mt-3 text-sm font-black leading-relaxed text-text-primary">
                  {keepShortWords(fullFinancialText).replace(financialAmount ?? "", "")}
                  <span className="whitespace-nowrap">{financialAmount}</span>
                </p>
              )}
              <p className="mt-3 text-sm font-semibold leading-relaxed text-text-primary/78">
                {keepShortWords(item.role)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function Testimonials() {
  const [openCase, setOpenCase] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-bg py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-47.jpg"
        variant="light"
        position="object-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_22%,rgba(240,120,48,0.16),transparent_24rem),linear-gradient(180deg,rgba(8,8,8,0.88),rgba(14,14,14,0.94))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[58%] opacity-25 [background-image:linear-gradient(90deg,rgba(85,11,24,0.18)_0_1px,transparent_1px_9.09%),linear-gradient(0deg,rgba(85,11,24,0.12)_0_1px,transparent_1px_18.18%)] [background-size:11%_100%,100%_72px]"
      />
      <Container className="relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 max-w-4xl text-center lg:mb-10"
        >
          <h2 className="mb-4 font-heading text-3xl font-black uppercase text-text-primary lg:text-4xl">
            Выпускники выходят не&nbsp;с&nbsp;теорией, а&nbsp;с&nbsp;результатом
          </h2>
          <p className="text-body text-text-secondary">
            На&nbsp;курсе рождаются не&nbsp;абстрактные знания, а&nbsp;реальные продукты,
            решения, новые запуски и&nbsp;сильные кейсы.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {testimonials.map((item, index) => (
            <AchievementPlate
              key={item.name}
              item={item}
              index={index}
              isOpen={openCase === item.name}
              onToggle={() => setOpenCase(openCase === item.name ? null : item.name)}
            />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center lg:mt-10"
        >
          <a href="#pricing">
            <Button variant="primary" size="lg">
              Смотреть тарифы
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
