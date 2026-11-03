"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Star, X } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tariffs = [
  {
    number: "1 тариф",
    name: "БАЗОВЫЙ",
    duration: "3 недели",
    format: "Стартовая сборка продукта с поддержкой",
    widgetId: "954167",
    features: [
      "Предобучение перед стартом курса",
      "Уроки в записи в рамках тарифа",
      "3 практические Zoom‑сессии с Александрой",
      "Домашние задания и обратная связь в подгруппах",
      "Декомпозиция образовательного продукта под контролем наставников",
      "Формирование продукта и применение инструментов базовой методологии",
      "Защита проекта на живой сессии с наставниками",
      "Доступ к материалам курса 30 дней",
    ],
    highlighted: false,
  },
  {
    number: "2 тариф",
    name: "ОПТИМАЛЬНЫЙ",
    duration: "5 недель",
    format: "Больше практики и защита проекта",
    widgetId: "954169",
    features: [
      "Всё из базового тарифа",
      "5 практических Zoom‑сессий с Александрой",
      "Индивидуальная и групповая работа с наставниками в подгруппах",
      "Подробный план продукта и фиксация практических заданий",
      "Защита проекта с наставником",
      "Доступ к материалам курса 60 дней",
    ],
    highlighted: false,
  },
  {
    number: "3 тариф",
    name: "МАСТЕР",
    duration: "2 месяца",
    format: "Стратегия линейки и разборы проекта",
    widgetId: "954170",
    features: [
      "Всё из тарифа «Оптимальный»",
      "8 практических Zoom‑сессий с Александрой",
      "Стратегическое построение продуктовой линейки в подгруппах",
      "Разбор продающих элементов внутри образовательного процесса",
      "Библиотека «готовых гипотез» по нишам",
      "Разборы и предзащита проектов с наставниками",
      "Итоговая защита проекта и обратная связь лично от Александры",
      "Бонус: стратегический разбор через год — 30-минутная личная встреча с Александрой о том, где вы сейчас, что построили и куда двигаться дальше",
      "Доступ к материалам курса 90 дней",
    ],
    highlighted: true,
  },
  {
    number: "4 тариф",
    name: "ВИП",
    duration: "3 месяца",
    format: "Персональная стратегия с Александрой",
    widgetId: "1477920",
    features: [
      "Всё из тарифа «Мастер»",
      "9 практических Zoom‑сессий с Александрой",
      "Итоговая защита проекта и обратная связь лично от Александры",
      "Две персональные стратегические сессии с Александрой",
      "Совместная разработка продуктовой линейки, флагмана и стратегии запуска",
      "Личный ВИП-наставник и отдельный приватный чат с Александрой",
      "Возможность подключить команду к программе: 1 + 2 участника по согласованию",
      "Личная рекомендация подрядчиков под задачи запуска",
      "Доступ к материалам курса 120 дней",
    ],
    highlighted: false,
  },
];

const romanSteps = ["I СТУПЕНЬ", "II СТУПЕНЬ", "III СТУПЕНЬ", "IV СТУПЕНЬ"];

const TELEGRAM_MANAGER_URL = "https://agkedu.getcourse.ru/tg_subscribe";

type PricingProps = {
  title?: string;
  showStartDate?: boolean;
};

function renderFeature(feature: string) {
  if (feature.startsWith("Возможность подключить команду")) {
    return (
      <>
        Возможность подключить команду к программе:
        <br />
        1 + 2 участника
        <br />
        по согласованию
      </>
    );
  }

  return feature;
}

