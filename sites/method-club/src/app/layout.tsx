import { Manrope, Playfair_Display_SC } from "next/font/google";
import "@/styles/globals.css";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { Header } from "@/components/Header";
import { CookieConsent } from "@/components/CookieConsent";
import { siteMetadata } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

const playfair = Playfair_Display_SC({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bootScript = `
    (() => {
      const fallbackId = "method-club-boot-fallback";
      const rootId = "method-club-app-shell";

      const showFallback = () => {
        const fallback = document.getElementById(fallbackId);
        if (fallback) fallback.hidden = false;
      };

      const hideFallback = () => {
        const fallback = document.getElementById(fallbackId);
        if (fallback) fallback.hidden = true;
      };

      const markReady = () => {
        const root = document.getElementById(rootId);
        if (root && root.childElementCount > 0) hideFallback();
      };

      window.addEventListener("load", markReady, { once: true });
      document.addEventListener("DOMContentLoaded", markReady, { once: true });

      window.addEventListener("error", (event) => {
        const target = event.target;
        const source =
          target instanceof HTMLScriptElement || target instanceof HTMLLinkElement
            ? target.src || target.href
            : "";

        if (source && /\\/_next\\/static\\/|\\/fonts\\//.test(source)) {
          showFallback();
        }
      }, true);

      window.addEventListener("unhandledrejection", (event) => {
        const reason = event.reason;
        const message =
          typeof reason === "string"
            ? reason
            : reason && typeof reason.message === "string"
              ? reason.message
              : String(reason ?? "");

        if (/ChunkLoadError|Loading chunk|CSS_CHUNK_LOAD_FAILED|hydration|Hydration/i.test(message)) {
          showFallback();
        }
      });

      setTimeout(() => {
        const root = document.getElementById(rootId);
        if (!root || root.childElementCount === 0) {
          showFallback();
        }
      }, 4000);
    })();
  `;

  return (
    <html lang="ru">
      <head>
        <style>{`
          html {
            background: #0e0e0e;
            color: #ffffff;
          }

          body {
            margin: 0;
            min-height: 100vh;
            background:
              radial-gradient(circle at top left, rgba(204, 155, 89, 0.14), transparent 24%),
              radial-gradient(circle at top right, rgba(226, 201, 162, 0.08), transparent 18%),
              linear-gradient(180deg, #13100d 0%, #0e0e0e 34%, #090807 100%);
            color: #ffffff;
          }

          #method-club-boot-fallback {
            position: fixed;
            inset: 0;
            z-index: 9999;
            padding: 24px;
            background:
              radial-gradient(circle at top left, rgba(204, 155, 89, 0.18), transparent 24%),
              linear-gradient(180deg, #13100d 0%, #0e0e0e 34%, #090807 100%);
            color: #ffffff;
          }

          #method-club-boot-fallback[hidden] {
            display: none;
          }

          #method-club-boot-fallback a {
            color: #f0d4a5;
          }
        `}</style>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        
      </head>
      <body className={`${manrope.variable} ${playfair.variable} font-sans`}>
        
        <div id="method-club-app-shell">
          <Header />
          {children}
          <StickyMobileCTA />
          <CookieConsent />
        </div>
        <div id="method-club-boot-fallback" hidden>
          <div
            style={{
              margin: "0 auto",
              maxWidth: "560px",
              paddingTop: "18vh",
              fontFamily: "var(--font-manrope), system-ui, sans-serif",
            }}
          >
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
              Страница загрузилась с ошибкой
            </h1>
            <p style={{ margin: "0 0 18px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
              Обычно это связано со старым кешем браузера или сбоем загрузки ассетов.
              Попробуйте обновить страницу.
            </p>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              <a href="">Обновить страницу</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
