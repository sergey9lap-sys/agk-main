"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { widont } from "@/lib/typography";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const bars = [
  { year: "2019 г.", value: "108 млрд", height: "h-[96px] sm:h-[150px]", tone: "bg-white/90 text-black" },
  { year: "2024 г.", value: "342 млрд", height: "h-[138px] sm:h-[215px]", tone: "bg-white/85 text-black" },
  { year: "2034 г.*", value: "411 млрд", height: "h-[184px] sm:h-[290px]", tone: "bg-[linear-gradient(180deg,#d9b06a_0%,#f3dfbf_55%,#e7c58e_100%)] text-black" },
];

export function MarketGrowth() {
  return (
    <section className="bg-bg section-compact">
      <Container>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-gold-2/25 bg-[radial-gradient(circle_at_top_right,rgba(214,166,92,0.16),transparent_24%),linear-gradient(180deg,#0d0c0a_0%,#090909_100%)] p-4 shadow-card sm:rounded-[34px] sm:p-6 lg:p-8">
          <div className="pointer-events-none absolute right-[-120px] top-[-80px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(214,166,92,0.2),transparent_60%)] blur-2xl" />
          <div className="pointer-events-none absolute bottom-[-140px] left-[-40px] h-[240px] w-[680px] rounded-full border-t border-gold-2/14 opacity-70" />
          <div className="pointer-events-none absolute bottom-[-120px] left-[20px] h-[220px] w-[620px] rounded-full border-t border-gold-2/10 opacity-50" />

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="section-title relative z-10 mx-auto max-w-5xl text-center uppercase"
          >
            {widont("Рынок онлайн-образования — один из самых быстрорастущих рынков\u00A0в\u00A0мире")}
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.08 }}
          className="relative z-10 mt-6 rounded-[24px] border border-gold-2/30 bg-black/35 p-4 sm:mt-8 sm:rounded-[28px] sm:p-5 lg:p-7"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-center">
              <div>
                <div className="flex h-[250px] items-end justify-between gap-2 rounded-[20px] border-b border-gold-2/35 px-2 pb-3 pt-4 sm:h-[320px] sm:gap-4 sm:rounded-[24px] sm:px-3 sm:pb-4 sm:pt-6 lg:h-[360px]">
                  {bars.map((bar, index) => (
                    <motion.div
                      key={bar.year}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
                      className="flex flex-1 flex-col items-center justify-end"
                    >
                      <div className="mb-2 text-center text-[12px] text-white/88 sm:mb-4 sm:text-[16px]">
                        {bar.year}
                      </div>
                      <div
                        className={`flex w-full max-w-[210px] items-center justify-center rounded-t-[14px] px-2 text-center text-[14px] font-semibold shadow-[0_14px_35px_rgba(0,0,0,0.18)] sm:rounded-t-[18px] sm:px-4 sm:text-[22px] ${bar.height} ${bar.tone}`}
                      >
                        {bar.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center lg:text-left">
                <p className="card-accent text-white">
                  <span className="font-semibold text-gold-2">Потенциал</span>{" "}
                  рынка онлайн-образования с каждым годом растет
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-[1.45] text-white/55 sm:mt-6 sm:text-sm">
              {widont("*Прогноз темпа прироста рынка онлайн-образования до 2034 года по исследованиям Skillbox.")}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
