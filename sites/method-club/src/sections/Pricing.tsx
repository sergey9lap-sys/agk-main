"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PAYMENT_LINKS, PRICING, formatPrice } from "@/lib/constants";
import { widont } from "@/lib/typography";
import { motion } from "framer-motion";
import { Check, Gift, Zap } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const monthTop = [
  "Ежемесячные живые онлайн-разборы лидеров рынка с Сашей",
  "Эфир с приглашённым гостем на острые темы",
  "Бонусные прямые эфиры на актуальные темы",
];

const monthLibrary = [
  "Лекция по созданию лид-магнитов",
  "Лекция по входному продукту",
  "Мастер-класс «Продающий мастер-класс»",
  "Экспресс-курс по Методологии",
  "Интенсив «Наставничество и менторинг» (3 урока)",
  "Тренинг «Нейропродажи» (1 урок)",
  "Разборы «Ревизорро»",
];

const yearLeaders = [
  "Михаил Гребенюк",
  "Клуб Первых",
  "Оскар Хартман",
  "Николай Картозия",
  "Сколково",
  "Бизнес-Молодость",
  "Мари Афонина",
  "Татьяна Мужицкая",
  "Силиконовая долина",
  "Хейтерские разборы",
  "Арт Матита",
  "Тони Роббинс",
  "Запуск проекта Метод:клуб",
  "Аяз Шабутдинов",
];

const yearLibrary = [
  "Лекция по созданию лид-магнитов",
  "Лекция по входному продукту",
  "Мастер-класс «Продающий мастер-класс»",
  "Экспресс-курс по Методологии",
  "Разборы «Ревизорро»",
  "Онлайн-воркшоп «Бизнес-разминки»",
  "Интенсив «Наставничество и менторинг» (11 уроков)",
  "Тренинг «Нейропродажи» (3 урока)",
  "Записи выступления лидеров рынка на крупнейшей конференции по методологии Метод:Фест",
];

const yearExtras = [
  "Корпоративная библиотека",
  "5+ лекций для экспертов, управленцев и предпринимателей, кто уже работает или только хочет выйти в рынок B2B",
  "Записи мастер-классов из закрытой библиотеки клуба",
  "Мастер-класс по мастермайндам",
  "Продающие мероприятия",
  "Тренинг «Большая игра»",
  "Интенсив «Собери продукт, который продаёт себя»",
  "Мастер-класс «Теневой маркетинг»",
  "Мастер-класс «Контент-уикенд»",
  "Мастер-класс «Пошаговая структура экспертной консультации»",
  "Золотой билет на мастер-классы и интенсивы 2026**",
  "Личная консультация с методологом команды Саши",
  "Челленджи-прокачка на темы: проявленность, продвижение, партнёрство",
];

