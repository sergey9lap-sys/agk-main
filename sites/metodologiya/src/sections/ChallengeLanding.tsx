"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Flame, Gift, X } from "lucide-react";

const CHALLENGE_WIDGET_ID = "1606344";

const challengeItems = [
  "Библиотека материалов",
  "2 недели задания в чате участников",
  "Комьюнити экспертов и предпринимателей",
];

export function ChallengeLanding() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [widgetHeight, setWidgetHeight] = useState(680);

  const getWidgetUrl = () => {
    if (typeof window === "undefined") {
      return `https://agkedu.getcourse.ru/pl/lite/widget/widget?id=${CHALLENGE_WIDGET_ID}`;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("id", CHALLENGE_WIDGET_ID);
    params.set("ref", document.referrer);
    params.set("loc", window.location.href);

    return `https://agkedu.getcourse.ru/pl/lite/widget/widget?${params.toString()}`;
  };

  useEffect(() => {
    if (!isWidgetOpen) {
      return;
    }

    setWidgetHeight(680);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://agkedu.getcourse.ru") {
        return;
      }

      const height = Number(event.data?.height);
      if (height > 0) {
        setWidgetHeight(Math.max(height, 680));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isWidgetOpen]);

  return (
    <main className="min-h-screen bg-card-bg px-4 py-8 text-text-primary sm:px-6 lg:flex lg:items-center lg:py-12">
      <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border-2 border-white/35 bg-card-bg shadow-[0_18px_46px_rgba(85,11,24,0.18)]">
        <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-5 sm:p-7 lg:p-9">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-card-bg px-4 py-2 text-sm font-black uppercase tracking-wide text-white">
              <Flame className="h-4 w-4" />
              Челлендж
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {challengeItems.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-orange-1/25 bg-bg p-3 sm:p-4"
                >
                  <Check className="mb-2 h-4 w-4 text-orange-2" />
                  <p className="text-sm font-bold leading-snug text-text-primary sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-2xl font-black leading-tight text-text-primary lg:text-3xl">
              Разработаете свою продуктовую линейку и распакуете свою экспертность
            </p>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-orange-1/30 bg-card-bg p-4 shadow-[0_8px_24px_rgba(40,25,10,0.06)]">
              <Gift className="mt-1 h-5 w-5 flex-shrink-0 text-orange-2" />
              <p className="text-sm font-bold leading-relaxed text-text-primary sm:text-base">
                Бонус на выбор: 1 месяц клуба или сессия с методологом команды/маркетологом
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[linear-gradient(145deg,#151515,#F07830)] p-5 text-white sm:p-7 lg:p-9">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-white/75">
              Стоимость участия
            </p>
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <span className="font-heading text-4xl font-black leading-none lg:text-5xl">
                5 900 ₽
              </span>
              <span className="text-xl font-bold leading-none text-white/58 line-through decoration-2">
                19 900 ₽
              </span>
            </div>
            <button
              type="button"
              className="mt-7 inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-[12px] bg-orange-1 px-6 py-3 text-center text-sm font-black uppercase tracking-wide text-[#090909] shadow-[0_14px_32px_rgba(217,106,50,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-2 hover:shadow-[0_18px_42px_rgba(217,106,50,0.34)]"
              onClick={() => setIsWidgetOpen(true)}
            >
              Записаться на челлендж
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {isWidgetOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Челлендж за 5 900 ₽"
          onClick={() => setIsWidgetOpen(false)}
        >
          <div
            className="relative h-[min(760px,92vh)] w-full max-w-[560px] overflow-hidden rounded-2xl bg-card-bg shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-orange-1/20 px-4 py-3">
              <p className="pr-4 text-sm font-bold uppercase tracking-wide text-text-primary">
                Челлендж за 5 900 ₽
              </p>
              <button
                type="button"
                aria-label="Закрыть"
                onClick={() => setIsWidgetOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-1 text-[#090909] transition-colors hover:bg-orange-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[calc(100%-65px)] overflow-y-auto">
              <iframe
                src={getWidgetUrl()}
                title="Челлендж за 5 900 ₽"
                className="w-full border-0"
                style={{ height: `${widgetHeight}px` }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
