"use client";

import { Container } from "@/components/ui/Container";
import { SectionBackground } from "@/components/SectionBackground";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const productColumns = [
  {
    title: "Точки входа",
    products: ["Вебинары", "Интенсивы"],
  },
  {
    title: "Повышение",
    products: ["Мастермайнды", "Тренинги", "Мастер-классы"],
  },
  {
    title: "Генератор",
    products: ["Курсы", "Наставничество"],
  },
  {
    title: "Мечта",
    products: ["Мастер-группы", "Стратегические сессии"],
  },
];

const resultCards = [
  "Сильная продуктовая линейка",
  "Понятный путь клиента",
  "Экосистема продуктов",
  "Самостоятельная система продукта",
  "Структура сопровождения учеников",
  "Рост качества без хаоса",
];

const matrixHeaders = [
  { title: "Точки входа", x: 125 },
  { title: "Повышение", x: 375 },
  { title: "Генератор", x: 625 },
  { title: "Мечта", x: 875 },
];

const matrixNodes = [
  { id: "webinars", label: "Вебинары", x: 125, y: 190, delay: 0.18 },
  { id: "intensives", label: "Интенсивы", x: 125, y: 300, delay: 0.26 },
  { id: "masterminds", label: "Мастермайнды", x: 375, y: 130, delay: 0.38 },
  { id: "trainings", label: "Тренинги", x: 375, y: 220, delay: 0.46 },
  { id: "workshops", label: "Мастер-классы", x: 375, y: 310, delay: 0.54 },
  { id: "courses", label: "Курсы", x: 625, y: 180, delay: 0.68 },
  { id: "mentorship", label: "Наставничество", x: 625, y: 285, delay: 0.76 },
  { id: "groups", label: "Мастер-группы", x: 875, y: 155, delay: 0.9 },
  { id: "sessions", label: "Стратегические сессии", x: 875, y: 280, delay: 0.98 },
];

const matrixPaths = [
  { from: "webinars", to: "masterminds" },
  { from: "intensives", to: "trainings" },
  { from: "intensives", to: "workshops" },
  { from: "masterminds", to: "courses" },
  { from: "trainings", to: "courses" },
  { from: "workshops", to: "mentorship" },
  { from: "courses", to: "groups" },
  { from: "mentorship", to: "sessions" },
];

const romanHeaders = ["I", "II", "III", "IV"];

type MatrixConnection = {
  d: string;
  arrowX: number;
  arrowY: number;
  rotate: number;
};

