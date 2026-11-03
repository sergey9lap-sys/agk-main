"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const corporations = [
  {
    name: "СБЕР",
    logo: "https://optim.tildacdn.com/tild3031-3333-4330-b764-623863636162/-/resize/192x/-/format/webp/image_3.png.webp",
    logoClassName: "h-14 max-w-[190px]",
  },
  {
    name: "РОСНЕФТЬ",
    logo: "https://optim.tildacdn.com/tild3562-3062-4561-a664-373766383434/-/resize/192x/-/format/webp/image_6.png.webp",
    logoClassName: "h-12 max-w-[190px]",
  },
  {
    name: "Норникель",
    logo: "https://optim.tildacdn.com/tild6430-3335-4636-b036-343331646165/-/resize/192x/-/format/webp/cropped-nornikel-1_.png.webp",
    logoClassName: "h-14 max-w-[190px]",
  },
  {
    name: "X5 Group",
    logo: "https://optim.tildacdn.com/tild3536-3065-4064-b433-653566333831/-/resize/192x/-/format/webp/image_2.png.webp",
    logoClassName: "h-20 max-w-[220px] scale-125",
  },
  {
    name: "ВкусВилл",
    logo: "https://logo-teka.com/wp-content/uploads/2025/06/vkusvill-sign-logo.png",
    logoClassName: "h-11 max-w-[150px]",
  },
  {
    name: "Nestle",
    logo: "https://optim.tildacdn.com/tild6130-3766-4030-b866-306334633065/-/resize/192x/-/format/webp/74115522153f631bee37.png.webp",
    logoClassName: "h-12 max-w-[170px]",
  },
  {
    name: "Tele2",
    logo: "https://logo-teka.com/wp-content/uploads/2025/07/t2-logo.png",
    logoClassName: "h-12 max-w-[130px]",
  },
  {
    name: "РЖД",
    logo: "https://logo-teka.com/wp-content/uploads/2025/07/rzd-logo.png",
    logoClassName: "h-12 max-w-[160px]",
  },
  {
    name: "Western Union",
    logo: "/metodologiya/images/wu-big.png",
    logoClassName: "h-12 max-w-[200px]",
  },
  {
    name: "Альфа-Банк",
    logo: "https://optim.tildacdn.com/tild6264-6338-4535-a461-663833343031/-/resize/192x/-/format/webp/og_og_16157248482433.png.webp",
    logoClassName: "h-16 max-w-[220px]",
  },
  {
    name: "ВТБ",
    logo: "https://optim.tildacdn.com/tild6666-3337-4261-b436-376565313964/-/resize/192x/-/format/webp/754598838847774untit.png.webp",
    logoClassName: "h-16 max-w-[190px]",
  },
  {
    name: "L'Oréal",
    logo: "https://logo-teka.com/wp-content/uploads/2026/01/loreal-paris-logo.png",
    logoClassName: "h-14 max-w-[210px]",
  },
];

export function Corporations() {
  return (
    <section className="relative overflow-hidden bg-bg py-10 lg:py-12">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-31-18.jpg"
        variant="light"
        position="object-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[320px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,120,48,0.14),transparent_68%)] blur-sm"
      />
      <Container className="relative z-20">
        <div className="relative z-10 overflow-hidden rounded-[24px] border border-orange-2/42 bg-[radial-gradient(circle_at_18%_0%,rgba(255,176,96,0.52),transparent_22rem),linear-gradient(135deg,rgba(240,120,48,0.94),rgba(255,149,69,0.78)_52%,rgba(199,93,36,0.92))] px-4 py-7 shadow-[0_24px_70px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.24)] lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <p className="mx-auto mb-7 max-w-4xl text-xl font-bold leading-snug text-[#080808] lg:mb-8 lg:text-2xl">
              Методология Александры выросла из практики с экспертами,
              предпринимателями и крупнейшими компаниями рынка.
            </p>
          </motion.div>

          <div className="relative z-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex min-w-max animate-marquee-left gap-5 px-5 lg:gap-7">
              {[...corporations, ...corporations].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex h-[112px] w-[240px] flex-shrink-0 items-center justify-center px-6 lg:w-[280px]"
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={260}
                    height={110}
                    className={`object-contain drop-shadow-sm ${
                      company.logoClassName ?? "h-14 max-w-[190px]"
                    }`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
