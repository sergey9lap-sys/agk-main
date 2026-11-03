"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const employers = [
  {
    name: "Skyeng",
    logo: "https://static.tildacdn.com/tild3637-6462-4164-b534-383836373235/skyeng-logo-light.svg",
    logoClassName: "h-11 max-w-[190px]",
    description: "Школа английского языка",
  },
  {
    name: "Julia Marketing",
    logo: "https://optim.tildacdn.com/tild3334-6534-4864-a436-366139663866/-/resize/313x/-/format/webp/2.png.webp",
    logoClassName: "h-14 max-w-[190px]",
    description: "Julia Marketing Юлии Родочинской",
  },
  {
    name: "AZARENOK PRO",
    logo: "https://static.tildacdn.com/tild6131-3665-4561-b530-373038373432/logo-red.svg",
    logoClassName: "h-20 max-w-[150px]",
    description: "Марии Азаренок",
  },
  {
    name: "Масштаб",
    logo: "https://optim.tildacdn.com/tild3830-6264-4363-a639-313464633231/-/resize/219x/-/format/webp/___2.jpg.webp",
    logoClassName: "h-20 max-w-[150px]",
    description: "Продюсерский центр",
  },
  {
    name: "Skillbox",
    logo: "https://static.tildacdn.com/tild3437-6632-4734-b838-323663306461/skillbox.svg",
    logoClassName: "h-12 max-w-[190px]",
    description: "Образовательная платформа",
  },
  {
    name: "Нетология",
    logo: "https://static.tildacdn.com/tild6230-3633-4137-a566-653531656136/image_19.svg",
    logoClassName: "h-10 max-w-[190px]",
    description: "Образовательная платформа",
  },
  {
    name: "Академия переговоров Игоря Рызова",
    logo: "https://static.tildacdn.com/tild3338-3363-4339-b362-343265616431/image_19_2.svg",
    logoClassName: "h-14 max-w-[190px]",
    description: "Академия переговоров",
  },
  {
    name: "MIRA SCHOOL",
    logo: "https://optim.tildacdn.com/tild6138-6533-4562-a565-636130656563/-/resize/111x/-/format/webp/744650.png.webp",
    logoClassName: "h-14 max-w-[110px]",
    description: "Онлайн-школа маркетинга",
  },
  {
    name: "МИИН",
    logo: "https://static.tildacdn.com/tild3036-3737-4366-b037-656433626266/image_19_1.svg",
    logoClassName: "h-16 max-w-[150px]",
    description: "Институт нутрициологии",
  },
  {
    name: "Сбер",
    logo: "https://optim.tildacdn.com/tild3031-3333-4330-b764-623863636162/-/resize/192x/-/format/webp/image_3.png.webp",
    logoClassName: "h-12 max-w-[170px]",
    description: "Корпоративное обучение",
  },
];

function EmployerLogo({
  employer,
}: {
  employer: {
    name: string;
    logo: string;
    logoClassName: string;
    description: string;
  };
}) {
  const [failed, setFailed] = useState(false);
  const needsLightLogo = employer.name === "Skillbox" || employer.name === "Нетология";

  if (failed) {
    return (
      <div className="flex min-h-[58px] w-full max-w-[190px] items-center justify-center rounded-[14px] border border-orange-1/22 bg-card-bg/74 px-4 py-3 text-center font-heading text-lg font-black leading-tight text-orange-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_20px_rgba(85,11,24,0.08)]">
        {employer.name}
      </div>
    );
  }

  return (
    <Image
      src={employer.logo}
      alt={employer.name}
      width={220}
      height={88}
      className={`object-contain drop-shadow-sm ${
        needsLightLogo ? "brightness-0 invert" : ""
      } ${employer.logoClassName}`}
      loading="lazy"
      unoptimized={employer.logo.startsWith("http")}
      onError={() => setFailed(true)}
    />
  );
}

