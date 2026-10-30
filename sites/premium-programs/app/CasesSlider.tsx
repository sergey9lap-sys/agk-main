"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type CaseItem = {
  name: string;
  role: string;
  lead?: string;
  result?: string;
  points: string[];
  image?: string;
};

type CasesSliderProps = {
  cases: CaseItem[];
};

export default function CasesSlider({ cases }: CasesSliderProps) {
  const [active, setActive] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const current = cases[active];

  const next = () => setActive((index) => (index + 1) % cases.length);
  const prev = () => setActive((index) => (index - 1 + cases.length) % cases.length);

  const currentImageFailed = current.image ? failedImages.has(current.image) : true;
  const shouldContainImage = true;

  const markImageFailed = (image: string) => {
    setFailedImages((failed) => {
      const nextFailed = new Set(failed);
      nextFailed.add(image);
      return nextFailed;
    });
  };

  const renderResult = (text: string) => {
    const resultPattern = /((?:\d[\d ]*|[0-9]+,[0-9]+ млн) ?(?:Р|₽|рублей)|за месяц)/g;
    const parts = text.split(resultPattern);

    return parts.map((part, index) =>
      /(?:\d[\d ]*|[0-9]+,[0-9]+ млн) ?(?:Р|₽|рублей)|за месяц/.test(part) ? (
        <span className="nowrap" key={`${part}-${index}`}>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="case-slider" data-case-slider>
      <div className="case-stage">
        <AnimatePresence mode="wait">
          <motion.article
            className="case-feature"
            key={current.name}
            initial={{ opacity: 0, y: 34, rotate: -1.5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: -28, rotate: 1.5, scale: 0.98 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="case-photo">
              {current.image && !currentImageFailed ? (
                <img
                  className={shouldContainImage ? "is-contain" : undefined}
                  src={current.image}
                  alt={current.name}
                  onError={() => markImageFailed(current.image as string)}
                />
              ) : (
                <div className="case-photo-fallback" aria-hidden="true">
                  {current.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}
            </div>
            <div className="case-content">
              <div className="case-count">
                <span>{String(active + 1).padStart(2, "0")}</span>
                <i>/ {String(cases.length).padStart(2, "0")}</i>
              </div>
              <h3>{current.name}</h3>
              <p className="case-role">{current.role}</p>
              {current.lead ? <p className="case-lead">{current.lead}</p> : null}
              <ul>
                {current.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {current.result ? <strong>{renderResult(current.result)}</strong> : null}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="case-side">
        <div className="case-controls" aria-label="Навигация по кейсам">
          <button type="button" onClick={prev} aria-label="Предыдущий кейс">
            ←
          </button>
          <button type="button" onClick={next} aria-label="Следующий кейс">
            →
          </button>
        </div>
        <div className="case-dots">
          {cases.map((item, index) => (
            <button
              className={index === active ? "is-active" : ""}
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Показать кейс ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
