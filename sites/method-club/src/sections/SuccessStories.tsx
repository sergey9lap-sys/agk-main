"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stories = [
  {
    name: "Юлия Третьякова",
    role: "Финансовый и налоговый консультант для бизнеса",
    result: "За 4 недели окупила участие в сообществе на VIP-тарифе",
    imagePath: encodeURI("/method-club/images/Юлия Третьякова 13-14 блок.png"),
  },
  {
    name: "Лилия Демченко",
    role: "Практикующий психолог с 5-летним опытом, владелица бизнеса, автор и ведущая ретритов",
    result: "Рост дохода на 150 000 рублей в основном бизнесе за первый месяц",
    imagePath: encodeURI("/method-club/images/Лилия Демченко 13-14 блок.png"),
  },
  {
    name: "Фарход Камилов",
    role: "Консультант ЕБРР Узбекистан по маркетингу, CEO Atom Consulting & Futurum Academy",
    result: "Рост продаж x2,7, фаундер ИИ-стартапа, спикер международных форумов. Возглавил филиал Ассоциации спикеров СНГ в Узбекистане",
    imagePath: encodeURI("/method-club/images/Фарход Камилов 13-14 блок.png"),
  },
  {
    name: "Светлана Беланова",
    role: "Бизнес-тренер, методолог образовательных проектов",
    result: "Ведущий методолог Сбер акселератора и спикер международных конференций",
    imagePath: encodeURI("/method-club/images/Светлана Беланова 13-14 блок.png"),
  },
  {
    name: "Максим Филиппов",
    role: "Управляющий образовательными процессами, сертифицированный методолог, бизнес-тренер, спикер",
    result: "Ведущий методолог корпоративных программ, вышел на международный рынок",
    imagePath: encodeURI("/method-club/images/Максим Филиппов 13-14 блок.png"),
  },
  {
    name: "Даниил Осипов",
    role: "Основатель тренинговой компании Osipov Group, тренер TEDx и преподаватель MBA в международной бизнес-школе Emas",
    result: "Вышел в B2C сегмент. Собрал 15 экспертов и заработал 1 170 000 рублей с нуля за 2 месяца",
    imagePath: encodeURI("/method-club/images/Даниил Осипов 13-14 блок.png"),
  },
];

export function SuccessStories() {
  return (
    <section aria-labelledby="success-stories-heading" className="bg-bg section-compact">
      <Container>
        <div className="panel-dark panel-dark-padded relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute bottom-[-100px] left-[-10px] h-[220px] w-[560px] rounded-full border-t border-gold-2/12 opacity-55" />
          <div className="pointer-events-none absolute right-[90px] top-[90px] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(214,166,92,0.3),transparent_64%)] blur-xl" />

          <h2
            id="success-stories-heading"
            className="mx-auto mb-6 w-full max-w-4xl rounded-[20px] border border-gold-2/35 bg-[linear-gradient(180deg,#f3d7a0_0%,#e7be76_55%,#d1a359_100%)] px-4 py-3 text-center font-heading text-[24px] leading-[1.06] text-black shadow-[0_16px_30px_rgba(0,0,0,0.2)] sm:mb-7 sm:rounded-[22px] sm:px-6 sm:text-[28px] md:text-[32px]"
          >
            {widont("Результаты участников Экосистемы")}
          </h2>

          <div className="grid gap-4 lg:grid-cols-3">
            {stories.map((story, index) => (
              <motion.article
                key={story.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.42, delay: index * 0.05 }}
                className="card-gold-soft card-gold-soft-padded border-gold-2/45 shadow-[0_20px_48px_rgba(0,0,0,0.24)]"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-full bg-[linear-gradient(180deg,rgba(240,212,165,0.26),rgba(214,166,92,0.12))] text-[22px] font-semibold text-gold-2 shadow-[0_12px_24px_rgba(214,166,92,0.14)]">
                  <Image
                    src={story.imagePath}
                    alt={`Портрет участника клуба ${story.name}`}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 card-title--gold text-[24px] uppercase md:text-[30px]">
                  {widont(story.name)}
                </h3>

                <p className="card-copy mt-3">
                  {widont(story.role)}
                </p>

                <p className="mt-6 text-[18px] font-semibold leading-[1.35] text-gold-2 sm:text-[22px]">
                  {widont(story.result)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