const alumni = [
  {
    initials: "ИА",
    name: "Ирина Мамаклаб Акопян",
    handle: "@irina_mamaclub",
    audience: "3 млн подписчиков",
    photo:
      "https://optim.tildacdn.com/tild6137-6334-4062-a665-316461636530/-/resize/180x/-/format/webp/image_26.png.webp",
  },
  {
    initials: "МА",
    name: "Мария Азарёнок",
    handle: "@azarenok",
    audience: "130 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild6366-3030-4439-b731-666261313761/-/resize/180x/-/format/webp/image_26_1.png.webp",
  },
  {
    initials: "ЛЯ",
    name: "Лейли Ялунина",
    handle: "@leyli_yalunina",
    audience: "131 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild6632-3633-4366-a439-356432323432/-/resize/180x/-/format/webp/image_21.png.webp",
  },
  {
    initials: "НГ",
    name: "Ната Гончар",
    handle: "@ryzov_igor",
    audience: "166 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild3236-6230-4531-b637-326334326337/-/resize/180x/-/format/webp/image_27_1.png.webp",
  },
  {
    initials: "ИР",
    name: "Игорь Рызов",
    handle: "@ryzov_igor",
    audience: "286 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild3533-6634-4361-b834-646231626263/-/cover/180x180/center/center/-/format/webp/photo.png.webp",
  },
  {
    initials: "НЗ",
    name: "Натэла Зубченко",
    handle: "@natelazub",
    audience: "50,4 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild6438-3665-4438-a136-313230303136/-/resize/180x/-/format/webp/image_22_1.png.webp",
  },
  {
    initials: "ЕП",
    name: "Евгения Павловская",
    handle: "@pavlovskaia_evgeniya",
    audience: "145 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild3966-3364-4135-b635-396462393934/-/resize/180x/-/format/webp/Gfdkjdcrfz.png.webp",
  },
  {
    initials: "ЮС",
    name: "Юлия Столярова",
    handle: "@stolyarovajulia",
    audience: "389 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild6638-3862-4435-a535-636532376434/-/resize/180x/-/format/webp/image_28.png.webp",
  },
  {
    initials: "ТМ",
    name: "Татьяна Маричева",
    handle: "@marichevva",
    audience: "202 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild3230-3635-4133-a134-383435643933/-/resize/180x/-/format/webp/image_23.png.webp",
  },
  {
    initials: "МЛ",
    name: "Мила Литвинская",
    handle: "@mila_litvinskaya",
    audience: "271 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild3839-6365-4736-b462-353361356161/-/resize/180x/-/format/webp/image_23_1.png.webp",
  },
  {
    initials: "ВБ",
    name: "Владислав Бермуда",
    handle: "@vlad.bermuda",
    audience: "102 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild6262-6635-4434-b264-336662633036/-/resize/180x/-/format/webp/image_27.png.webp",
  },
  {
    initials: "ГМ",
    name: "Галина Мельникова",
    handle: "@galya.melnikova",
    audience: "155 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild6365-3063-4666-a230-343239373539/-/resize/180x/-/format/webp/image_27_3.png.webp",
  },
  {
    initials: "ИН",
    name: "Игорь Новокриницкий",
    handle: "@massagist_novokrinitskii",
    audience: "1,5 млн подписчиков",
    photo:
      "https://optim.tildacdn.com/tild6262-3438-4039-b265-396239393532/-/resize/180x/-/format/webp/image_29.png.webp",
  },
  {
    initials: "ОС",
    name: "Ольга Савонина",
    handle: "@doctor_savonina",
    audience: "111 тыс. подписчиков",
    photo:
      "https://optim.tildacdn.com/tild3664-6535-4366-b030-386139626362/-/resize/180x/-/format/webp/image_27_2.png.webp",
  },
  {
    initials: "МБ",
    name: "Максим Батырев",
    handle: "Instagram",
    audience: "178 тыс. подписчиков",
    photo: "/metodologiya/images/maksim-batyrev.jpg",
    imageClassName: "object-[50%_12%]",
  },
];

const additionalAlumni = [
  {
    initials: "МГ",
    name: "Михаил Гребенюк",
    handle: "Instagram",
    audience: "683 тыс. подписчиков",
    photo: "/metodologiya/images/mikhail-grebenyuk.jpg",
  },
  {
    initials: "АС",
    name: "Артем Сенаторов",
    handle: "Instagram",
    audience: "1,4 млн подписчиков",
    photo: "/metodologiya/images/artem-senatorov.jpg",
  },
  {
    initials: "ЕП",
    name: "Егор Пыриков",
    handle: "Instagram",
    audience: "120 тыс. подписчиков",
    photo: "/metodologiya/images/egor-pyrikov.jpg",
  },
  {
    initials: "РГ",
    name: "Радислав Гандапас",
    handle: "Instagram",
    audience: "775 тыс. подписчиков",
    photo: "/metodologiya/images/radislav-gandapas.jpg",
    imageClassName: "object-[50%_12%]",
  },
];

