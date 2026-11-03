"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SUPPORT_LINKS } from "@/lib/constants";
import { getTelegramHref } from "@/lib/navigation";
import { ReactNode } from "react";
import { widont } from "@/lib/typography";
import { FAQ_ITEMS } from "@/lib/faq";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const telegramHref = getTelegramHref(
  process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT || SUPPORT_LINKS.telegramHandle
);
const maxHref =
  SUPPORT_LINKS.max;

const faqItems: { question: string; answer: ReactNode }[] = FAQ_ITEMS.map((item) => {
  if (item.question === "Можно ли вернуть деньги?") {
    return {
      question: item.question,
      answer: (
        <>
          Возврат осуществляется в соответствии с договором-офертой. Подробности
          можно уточнить в службе заботы в{" "}
          <a
            href={telegramHref || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-2 underline underline-offset-4"
          >
            Telegram
          </a>{" "}
          или{" "}
          <a
            href={maxHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-2 underline underline-offset-4"
          >
            Max
          </a>
        </>
      ),
    };
  }

  if (item.question === "Как я получу доступ после оплаты?") {
    return {
      question: item.question,
      answer: (
        <>
          После оплаты вам откроется доступ в закрытый Telegram-канал клуба в
          течение 24 часов. Если доступ не пришёл — напишите в службу заботы в{" "}
          <a
            href={telegramHref || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-2 underline underline-offset-4"
          >
            Telegram
          </a>{" "}
          или{" "}
          <a
            href={maxHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-2 underline underline-offset-4"
          >
            Max
          </a>
          , и мы оперативно решим вопрос.
        </>
      ),
    };
  }

  return item;
});

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <Card className="overflow-hidden">
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onClick}
        className="flex w-full items-center justify-between gap-3 text-left focus-ring rounded-card"
      >
        <h3 className="font-heading text-[17px] text-text-primary sm:text-[20px] md:text-h3">{widont(question)}</h3>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-5 w-5 flex-shrink-0 text-gold-2 motion-safe:transition-transform motion-safe:duration-300 sm:h-6 sm:w-6",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 border-t border-card-border pt-3 text-[15px] leading-[1.55] text-text-secondary sm:mt-4 sm:pt-4 sm:text-body">
              {typeof answer === "string" ? widont(answer) : answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-bg section-compact">
      <Container>
        <motion.h2
          id="faq-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="section-title--gold mb-8 text-center uppercase sm:mb-10 lg:mb-12"
        >
          Частые вопросы
        </motion.h2>

        <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
