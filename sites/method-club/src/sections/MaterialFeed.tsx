"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const leftItems = [
  { title: "Сообщество клуба. 7 точек касания с клиентом" },
  { title: "Выступление на конференции «Узкие места экспертного бизнеса»", meta: "1 урок." },
  { title: "Лекция «Продуктовые расстановки»", meta: "1 урок." },
  { title: "Большие разборы Тони Роббинса", meta: "1 урок." },
  { title: "Топ ошибок в работе отдела продаж" },
  { title: "Большие разборы месяца с сильными кейсами запусков и продюсирования" },
];

const rightItems = [
  { title: "Бренд как источник роста бизнеса", meta: "1 урок." },
  { title: "Разборы участников клуба", meta: "1 урок." },
  { title: "Инсайты из сильных продуктовых прогревов и воронок", meta: "1 урок." },
  { title: "Большие разборы методических ошибок в громких запусках", meta: "1 урок." },
  { title: "Конференции и выступления рынка", meta: "1 урок." },
  { title: "Цикл Колба" },
];

function FeedColumn({ items }: { items: { title: string; meta?: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={`${item.title}-${index}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.38, delay: index * 0.04 }}
          className="hover-lift-card flex items-center gap-5 rounded-[18px] border border-gold-2/35 bg-[linear-gradient(90deg,rgba(20,20,20,0.96),rgba(30,30,30,0.86))] px-4 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
        >
          <div className="h-20 w-[7px] flex-shrink-0 rounded-full bg-[linear-gradient(180deg,#d6a65c_0%,#f0d4a5_100%)]" />
          <div className="min-w-0 flex-1">
            <p className="text-[18px] font-semibold leading-[1.24] text-gold-2 md:text-[20px]">
              {widont(item.title)}
            </p>
            {item.meta ? (
              <p className="mt-2 text-sm text-gold-2/75">{widont(item.meta)}</p>
            ) : null}
          </div>
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#d6a65c_0%,#f0d4a5_100%)] text-black shadow-[0_8px_20px_rgba(214,166,92,0.24)]">
            <ArrowRight className="h-5 w-5" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function MaterialFeed() {
  return (
    <section className="bg-bg section-compact">
      <Container>
        <div className="panel-dark panel-dark-padded relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute bottom-[-130px] left-[-30px] h-[240px] w-[680px] rounded-full border-t border-gold-2/12 opacity-60" />
          <div className="pointer-events-none absolute bottom-[-112px] left-[25px] h-[220px] w-[620px] rounded-full border-t border-gold-2/8 opacity-40" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.45 }}
            className="mb-7 max-w-3xl"
          >
            <h2 className="section-title text-left">
              {widont("Что уже внутри динамической библиотеки клуба")}
            </h2>
          </motion.div>
          <div className="grid gap-5 xl:grid-cols-2">
            <FeedColumn items={leftItems} />
            <FeedColumn items={rightItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