const priorityAlumniNames = [
  "Максим Батырев",
  "Михаил Гребенюк",
  "Радислав Гандапас",
  "Артем Сенаторов",
  "Егор Пыриков",
];

const allAlumni = [...alumni, ...additionalAlumni];

const sortedAlumni = [
  ...priorityAlumniNames.flatMap((name) =>
    allAlumni.find((person) => person.name === name) ?? []
  ),
  ...allAlumni.filter((person) => !priorityAlumniNames.includes(person.name)),
];

const initialVisibleAlumni = 8;

function AlumniEmployersBlock() {
  return (
    <div className="relative overflow-hidden bg-bg py-10 lg:py-12">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-29.jpg"
        variant="light"
        position="object-bottom"
        className="opacity-45 saturate-[0.7]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_18%_16%,rgba(240,120,48,0.16),transparent_20rem),linear-gradient(180deg,rgba(8,8,8,0.9),rgba(14,14,14,0.96))]"
      />
      <Container className="relative z-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-3 text-center font-heading text-3xl font-black uppercase text-text-primary lg:text-4xl"
        >
          Выпускники-методологи Александры работают в:
        </motion.h2>
        <p className="mx-auto mb-8 max-w-3xl text-center text-base font-medium text-text-secondary lg:mb-10 lg:text-lg">
          Наши ученики применяют методологию в онлайн‑школах, образовательных
          платформах, продюсерских центрах и собственных проектах.
        </p>
      </Container>

      <Container className="relative z-20">
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {employers.map((employer) => (
            <div
              key={employer.name}
              className="flex min-h-[128px] items-center justify-center px-3 py-3 text-base font-bold text-text-primary"
            >
              <div className="flex flex-col items-center gap-3">
                <EmployerLogo employer={employer} />
                <span className="max-w-[220px] text-center text-sm font-semibold leading-tight text-text-secondary">
                  {employer.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#pricing"
            className="inline-flex min-h-[60px] w-full max-w-[640px] items-center justify-center gap-3 rounded-[12px] border border-white/30 bg-orange-1 px-7 py-[18px] text-center text-base font-semibold uppercase tracking-wide text-[#090909] shadow-[0_14px_32px_rgba(217,106,50,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-2 hover:shadow-[0_18px_42px_rgba(217,106,50,0.34)] sm:w-auto sm:px-9 sm:text-lg"
          >
            🎯 Пройти курс и получить востребованную профессию
            <ArrowRight className="h-5 w-5 flex-shrink-0" />
          </a>
        </motion.div>
      </Container>
    </div>
  );
}

export function AlumniEmployers() {
  return (
    <section className="overflow-hidden bg-black">
      <AlumniEmployersBlock />
    </section>
  );
}

export function FamousAlumni() {
  const [showAll, setShowAll] = useState(false);
  const [activePerson, setActivePerson] = useState<string | null>(null);
  const visibleAlumni = showAll
    ? sortedAlumni
    : sortedAlumni.slice(0, initialVisibleAlumni);
  const hiddenCount = sortedAlumni.length - initialVisibleAlumni;

  return (
    <section className="relative overflow-hidden bg-[#080808] py-12 lg:py-14">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-29.jpg"
        variant="orange"
        position="object-center"
        className="opacity-20 saturate-[0.70]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_16%,rgba(240, 120, 48, 0.12),transparent_24rem),linear-gradient(180deg,rgba(33,0,7,0.88),rgba(85,11,24,0.78))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 z-10 hidden h-[88%] w-36 opacity-[0.12] lg:block"
      >
        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent_0_18px,rgba(8,8,8,0.8)_18px_26px,rgba(240,120,48,0.24)_26px_31px,transparent_31px_54px)] blur-[0.2px]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-0 z-10 hidden h-[88%] w-36 opacity-[0.12] lg:block"
      >
        <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent_0_18px,rgba(8,8,8,0.8)_18px_26px,rgba(240,120,48,0.24)_26px_31px,transparent_31px_54px)] blur-[0.2px]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-18 [background-image:linear-gradient(rgba(255, 255, 255, 0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255, 255, 255, 0.10)_1px,transparent_1px)] [background-size:72px_72px]"
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
          <h2 className="font-heading text-3xl font-black uppercase text-text-primary lg:text-4xl">
            Александра работала с
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-relaxed text-text-primary/80 lg:text-lg">
            Эксперты, предприниматели и лидеры рынка, с которыми были
            реализованы образовательные проекты.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-8 lg:gap-x-5 lg:gap-y-9">
            <AnimatePresence initial={false}>
              {visibleAlumni.map((person, index) => {
                const isActive = activePerson === person.name;

                return (
                  <motion.article
                    key={person.name}
                    layout
                    initial={{ opacity: 0, y: 22, scale: 0.94 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.44,
                      ease: [0.22, 1, 0.36, 1],
                      delay: (index % initialVisibleAlumni) * 0.045,
                    }}
                    className={`relative text-center ${isActive ? "z-30" : "z-10"}`}
                    onMouseEnter={() => setActivePerson(person.name)}
                    onMouseLeave={() => setActivePerson(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActivePerson(isActive ? null : person.name)
                      }
                      onFocus={() => setActivePerson(person.name)}
                      onBlur={() => setActivePerson(null)}
                      aria-expanded={isActive}
                      className="group mx-auto block cursor-pointer outline-none"
                    >
                      <div className="relative mx-auto h-[118px] w-[118px] rounded-full bg-[conic-gradient(from_20deg,#F07830,#FF9545,#C75D24,#FFB060,#F07830)] p-[7px] shadow-[0_16px_28px_rgba(58,0,12,0.18),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_38px_rgba(85,11,24,0.24),0_0_24px_rgba(240, 120, 48, 0.22)] focus-visible:ring-2 focus-visible:ring-orange-1 focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:h-[132px] lg:w-[132px]">
                        <div className="absolute inset-[12px] rounded-full border border-orange-1/18" />
                        <div className="relative h-full w-full overflow-hidden rounded-full border border-white/74 bg-card-bg shadow-[inset_0_0_18px_rgba(58,0,12,0.16)]">
                          {person.photo ? (
                            <Image
                              src={person.photo}
                              alt={person.name}
                              width={180}
                              height={180}
                              className={`h-full w-full object-cover grayscale-[12%] contrast-[1.04] saturate-[0.94] ${
                                "imageClassName" in person
                                  ? person.imageClassName
                                  : ""
                              }`}
                              loading="lazy"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center font-heading text-3xl font-black text-orange-1">
                              {person.initials}
                            </span>
                          )}
                        </div>
                        <span className="pointer-events-none absolute left-5 top-4 h-8 w-12 rotate-[-22deg] rounded-full bg-white/20 blur-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <h3 className="mx-auto mt-3 max-w-[150px] text-sm font-bold leading-tight text-text-primary lg:text-[15px]">
                        {person.name}
                      </h3>
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="absolute left-1/2 top-[150px] z-40 w-[210px] -translate-x-1/2 rounded-[16px] border border-white/14 bg-card-bg p-3 text-left shadow-[0_18px_34px_rgba(58,0,12,0.16),inset_0_1px_0_rgba(255,255,255,0.62)] lg:top-[164px]"
                        >
                          <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-3">
                            <div className="relative h-[52px] w-[52px] overflow-hidden rounded-full border border-orange-1/24 bg-bg">
                              {person.photo ? (
                                <Image
                                  src={person.photo}
                                  alt=""
                                  fill
                                  sizes="52px"
                                  className={`object-cover ${
                                    "imageClassName" in person
                                      ? person.imageClassName
                                      : ""
                                  }`}
                                />
                              ) : (
                                <span className="flex h-full w-full items-center justify-center font-heading text-lg font-black text-orange-1">
                                  {person.initials}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-black leading-tight text-text-primary">
                                {person.name}
                              </p>
                              <p className="mt-1 truncate text-xs font-bold text-orange-2">
                                {person.handle}
                              </p>
                              <p className="mt-1 text-xs font-semibold text-text-secondary">
                                {person.audience}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {hiddenCount > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-9 flex justify-center"
            >
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[12px] border border-white/30 bg-orange-1 px-6 py-3 text-sm font-black uppercase tracking-wide text-[#090909] shadow-[0_12px_28px_rgba(217,106,50,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-2 hover:shadow-[0_18px_36px_rgba(217,106,50,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-1 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {showAll
                  ? "Скрыть экспертов"
                  : `Показать всех экспертов (+${hiddenCount})`}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
