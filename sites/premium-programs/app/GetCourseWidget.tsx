"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type GetCourseWidgetProps = {
  widgetId: string;
  className?: string;
};

function getWidgetUrl(widgetId: string) {
  const params = new URLSearchParams(window.location.search);

  params.set("id", widgetId);
  params.set("ref", document.referrer);
  params.set("loc", window.location.href);

  try {
    if (window.clrtQueryData) {
      params.set("clrtQueryData", JSON.stringify(window.clrtQueryData));
    }
  } catch {}

  return `https://agkedu.getcourse.ru/pl/lite/widget/widget?${params.toString()}`;
}

declare global {
  interface Window {
    clrtQueryData?: unknown;
  }
}

export default function GetCourseWidget({ widgetId, className = "" }: GetCourseWidgetProps) {
  const [widgetUrl, setWidgetUrl] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const isOpen = Boolean(widgetUrl);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setWidgetUrl("");
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        className={`gc-widget-slot ${className}`}
        disabled={!widgetId}
        aria-describedby={!widgetId ? "payment-pending" : undefined}
        onClick={() => setWidgetUrl(getWidgetUrl(widgetId))}
        type="button"
        aria-haspopup="dialog"
      >
        <span className="gc-widget-label">Получить доступ</span>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
      </button>
      {!widgetId ? <p id="payment-pending" className="payment-pending" role="status">Форма оплаты пока не подключена.</p> : null}

      {isMounted && isOpen
        ? createPortal(
            <div className="gc-modal" onMouseDown={() => setWidgetUrl("")}>
              <div
                className="gc-modal-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Оплата тарифа"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <button className="gc-modal-close" onClick={() => setWidgetUrl("")} type="button" aria-label="Закрыть">
                  ×
                </button>
                <iframe className="gc-modal-frame" src={widgetUrl} title="Форма оплаты тарифа" />
              </div>
            </div>,
          document.body,
          )
        : null}
    </>
  );
}
