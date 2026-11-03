"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Method Club global error:", error);
  }, [error]);

  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background:
            "radial-gradient(circle at top left, rgba(204, 155, 89, 0.14), transparent 24%), linear-gradient(180deg, #13100d 0%, #0e0e0e 34%, #090807 100%)",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ maxWidth: "560px" }}>
          <div
            style={{
              marginBottom: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#f0d4a5",
            }}
          >
            Метод:Клуб
          </div>
          <h1 style={{ margin: "0 0 12px", fontSize: "32px", lineHeight: 1.05 }}>
            Сайт временно не открылся
          </h1>
          <p style={{ margin: "0 0 18px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
            Это может произойти из-за старого кеша или ошибки загрузки клиентских файлов.
            Попробуйте обновить страницу.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                border: "1px solid rgba(240, 212, 165, 0.4)",
                borderRadius: "999px",
                padding: "12px 18px",
                background: "rgba(240, 212, 165, 0.08)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Повторить загрузку
            </button>
            <a
              href="/method-club/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(255, 255, 255, 0.16)",
                borderRadius: "999px",
                padding: "12px 18px",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              На главную
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
