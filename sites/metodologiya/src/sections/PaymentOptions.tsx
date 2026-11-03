"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { motion } from "framer-motion";
import { ArrowRight, CreditCard, Landmark, ShieldCheck, WalletCards } from "lucide-react";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const instantPayments = [
  {
    name: "Банковская карта",
    label: "Visa / Mastercard / Мир",
    logo: "https://agkedu.getcourse.ru/saas/images/gcpay-ru.png",
  },
  {
    name: "Yandex Pay",
    label: "картой любого банка",
    logo: "https://agkedu.getcourse.ru/img/payments/ya_pay_2026.png",
  },
  {
    name: "SberPay",
    label: "быстрая оплата",
    logo: "https://agkedu.getcourse.ru/img/payments/new_sber_logo.png?v=1",
  },
  {
    name: "AlphaPay",
    label: "оплата через Альфа-Банк",
    logo: "https://agkedu.getcourse.ru/img/payments/new_alpha_logo.png?v=1",
  },
];

const installmentOptions = [
  {
    name: "Яндекс Сплит",
    logo: "https://agkedu.getcourse.ru/img/payments/yandex_split_improved_old_2.png?v=1",
    text: "Оплата частями без переплат.",
  },
  {
    name: "Всегда.Да",
    logo: "https://agkedu.getcourse.ru/saas/images/vsegdada.png?v=1",
    text: "Рассрочка на 6, 10, 12, 18 или 24 месяца.",
  },
  {
    name: "Т-Банк",
    logo: "https://logo-teka.com/wp-content/uploads/2025/06/t-bank-logo-en.png",
    text: "Рассрочка на 3, 4, 6, 10 или 12 месяцев.",
  },
  {
    name: "POSCREDIT",
    logo: "https://agkedu.getcourse.ru/img/payments/poscredit_payform.png",
    logoClassName: "brightness-0 invert",
    text: "Беспроцентная рассрочка на 6, 10 или 12 месяцев.",
  },
  {
    name: "Сбер Банк",
    logo: "https://agkedu.getcourse.ru/img/payments/sber_pokupay.png",
    text: "Для клиентов банка: варианты до 24 месяцев.",
  },
  {
    name: "Внутренняя рассрочка",
    logo: "",
    text: "Индивидуальный график через службу заботы Академии.",
  },
];

const paymentFeatures = [
  {
    icon: CreditCard,
    title: "Оплата картой",
    text: "Можно оплатить обучение банковской картой онлайн через защищенную платежную страницу.",
  },
  {
    icon: WalletCards,
    title: "Платежные сервисы",
    text: "Доступны Яндекс Сплит, Всегда.Да, Т-Банк, POSCREDIT и Сбер Банк.",
  },
  {
    icon: Landmark,
    title: "Рассрочка до 24 месяцев",
    text: "Можно подобрать комфортный ежемесячный платеж: обычно доступны сроки до 12 или до 24 месяцев.",
  },
  {
    icon: ShieldCheck,
    title: "Внутренняя рассрочка",
    text: "Если нужен индивидуальный график, служба заботы поможет подобрать подходящий вариант.",
  },
];

export function PaymentOptions() {
  return (
    <section className="relative overflow-hidden bg-bg py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-31-10.jpg"
        variant="light"
        position="object-center"
        className="opacity-18 saturate-[0.65]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(240,120,48,0.14),transparent_25rem),linear-gradient(180deg,rgba(8,8,8,0.86),rgba(14,14,14,0.92))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-22 [background-image:repeating-linear-gradient(90deg,transparent_0_42px,rgba(255,255,255,0.08)_42px_43px,transparent_43px_86px),repeating-linear-gradient(0deg,rgba(240,120,48,0.05)_0_1px,transparent_1px_26px)]"
      />
      <Container className="relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl rounded-[28px] border border-white/14 bg-card-bg/82 p-5 shadow-[0_24px_70px_rgba(85,11,24,0.12)] backdrop-blur-sm lg:p-8"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-3xl font-black uppercase leading-tight text-text-primary lg:text-4xl">
              Доступны разные способы оплаты
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-relaxed text-text-secondary lg:text-lg">
              Вы можете оплатить обучение сразу или выбрать рассрочку. Доступны
              банковские карты, быстрые платежи, платежные сервисы и внутренняя
              рассрочка Академии.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
            {instantPayments.map((payment, index) => (
              <motion.div
                key={payment.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: 0.14 + index * 0.06 }}
                className="flex min-h-[112px] flex-col items-center justify-center rounded-[18px] border border-orange-3/38 bg-card-bg px-3 py-4 text-center shadow-[0_14px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.62)]"
              >
                <div className="mb-3 flex h-12 items-center justify-center">
                  <Image
                    src={payment.logo}
                    alt={payment.name}
                    width={176}
                    height={54}
                    className="max-h-12 w-auto rounded-xl object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-bold leading-tight text-text-primary">
                  {payment.name}
                </p>
                <p className="mt-1 text-xs font-semibold leading-tight text-text-muted">
                  {payment.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {installmentOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: 0.18 + index * 0.06 }}
                className="flex min-h-[132px] flex-col justify-between rounded-[18px] border border-orange-3/38 bg-[linear-gradient(145deg,#1C1C1C,#151515)] px-4 py-4 shadow-[0_14px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.10)]"
              >
                <div className="flex min-h-[42px] items-center">
                  {option.name === "Яндекс Сплит" ? (
                    <div className="flex flex-wrap items-center gap-2 text-[22px] font-black leading-none">
                      <span className="text-white">Я</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#8FD92F,#23B26D)] text-base text-white">
                        ◔
                      </span>
                      <span className="text-white">Сплит</span>
                      <span className="rounded-[5px] bg-[#E9002D] px-1.5 py-1 text-[11px] font-black text-white">
                        004
                      </span>
                      <span className="rounded-[5px] bg-[#E9002D] px-1.5 py-1 text-[11px] font-black text-white">
                        006
                      </span>
                      <span className="rounded-[5px] bg-[#E9002D] px-1.5 py-1 text-[11px] font-black text-white">
                        0012
                      </span>
                    </div>
                  ) : option.logo ? (
                    <Image
                      src={option.logo}
                      alt={option.name}
                      width={180}
                      height={54}
                      className={`max-h-11 w-auto object-contain ${option.logoClassName ?? ""}`}
                      loading="lazy"
                    />
                  ) : (
                    <span className="rounded-xl border border-orange-3/42 bg-card-bg px-3 py-2 text-sm font-black text-text-primary">
                      {option.name}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-text-secondary">
                  {option.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {paymentFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.24 + index * 0.07 }}
                  className="rounded-[18px] border border-orange-3/34 bg-card-bg/96 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.58)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-orange-3/46 bg-card-bg text-text-primary shadow-[0_8px_18px_rgba(85,11,24,0.24)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-black leading-tight text-text-primary">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm font-semibold leading-relaxed text-text-secondary">
            Точные условия зависят от выбранного тарифа и платежного партнера.
            Служба заботы подскажет доступные варианты перед оформлением.
          </p>

          <div className="mt-7 flex justify-center">
            <a
              href="#pricing"
              className="inline-flex min-h-[60px] w-full max-w-[380px] items-center justify-center gap-3 rounded-[12px] bg-orange-1 px-9 py-[18px] text-center text-lg font-semibold uppercase tracking-wide text-[#090909] shadow-[0_14px_32px_rgba(217,106,50,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-2 hover:shadow-[0_18px_42px_rgba(217,106,50,0.34)] sm:w-auto"
            >
              Присоединиться к обучению
              <ArrowRight className="h-5 w-5 flex-shrink-0" />
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