function FeatureList({
  items,
  dark,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className={[
            "flex items-start gap-2 text-small leading-[1.45]",
            dark ? "text-black/80" : "text-text-secondary",
          ].join(" ")}
        >
          <Check
            className={[
              "mt-0.5 h-4 w-4 flex-shrink-0",
              dark ? "text-black" : "text-gold-2",
            ].join(" ")}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-bg section-compact">
      <Container>
        <motion.h2
          id="pricing-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Выберите тариф
        </motion.h2>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-2 lg:items-stretch">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="card-dark flex h-full flex-col p-4 sm:p-6 lg:p-8 sm:rounded-[32px]"
          >
            <div className="space-y-6">
              <div className="min-h-[102px] sm:min-h-[126px]">
                <div className="inline-flex rounded-pill border border-transparent bg-transparent px-4 py-1 text-xs font-semibold opacity-0">
                  Лучшее предложение
                </div>
                <div className="mt-3">
                  <p className="text-[18px] font-semibold text-gold-2 sm:text-[20px] md:text-h3">
                    Метод:Клуб
                  </p>
                  <p className="mt-1 text-[24px] font-semibold text-gold-2 sm:text-[30px]">1 месяц</p>
                </div>
              </div>

              <FeatureList items={monthTop} />

              <div>
                <p className="text-small font-medium text-gold-2">
                  Динамическая библиотека:
                </p>
                <div className="mt-3">
                  <FeatureList items={monthLibrary} />
                </div>
              </div>

              <div className="hover-lift-card hover-lift-card--gold rounded-[18px] border border-gold-2/20 bg-gold-1/5 p-3 sm:rounded-[24px] sm:p-4">
                <div className="flex items-center gap-2 text-gold-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-small font-medium">
                    По цене чашки кофе в день
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <p className="text-[22px] text-text-muted line-through sm:text-[28px]">
                {formatPrice(PRICING.month.oldPrice)}
              </p>
              <p className="mt-2 text-[34px] font-bold leading-none text-gold-2 sm:text-[42px]">
                {formatPrice(PRICING.month.price)}
              </p>
              <Button
                variant="primary"
                className="mt-8 w-full"
                onClick={() => window.location.assign(PAYMENT_LINKS.month)}
              >
                Оплатить
              </Button>
            </div>
          </motion.article>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="hover-lift-card hover-lift-card--gold flex h-full flex-col rounded-[24px] border border-gold-1/65 bg-[linear-gradient(180deg,#f3d7a0_0%,#e7be76_45%,#c99647_100%)] p-4 shadow-[0_28px_70px_rgba(211,162,78,0.28)] sm:rounded-[32px] sm:p-6 lg:p-8"
          >
            <div className="space-y-6">
              <div className="min-h-[102px] sm:min-h-[126px]">
                <div className="inline-flex rounded-pill border border-black/10 bg-black/8 px-4 py-1 text-xs font-semibold text-black">
                  Лучшее предложение
                </div>

                <div className="mt-3">
                  <p className="text-[18px] font-semibold text-black sm:text-[20px] md:text-h3">
                    Метод:Клуб
                  </p>
                  <p className="mt-1 text-[24px] font-semibold text-black sm:text-[30px]">1 год***</p>
                </div>
              </div>

              <FeatureList
                items={[
                  "Ежемесячные живые онлайн-разборы с Сашей",
                  "Эфир с приглашённым гостем на острые темы",
                  "Бонусные прямые эфиры на актуальные темы",
                ]}
                dark
              />

              <div className="hover-lift-card hover-lift-card--gold rounded-[18px] border border-black/12 bg-black/8 p-3 sm:rounded-[24px] sm:p-4">
                <p className="text-small font-semibold text-black">
                  Уже в библиотеке:
                </p>
                <div className="mt-3 columns-1 gap-5 sm:columns-2">
                  <ul className="space-y-1.5">
                    {yearLeaders.map((leader) => (
                      <li key={leader} className="break-inside-avoid text-small text-black/78">
                        — {leader}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <p className="text-small font-semibold text-black">
                  Расширенная динамическая библиотека:
                </p>
                <div className="mt-3">
                  <FeatureList items={yearLibrary} dark />
                </div>
              </div>

              <div className="hover-lift-card hover-lift-card--gold rounded-[18px] border border-black/12 bg-black/8 p-3 sm:rounded-[24px] sm:p-4">
                <div className="flex items-center gap-2 text-black">
                  <Gift className="h-4 w-4" />
                  <span className="text-small font-semibold">Бонусы года</span>
                </div>
                <ul className="mt-3 space-y-2 text-small text-black/80">
                  {yearExtras.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <p className="text-[22px] text-black/45 line-through sm:text-[28px]">
                {formatPrice(PRICING.year.oldPrice)}
              </p>
              <p className="mt-2 text-[34px] font-bold leading-none text-black sm:text-[42px]">
                {formatPrice(PRICING.year.price)}
              </p>
              <Button
                variant="secondary"
                className="mt-8 w-full border-black/18 bg-black text-white hover:border-black/30 hover:bg-black/90"
                onClick={() => window.location.assign(PAYMENT_LINKS.year)}
              >
                Оплатить
              </Button>
            </div>
          </motion.article>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="hover-lift-card hover-lift-card--gold mt-6 rounded-[22px] border border-gold-2/35 bg-[linear-gradient(180deg,rgba(214,166,92,0.12),rgba(214,166,92,0.05))] p-4 sm:mt-8 sm:rounded-[30px] sm:p-6 lg:p-7"
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold-2">
                Бесплатный вход
              </p>
              <h3 className="mt-2 text-[21px] font-semibold text-text-primary sm:mt-3 sm:text-[24px] md:text-h3">
                Тестовая неделя
              </h3>
              <p className="card-copy mt-2 max-w-3xl sm:mt-3">
                {widont("Попробуйте клуб бесплатно — 7 дней полного доступа без обязательств. Оцените формат, материалы и сообщество.")}
              </p>
            </div>
            <Button
              variant="primary"
              className="w-full whitespace-nowrap sm:w-auto"
              onClick={() => window.location.assign(PAYMENT_LINKS.testWeek)}
            >
              Попробовать бесплатно
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
