"use client";

import Image from "next/image";
import { SUPPORT_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const supportLinks = [
  { label: "Телеграм", buttonText: "Написать в Телеграм", hrefEnv: "telegram" },
  {
    label: "Макс",
    buttonText: "Написать в Макс",
    href: SUPPORT_LINKS.max,
  },
  {
    label: "ВКонтакте",
    buttonText: "Написать во ВКонтакте",
    href: SUPPORT_LINKS.vk,
  },
] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContactCTA() {
  const telegramHref = SUPPORT_LINKS.telegram;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-bg section-compact">
      <Container>
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(250px,300px)] lg:gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="panel-dark panel-dark-padded max-w-xl"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold-1/20 sm:mb-6 sm:h-16 sm:w-16">
              <MessageCircle className="h-7 w-7 text-gold-2 sm:h-8 sm:w-8" />
            </div>

            <h2 id="contact-heading" className="section-title--gold uppercase">
              Служба заботы
            </h2>

            <div className="mt-6 grid gap-3 sm:mt-7 sm:max-w-[420px]">
              {supportLinks.map((link) => {
                const href = "hrefEnv" in link ? telegramHref : link.href;

                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      if (href) window.location.assign(href);
                    }}
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-[14px] bg-gradient-to-r from-gold-1 via-gold-2 to-gold-4 px-5 py-3.5 text-center text-sm font-semibold text-black shadow-[0_16px_40px_rgba(240,212,165,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_18px_46px_rgba(240,212,165,0.24)] sm:min-h-[56px] sm:rounded-[16px] sm:px-6 sm:py-4"
                    aria-label={link.label}
                  >
                    {link.buttonText}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="mx-auto w-full max-w-[248px] sm:max-w-[292px]"
          >
            <button
              type="button"
              onClick={() => {
                window.location.assign(SUPPORT_LINKS.telegram);
              }}
              className="group relative block w-full text-left transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="relative aspect-[0.49] overflow-hidden rounded-[34px] border border-gold-2/20 shadow-[0_24px_56px_rgba(0,0,0,0.42)]"
              >
                <Image
                  src="/method-club/optimized/6c7e644627113a.webp"
                  alt="Экран Telegram-бота службы заботы МЕТОД:КЛУБ"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                  priority={false}
                />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
