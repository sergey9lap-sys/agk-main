"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { ExternalLink, FileText, MessageCircle, Send, MessagesSquare } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const supportLinks = {
  max: "https://agkedu.getcourse.ru/max_subscribe",
  telegram: "https://agkedu.getcourse.ru/tg_subscribe",
  vk: "https://agkedu.getcourse.ru/vk_subscribe",
};

const receptionMessages = [
  "Какой тариф мне подойдёт?",
  "Можно ли внедрять без команды?",
  "Поможете выбрать формат?",
  "Есть ли рассрочка?",
];

const contactTabletClassName =
  "group inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-[14px] border border-white/46 bg-orange-1 px-4 py-3 text-sm font-black uppercase text-[#090909] shadow-[0_16px_30px_rgba(217,106,50,0.24),inset_0_1px_0_rgba(255,255,255,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/80 hover:bg-orange-2 hover:shadow-[0_20px_40px_rgba(217,106,50,0.30)]";

export function ContactCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#080808] py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-42.jpg"
        variant="orange"
        position="object-bottom"
        className="opacity-22 saturate-[0.70]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(240, 120, 48, 0.10),transparent_24rem),linear-gradient(180deg,rgba(33,0,7,0.86),rgba(85,11,24,0.76))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-25 [background-image:radial-gradient(circle,rgba(240, 120, 48, 0.34)_0_1px,transparent_1.6px),radial-gradient(circle,rgba(255, 176, 96, 0.58)_0_1px,transparent_1.7px)] [background-position:12%_18%,72%_30%] [background-size:190px_170px,270px_240px]"
      />
      <Container className="relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >
          <div className="relative isolate overflow-hidden rounded-[22px] border border-white/18 bg-bg/8 p-5 shadow-[0_26px_70px_rgba(0,0,0,0.20),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-[2px] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.08),transparent_28%)] lg:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-6 right-6 top-5 h-px bg-[linear-gradient(90deg,transparent,rgba(240, 120, 48, 0.56),transparent)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-5 left-6 right-6 h-px bg-[linear-gradient(90deg,transparent,rgba(117,22,46,0.28),transparent)]"
            />
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[420px_1fr] lg:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                className="relative mx-auto min-h-[440px] w-full max-w-[390px] overflow-visible lg:min-h-[560px]"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-[18%] h-[58%] w-[58%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(240, 120, 48, 0.34),transparent_68%)] blur-xl"
                />
                <Image
                  src="/metodologiya/optimized/6c7e644627113a.webp"
                  alt="Служба заботы Академии"
                  fill
                  className="relative z-10 object-contain drop-shadow-[0_22px_34px_rgba(58,0,12,0.22)]"
                  sizes="(max-width: 1024px) 390px, 420px"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
                  {receptionMessages.map((message, index) => (
                    <motion.div
                      key={message}
                      className={`absolute max-w-[210px] rounded-[16px] border border-orange-3/48 bg-card-bg/92 px-3 py-2 text-xs font-bold leading-snug text-text-primary shadow-[0_12px_28px_rgba(58,0,12,0.14)] backdrop-blur-sm ${
                        index % 2 === 0 ? "left-0" : "right-0"
                      }`}
                      style={{ top: `${18 + index * 15}%` }}
                      initial={{ opacity: 0, y: 18, scale: 0.94 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        y: [18, 0, -4, 24],
                        x: index % 2 === 0 ? [0, 0, 8, 84] : [0, 0, -8, -84],
                        scale: [0.94, 1, 1, 0.86],
                      }}
                      transition={{
                        duration: 6.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1.2,
                        delay: index * 1.05,
                      }}
                    >
                      {message}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            <div className="space-y-5 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
                className="inline-flex items-center gap-3 rounded-[12px] border border-white/18 bg-bg/10 px-4 py-2 font-semibold text-text-primary shadow-[0_10px_22px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.10)]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Служба заботы</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
                className="font-heading text-3xl font-black uppercase text-text-primary lg:text-4xl"
              >
                Приёмная Академии
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
                className="mx-auto max-w-2xl text-lg text-text-primary/86 lg:mx-0 lg:text-xl"
              >
                Поможем выбрать тариф, ответим на вопросы по обучению и подскажем,
                какой формат подойдёт именно вам.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
                className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3"
              >
                <a
                  href={supportLinks.max}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactTabletClassName}
                >
                  <MessagesSquare className="h-5 w-5" />
                  Макс
                </a>

                <a
                  href={supportLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactTabletClassName}
                >
                  <Send className="h-5 w-5" />
                  Телеграм
                </a>

                <a
                  href={supportLinks.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactTabletClassName}
                >
                  <MessageCircle className="h-5 w-5" />
                  ВКонтакте
                </a>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1], delay: 0.58 }}
                href="https://islod.obrnadzor.gov.ru/rlic/details/6009a6d6-0d6f-7d9f-197f-9f9286292347/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[16px] border border-white/14 bg-bg/10 p-4 text-left shadow-[0_14px_28px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.10)] transition-all hover:-translate-y-0.5 hover:border-white/32 hover:shadow-[0_18px_36px_rgba(0,0,0,0.18)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-1" />
                  <p className="font-bold text-text-primary">Лицензия и документы</p>
                </div>
                <p className="text-sm text-text-primary/76">
                  Внизу страницы доступны оферта, политика конфиденциальности и
                  основные данные Академии.
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-text-primary transition-colors">
                  Проверить лицензию в реестре
                  <ExternalLink className="h-4 w-4" />
                </span>
              </motion.a>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.66 }}
                className="text-sm text-text-primary/78 lg:text-base"
              >
                Обычно отвечаем быстро в рабочее время и помогаем довести вопрос до результата.
              </motion.p>
            </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