export function NichesAndFormats() {
  const matrixRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [connections, setConnections] = useState<MatrixConnection[]>([]);
  const [matrixSize, setMatrixSize] = useState({ width: 0, height: 0 });

  const updateConnections = useCallback(() => {
    const matrix = matrixRef.current;
    if (!matrix) return;

    const matrixRect = matrix.getBoundingClientRect();
    setMatrixSize({ width: matrixRect.width, height: matrixRect.height });

    const nextConnections = matrixPaths.flatMap(({ from, to }) => {
      const fromNode = nodeRefs.current[from];
      const toNode = nodeRefs.current[to];
      if (!fromNode || !toNode) return [];

      const fromRect = fromNode.getBoundingClientRect();
      const toRect = toNode.getBoundingClientRect();
      const startX = fromRect.right - matrixRect.left;
      const startY = fromRect.top - matrixRect.top + fromRect.height / 2;
      const endX = toRect.left - matrixRect.left;
      const endY = toRect.top - matrixRect.top + toRect.height / 2;
      const curveOffset = Math.max(42, Math.min(96, (endX - startX) * 0.42));
      const control1X = startX + curveOffset;
      const control2X = endX - curveOffset;
      const d = `M ${startX} ${startY} C ${control1X} ${startY}, ${control2X} ${endY}, ${endX} ${endY}`;
      const rotate = (Math.atan2(endY - startY, Math.max(endX - startX, 1)) * 180) / Math.PI;
      const arrowOffset = 0;
      const arrowLift = 13;

      return [{ d, arrowX: endX + arrowOffset, arrowY: endY - arrowLift, rotate }];
    });

    setConnections(nextConnections);
  }, []);

  useLayoutEffect(() => {
    updateConnections();

    const matrix = matrixRef.current;
    const observer = new ResizeObserver(updateConnections);
    if (matrix) observer.observe(matrix);
    Object.values(nodeRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    window.addEventListener("resize", updateConnections);
    document.fonts?.ready.then(updateConnections).catch(() => undefined);
    const raf = window.requestAnimationFrame(updateConnections);
    const timer = window.setTimeout(updateConnections, 450);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateConnections);
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [updateConnections]);

  return (
    <section className="relative overflow-hidden bg-bg py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-30-59.jpg"
        variant="light"
        position="object-center"
        className="opacity-35 blur-[3px] scale-[1.02] saturate-[0.72]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-orange-1/16 to-transparent"
      />
      <Container className="relative z-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl font-black uppercase leading-tight text-text-primary lg:text-4xl"
          >
            Методология усиливает не один продукт, а всю систему
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-3xl text-lg font-semibold text-text-secondary lg:text-xl"
          >
            Разрозненные форматы собираются в понятную продуктовую линейку
          </motion.p>
        </div>

        <div className="mt-9 lg:mt-12">
          <div className="lg:hidden">
            <div className="relative mx-auto max-w-[440px]">
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.25, ease: "easeInOut", delay: 0.18 }}
                className="absolute bottom-10 left-6 top-6 z-0 w-[3px] origin-top rounded-full bg-[linear-gradient(180deg,#F07830,#FFB060,#F07830)] shadow-[0_0_18px_rgba(240, 120, 48, 0.38)]"
              />

              <div className="relative z-10 space-y-5">
                {productColumns.map((column, columnIndex) => (
                  <motion.div
                    key={column.title}
                    initial={{ opacity: 0, x: -18, y: 16 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.1 + columnIndex * 0.12,
                    }}
                    className="relative ml-12 overflow-hidden rounded-[18px] border border-white/16 bg-card-bg/94 p-4 shadow-[0_16px_36px_rgba(40,25,10,0.1),inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur-sm before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_18%_12%,rgba(240,120,48,0.12),transparent_35%)]"
                  >
                    <span className="absolute left-3 top-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1C1C1C] bg-orange-1 font-heading text-lg font-black text-orange-3 shadow-[0_0_18px_rgba(240, 120, 48, 0.42)]">
                      {romanHeaders[columnIndex]}
                    </span>
                    <div className="mb-3 flex min-h-12 items-center gap-3 pl-14">
                      <h3 className="font-heading text-xl font-black uppercase leading-tight text-text-primary">
                        {column.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {column.products.map((product, productIndex) => (
                        <motion.div
                          key={product}
                          initial={{ opacity: 0, x: -18, scale: 0.96 }}
                          whileInView={{ opacity: 1, x: 0, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.42,
                            ease: "easeOut",
                            delay: 0.16 + columnIndex * 0.1 + productIndex * 0.05,
                          }}
                          className="relative flex min-h-[54px] items-center justify-center rounded-[14px] border border-orange-1/22 bg-bg px-4 py-3 text-center text-sm font-black leading-snug text-text-primary shadow-[0_12px_24px_rgba(85,11,24,0.10),inset_0_1px_0_rgba(255,255,255,0.10)]"
                        >
                          {product}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative hidden lg:block"
          >
            <div ref={matrixRef} className="relative mx-auto h-[520px] max-w-6xl overflow-hidden rounded-[24px] border border-white/12 bg-card-bg/78 shadow-[0_20px_60px_rgba(40,25,10,0.08)] backdrop-blur-md">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[360px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(85,11,24,0.18),transparent_68%)] blur-sm"
              />
              <svg
                aria-hidden="true"
                viewBox={`0 0 ${matrixSize.width || 1} ${matrixSize.height || 1}`}
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible"
              >
                <defs>
                  <filter id="product-matrix-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[12.5, 37.5, 62.5, 87.5].map((x) => (
                  <line
                    key={x}
                    x1={`${x}%`}
                    y1="18%"
                    x2={`${x}%`}
                    y2="88%"
                    stroke="rgba(240,120,48,0.20)"
                    strokeDasharray="8 10"
                    strokeWidth="1"
                  />
                ))}
                {[30.5, 51.2, 72.4].map((y) => (
                  <line
                    key={y}
                    x1="7.2%"
                    y1={`${y}%`}
                    x2="92.8%"
                    y2={`${y}%`}
                    stroke="rgba(255,176,96,0.16)"
                    strokeDasharray="6 12"
                    strokeWidth="1"
                  />
                ))}

                {connections.map((path, index) => (
                  <motion.path
                    key={path.d}
                    d={path.d}
                    fill="none"
                    stroke="rgba(240,120,48,0.82)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    filter="url(#product-matrix-glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 1.02 + index * 0.08,
                    }}
                  />
                ))}
              </svg>

              {connections.map((path, index) => (
                <motion.span
                  key={`${path.d}-head`}
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.24, ease: "easeOut", delay: 1.46 + index * 0.08 }}
                  style={{
                    left: path.arrowX,
                    top: path.arrowY,
                    transform: `translate(-50%, -50%) rotate(${path.rotate}deg)`,
                  }}
                  className="pointer-events-none absolute z-40 flex h-7 w-7 items-center justify-center rounded-full border border-orange-2/70 bg-orange-1 text-white shadow-[0_8px_18px_rgba(240,120,48,0.28)]"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              ))}

              {matrixHeaders.map((header, index) => (
                <motion.div
                  key={header.title}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.42,
                    ease: "easeOut",
                    delay: index * 0.08,
                  }}
                  style={{ left: `${header.x / 10}%` }}
                  className="absolute top-9 z-20 flex w-[190px] -translate-x-1/2 flex-col items-center text-center"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-1 font-heading text-lg font-black text-white shadow-[0_10px_24px_rgba(85,11,24,0.26)]">
                    {romanHeaders[index]}
                  </span>
                  <h3 className="font-heading text-lg font-black uppercase leading-tight text-text-primary">
                    {header.title}
                  </h3>
                </motion.div>
              ))}

              {matrixNodes.map((node, index) => (
                <motion.div
                  key={node.label}
                  ref={(element) => {
                    nodeRefs.current[node.id] = element;
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: node.delay,
                  }}
                  style={{
                    left: `${node.x / 10}%`,
                    top: `${node.y / 4.2}%`,
                  }}
                  className="group absolute z-10 flex min-h-[68px] w-[180px] -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center overflow-hidden rounded-[16px] border border-white/16 bg-bg/92 px-4 py-3 text-center text-sm font-bold leading-snug text-text-primary shadow-[0_12px_30px_rgba(40,25,10,0.09),inset_0_1px_0_rgba(255,255,255,0.56)] backdrop-blur-[1px] transition-colors duration-300 hover:border-orange-1/45 hover:shadow-[0_18px_48px_rgba(85,11,24,0.14)]"
                >
                  <span className="absolute left-1/2 top-0 h-1 w-12 -translate-x-1/2 rounded-b-full bg-orange-1/70 transition-all duration-300 group-hover:w-20" />
                  {node.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative mx-auto mt-8 max-w-6xl lg:mt-10">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 1.26 }}
              className="mb-5 text-center font-heading text-xl font-black text-text-primary lg:mb-7 lg:text-2xl"
            >
              И во что это вырастает
            </motion.p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {resultCards.map((item, index) => {
                const fromLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      x: fromLeft ? -38 : 38,
                      y: 12,
                      scale: 0.98,
                    }}
                    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 1.34 + index * 0.08,
                    }}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                      boxShadow: "0 18px 48px rgba(85, 11, 24, 0.18)",
                    }}
                    className="group relative flex min-h-[76px] items-center justify-center overflow-hidden rounded-[22px] border border-[rgba(117,22,46,0.22)] bg-card-bg px-5 py-4 text-center text-sm font-bold leading-snug text-text-primary shadow-[0_12px_30px_rgba(40,25,10,0.07)] transition-colors duration-300 hover:border-orange-1/70 lg:text-base"
                  >
                    <span className="absolute left-1/2 top-0 h-1.5 w-14 -translate-x-1/2 rounded-b-full bg-orange-1/70 transition-all duration-300 group-hover:w-24" />
                    {item}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 1.74 }}
              className="mt-7 flex justify-center"
            >
              <a
                href="#pricing"
                className="inline-flex min-h-[60px] w-full max-w-[390px] items-center justify-center gap-3 rounded-[12px] bg-orange-1 px-9 py-[18px] text-center text-lg font-semibold uppercase tracking-wide text-[#090909] shadow-[0_14px_32px_rgba(217,106,50,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-2 hover:shadow-[0_18px_42px_rgba(217,106,50,0.34)] sm:w-auto"
              >
                <span className="whitespace-nowrap">Мне нужна система</span>
                <ArrowRight className="h-5 w-5 flex-shrink-0" />
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
