"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const archetypes = [
  {
    title: "Эксперт",
    text: "Тем, кто хочет перестать объяснять «как умеет» и начать строить сильные, понятные и результативные продукты.",
    accent: "Вы научитесь превращать экспертизу в структуру, за которую готовы платить.",
    href: "#expert-results",
  },
  {
    title: "Предприниматель",
    text: "Тем, кто хочет выстроить продуктовую систему, сократить хаос в команде и масштабировать образовательное направление.",
    accent: "Методология усиливает системное мышление, планирование и управляемость бизнеса.",
    href: "#entrepreneur-results",
  },
  {
    title: "Будущий методолог",
    text: "Тем, кто хочет зайти в EdTech и начать проектировать востребованные образовательные продукты уже во время обучения.",
    accent: "Профессия методолога остаётся одной из самых перспективных в EdTech 2026.",
    href: "#methodologist-career",
  },
  {
    title: "Действующий методолог",
    text: "Тем, кто уже работает с экспертами, но хочет выйти из операционки и перейти к системной работе над проектом.",
    accent: "Курс помогает перейти от хаотичной практики к управляемому продукту.",
    href: "#methodologist-career",
  },
];

const archetypeNumerals = ["I", "II", "III", "IV"];

const galleryVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.16,
    },
  },
};

const archetypeVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function keepShortWords(text: string) {
  const shortWords =
    "а|в|во|и|или|к|ко|с|со|у|о|об|обо|по|на|за|из|от|до|для|над|под|при|про|без|не|но|что|как";

  return text.replace(
    new RegExp(`(^|[\\s\\u00A0])(${shortWords})([\\s\\u00A0]+)`, "gi"),
    (_match, prefix: string, word: string) => `${prefix}${word}\u00A0`
  );
}

function renderArchetypeText(title: string, text: string) {
  if (title === "Будущий методолог") {
    return (
      <>
        {keepShortWords("Тем, кто хочет зайти в EdTech и начать проектировать востребованные образовательные продукты")}
        <br />
        {keepShortWords("уже во время обучения.")}
      </>
    );
  }

  return keepShortWords(text);
}

export function ForWhom() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#080808] py-12 lg:py-14">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-31.jpg"
        variant="orange"
        position="object-bottom"
        className="opacity-24 saturate-[0.7]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(240,120,48,0.16),transparent_20rem),radial-gradient(circle_at_82%_42%,rgba(255,176,96,0.10),transparent_20rem),linear-gradient(135deg,rgba(8,8,8,0.92),rgba(21,21,21,0.82)_52%,rgba(8,8,8,0.94))]"
      />
      <div aria-hidden="true" className="archetypes-dust pointer-events-none absolute inset-0 z-10" />

      <Container className="relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 max-w-4xl text-center lg:mb-5"
        >
          <h2 className="mb-3 font-heading text-3xl font-black uppercase text-white lg:text-[34px]">
            Кому подходит курс
          </h2>
          <p className="text-lg leading-snug text-white/90 lg:text-[19px]">
            {keepShortWords("Методология нужна не только школам и не только “людям из образования”.")}
            <br className="hidden sm:block" />
            {keepShortWords(" Она нужна всем, кто строит продукт и отвечает за результат ученика.")}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          variants={galleryVariants}
          className="relative mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2"
        >
          {archetypes.map((archetype, index) => {
            return (
              <motion.a
                key={archetype.title}
                href={archetype.href}
                variants={archetypeVariants}
                className="group relative isolate block min-h-[286px] cursor-pointer overflow-hidden rounded-[18px] border border-white/16 bg-card-bg/88 p-7 text-left shadow-[0_22px_58px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-md transition-all duration-300 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[linear-gradient(180deg,#F07830,#FFB060,#F07830)] after:absolute after:right-5 after:top-3 after:-z-10 after:font-heading after:text-[128px] after:font-black after:leading-none after:text-white/[0.025] after:content-[attr(data-index)] hover:-translate-y-1 hover:border-orange-1/46 hover:bg-card-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-1 focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
                data-index={archetypeNumerals[index]}
                aria-label={`${archetype.title}: перейти к подробностям`}
              >
                <div className="relative z-10 mb-7 flex min-w-0 items-center justify-between gap-4">
                  <span className="flex h-11 min-w-11 items-center justify-center rounded-full border border-orange-2/55 bg-[radial-gradient(circle_at_32%_24%,#FFB060,#F07830_58%,#151515_100%)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_24px_rgba(217,106,50,0.22)]">
                    {archetypeNumerals[index]}
                  </span>
                  <span className="h-px flex-1 bg-orange-1/28" />
                </div>
                <div className="relative z-10 min-w-0">
                  <motion.h3
                    variants={textVariants}
                    className="max-w-full break-words font-heading text-[28px] font-black uppercase leading-tight text-text-primary lg:text-3xl"
                  >
                    {keepShortWords(archetype.title)}
                  </motion.h3>
                  <motion.div variants={textVariants} className="mt-4 space-y-3">
                    <p className="text-base leading-relaxed text-text-primary/86">
                      {renderArchetypeText(archetype.title, archetype.text)}
                    </p>
                    <p className="text-sm font-bold leading-relaxed text-text-primary">
                      {keepShortWords(archetype.accent)}
                    </p>
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