export function Pricing({ title = "Тарифы", showStartDate = false }: PricingProps) {
  const [activeWidget, setActiveWidget] = useState<{ id: string; title: string } | null>(null);
  const [widgetHeight, setWidgetHeight] = useState(680);

  const getWidgetUrl = (widgetId: string) => {
    if (typeof window === "undefined") {
      return `https://agkedu.getcourse.ru/pl/lite/widget/widget?id=${widgetId}`;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("id", widgetId);
    params.set("ref", document.referrer);
    params.set("loc", window.location.href);

    return `https://agkedu.getcourse.ru/pl/lite/widget/widget?${params.toString()}`;
  };

  useEffect(() => {
    if (!activeWidget) {
      return;
    }

    setWidgetHeight(680);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://agkedu.getcourse.ru") {
        return;
      }

      const height = Number(event.data?.height);
      if (height > 0) {
        setWidgetHeight(Math.max(height, 680));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [activeWidget]);

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#080808] py-12 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(240,120,48,0.16),transparent_28rem),linear-gradient(180deg,#080808,#151515_54%,#080808)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(90deg,transparent_0_42px,rgba(255,255,255,0.08)_42px_43px,transparent_43px_86px),repeating-linear-gradient(0deg,rgba(240,120,48,0.06)_0_1px,transparent_1px_26px)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-bg/38" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[8%] top-0 hidden h-full w-px bg-bg/10 lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[12%] top-0 hidden h-full w-px bg-bg/10 lg:block" />
      <Container className="relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center lg:mb-10"
        >
          <h2 className="mb-4 font-heading text-3xl font-black uppercase text-text-primary lg:text-4xl">
            {title}
          </h2>
          {showStartDate ? null : null}
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tariffs.map((tariff, index) => (
            <motion.div
              key={tariff.name}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
              className=""
            >
              <div
                className={`relative isolate h-full p-0 ${
                  tariff.highlighted
                    ? "overflow-hidden rounded-[18px] border-2 border-orange-3/82 bg-card-bg text-text-primary shadow-[0_0_34px_rgba(240,120,48,0.30),0_28px_68px_rgba(240,120,48,0.16),inset_0_1px_0_rgba(255,255,255,0.10)]"
                    : "overflow-hidden rounded-[18px] border border-white/44 bg-card-bg text-text-primary shadow-[0_22px_52px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.66)]"
                } before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_18%_12%,rgba(240,120,48,0.12),transparent_28%),linear-gradient(135deg,#1C1C1C,#151515)]`}
              >
                {tariff.highlighted && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[220px] bg-[radial-gradient(circle_at_50%_0%,rgba(240,120,48,0.28),transparent_12rem),linear-gradient(135deg,rgba(240,120,48,0.20),rgba(21,21,21,0.92))]"
                  />
                )}
                {tariff.highlighted && (
                  <div className="absolute right-3 top-3 z-30 flex items-center gap-1.5 rounded-full border border-orange-3/50 bg-orange-1 px-2.5 py-1.5 pl-1.5 text-[10px] font-black uppercase tracking-wide text-[#090909] shadow-button">
                    <span className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#FFFFFF_0%,#FFB060_36%,#F07830_100%)] shadow-[0_0_18px_rgba(240,120,48,0.46)]">
                      <span className="absolute inset-0 rounded-full bg-white/30 blur-[1px]" />
                      <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-card-bg shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                      <Star className="relative h-3 w-3 fill-white text-white drop-shadow-sm" />
                    </span>
                    Рекомендуем
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className={`min-h-[220px] border-b px-4 pb-4 ${tariff.highlighted ? "pt-16" : "pt-6"} ${
                      tariff.highlighted
                        ? "border-orange-1/36 bg-[radial-gradient(circle_at_18%_12%,rgba(240,120,48,0.24),transparent_12rem),linear-gradient(135deg,#1C1C1C,#151515)]"
                        : "border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(240,120,48,0.08))]"
                    }`}
                  >
                    <p
                      className={`mb-3 font-heading text-lg font-black uppercase tracking-wide ${
                        tariff.highlighted ? "text-orange-2" : "text-orange-2"
                      }`}
                    >
                      {romanSteps[index]}
                    </p>
                    <p
                      className={`mb-2 text-xs font-black uppercase tracking-wide ${
                        tariff.highlighted ? "text-orange-3" : "text-orange-1"
                      }`}
                    >
                      {tariff.number}
                    </p>
                    <h3
                      className={`font-heading text-2xl font-black leading-none ${
                        tariff.highlighted ? "text-text-primary" : "text-text-primary"
                      }`}
                    >
                      {tariff.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm font-bold ${
                        tariff.highlighted ? "text-orange-2" : "text-orange-1"
                      }`}
                    >
                      {tariff.duration}
                    </p>
                    <p
                      className={`mt-3 min-h-[40px] text-xs font-semibold leading-snug ${
                        tariff.highlighted ? "text-text-secondary" : "text-text-secondary"
                      }`}
                    >
                      {tariff.format}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col px-4 py-4">
                    <div className="flex-1 space-y-2.5">
                      {tariff.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2.5">
                          <div
                            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border shadow-[0_0_12px_rgba(240, 120, 48, 0.2)] ${
                              tariff.highlighted
                                ? "border-orange-3/60 bg-orange-1"
                                : "border-orange-3/42 bg-orange-1"
                            }`}
                          >
                            <Check
                              className="h-2.5 w-2.5 text-[#090909]"
                            />
                          </div>
                          <span
                            className={`text-xs leading-snug ${
                              tariff.highlighted ? "text-text-secondary" : "text-text-secondary"
                            }`}
                          >
                            {renderFeature(feature)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-5">
                      <Button
                        type="button"
                        variant="primary"
                        className="group w-full rounded-[10px] border border-orange-3/36 px-3 text-sm shadow-[0_12px_26px_rgba(85,11,24,0.16)]"
                        onClick={() =>
                          setActiveWidget({
                            id: tariff.widgetId,
                            title: `Тариф «${tariff.name}»`,
                          })
                        }
                      >
                        Оставить заявку
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mx-auto mt-4 max-w-6xl rounded-[18px] border border-orange-3/34 bg-card-bg/90 p-4 shadow-[0_10px_28px_rgba(0,0,0,0.12)] backdrop-blur-sm"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-lg font-bold text-text-primary">
              Остались вопросы по тарифам или формату обучения?
            </p>
            <a
              href={TELEGRAM_MANAGER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[12px] bg-orange-1 px-6 py-3 text-center text-sm font-semibold uppercase tracking-wide text-[#090909] shadow-[0_14px_32px_rgba(217,106,50,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-2 hover:shadow-[0_18px_42px_rgba(217,106,50,0.34)] md:w-auto"
            >
              Задать вопрос менеджеру
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Container>

      {activeWidget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={activeWidget.title}
          onClick={() => setActiveWidget(null)}
        >
          <div
            className="relative h-[min(760px,92vh)] w-full max-w-[560px] overflow-hidden rounded-2xl bg-card-bg shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-orange-1/20 px-4 py-3">
              <p className="pr-4 text-sm font-bold uppercase tracking-wide text-text-primary">
                {activeWidget.title}
              </p>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setActiveWidget(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-1 text-[#090909] transition-colors hover:bg-orange-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[calc(100%-65px)] overflow-y-auto">
              <iframe
                key={activeWidget.id}
                src={getWidgetUrl(activeWidget.id)}
                title={activeWidget.title}
                className="w-full border-0"
                style={{ height: `${widgetHeight}px` }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
