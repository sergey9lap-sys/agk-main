"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function EducationEngine() {
  const [hasImage, setHasImage] = useState(true);

  return (
    <section className="bg-bg section-compact">
      <Container>
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-gold-2/25 bg-[radial-gradient(circle_at_bottom_left,rgba(214,166,92,0.12),transparent_28%),linear-gradient(180deg,#0d0c0a_0%,#090909_100%)] shadow-card sm:rounded-[34px] lg:grid-cols-[minmax(0,1fr)_470px]">
          <div className="p-4 sm:p-6 lg:p-8">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="section-title--gold max-w-3xl uppercase leading-[0.98]"
            >
              {widont("Образование — это главный двигатель эволюции")}
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="content-body-xl mt-6 space-y-4 sm:mt-8 sm:space-y-6"
            >
              <p>{widont("Мир высокотехнологичен, потому что образование постоянно совершенствуется.")}</p>
              <p>{widont("Если вы учитесь, учите или создаёте образовательные продукты, то вы уже часть этого рынка.")}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-7 max-w-[680px] rounded-[24px] border border-gold-2/35 bg-[linear-gradient(180deg,#f3d7a0_0%,#e7be76_55%,#d1a359_100%)] p-4 shadow-[0_22px_55px_rgba(0,0,0,0.26)] sm:mt-9 sm:rounded-[30px] sm:p-5"
            >
              <p className="text-[16px] leading-[1.55] text-black sm:text-[18px]">
                {widont("Современный рынок образования динамичен и лидирующие позиции занимают эксперты, которые умеют быстро находить, тестировать и внедрять лучшие решения в свои продукты.")}
              </p>
            </motion.div>
          </div>

          <div className="relative min-h-[280px] border-t border-gold-2/15 sm:min-h-[360px] lg:min-h-full lg:border-l lg:border-t-0">
            {hasImage ? (
              <div className="relative h-full min-h-[280px] w-full sm:min-h-[360px]">
                <Image
                  src={encodeURI("/method-club/optimized/87ca968632aef7.webp")}
                  alt="Город как символ роста рынка образования"
                  fill
                  className="object-cover object-center"
                  onError={() => setHasImage(false)}
                />
              </div>
            ) : (
              <div className="flex h-full min-h-[360px] items-end justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_18%),linear-gradient(180deg,#1b2436_0%,#192033_28%,#0f1220_100%)] p-8 text-center">
                <div className="mb-6 rounded-[28px] border border-white/14 bg-black/20 px-8 py-10 backdrop-blur-xl">
                  <p className="text-[26px] font-semibold text-white">
                    Здесь будет фото города
                  </p>
                  <p className="mt-3 text-body text-white/68">
                    Подготовлено место под
                    <span className="text-gold-2"> /public/images/Город 3 блок.png</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
