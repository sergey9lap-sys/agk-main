"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ReviewCarouselItem {
  title: string;
  subtitle?: string;
  imagePath?: string;
  fallbackText?: string;
}

interface ReviewCarouselProps {
  id?: string;
  title: string;
  eyebrow?: string;
  items: ReviewCarouselItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

function ReviewVisual({ item }: { item: ReviewCarouselItem }) {
  const [isBroken, setIsBroken] = useState(false);

  if (item.imagePath && !isBroken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.imagePath}
        alt={item.title}
        className="h-auto max-h-[620px] w-full object-contain object-center lg:max-h-[560px]"
        onError={() => setIsBroken(true)}
      />
    );
  }

  return (
    <div className="flex h-full min-h-[420px] flex-col justify-between rounded-[28px] bg-[linear-gradient(180deg,rgba(44,44,48,0.96),rgba(22,22,25,0.98))] p-6">
      <div>
        <div className="mb-5 flex items-center gap-3 text-[13px] text-[#bb57e8]">
          <span>Переслано от:</span>
          <span className="font-semibold">{item.title}</span>
        </div>
        <p className="whitespace-pre-line text-lg leading-[1.55] text-white/92">
          {item.fallbackText ||
            "Сюда будет подставлен реальный отзыв из Telegram после загрузки изображения в public/images."}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-white/55">
        <span>{item.subtitle || "Method Club"}</span>
        <span>12:07</span>
      </div>
    </div>
  );
}

export function ReviewCarousel({
  id,
  title,
  eyebrow,
  items,
  ctaLabel,
  ctaHref,
}: ReviewCarouselProps) {
  const safeItems = useMemo(
    () =>
      items.length
        ? items
        : [{ title: "Отзыв", fallbackText: "Добавьте отзывы в public/images." }],
    [items]
  );
  const [index, setIndex] = useState(0);

  const current = safeItems[index];
  const canLoop = safeItems.length > 1;
  const headingId = id ? `${id}-heading` : undefined;

  const goPrev = () => {
    if (!canLoop) return;
    setIndex((prev) => (prev - 1 + safeItems.length) % safeItems.length);
  };

  const goNext = () => {
    if (!canLoop) return;
    setIndex((prev) => (prev + 1) % safeItems.length);
  };

  return (
    <section id={id} aria-labelledby={headingId} className="bg-bg py-10 lg:py-14">
      <Container>
        <div className="mx-auto max-w-[840px]">
          <div className="mb-6 flex flex-col gap-4 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {eyebrow ? (
                <p className="mb-4 text-xs uppercase tracking-[0.24em] text-gold-2">
                  {eyebrow}
                </p>
              ) : null}
              <h2 id={headingId} className="section-title uppercase">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-2.5 self-start rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-2 shadow-[0_16px_28px_rgba(0,0,0,0.16)] lg:self-auto">
              <button
                type="button"
                onClick={goPrev}
                disabled={!canLoop}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-gold-2/20 bg-white/[0.04] text-white transition-all duration-200",
                  canLoop
                    ? "hover:-translate-y-0.5 hover:border-gold-2/50 hover:bg-gold-2/10 hover:text-gold-2"
                    : "cursor-not-allowed opacity-40"
                )}
                aria-label="Предыдущий отзыв"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="min-w-[68px] text-center text-sm text-text-secondary">
                {index + 1} / {safeItems.length}
              </div>
              <button
                type="button"
                onClick={goNext}
                disabled={!canLoop}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-gold-2/20 bg-white/[0.04] text-white transition-all duration-200",
                  canLoop
                    ? "hover:-translate-y-0.5 hover:border-gold-2/50 hover:bg-gold-2/10 hover:text-gold-2"
                    : "cursor-not-allowed opacity-40"
                )}
                aria-label="Следующий отзыв"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-2.5 shadow-card backdrop-blur-xl lg:max-w-[760px] lg:p-3"
          >
            <div className="overflow-hidden rounded-[22px] border border-white/8 bg-black/35">
                <ReviewVisual item={current} />
            </div>

            {ctaLabel && ctaHref ? (
              <div className="mt-5 flex justify-center">
                <a href={ctaHref}>
                  <Button variant="primary">{ctaLabel}</Button>
                </a>
              </div>
            ) : null}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
