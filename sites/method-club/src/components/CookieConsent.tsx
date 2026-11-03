"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "agk-cookie-consent-method-club";
const POLICY_URL = "https://agkedu.getcourse.ru/personaldata";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(localStorage.getItem(STORAGE_KEY) !== "true");
    } catch {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      document.cookie = "agk_cookie_consent_method-club=accepted; Path=/; Max-Age=31536000; SameSite=Lax" + (location.protocol === "https:" ? "; Secure" : "");
      window.dispatchEvent(new Event("agk:cookie-consent"));
    } finally {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[10000] px-4 pb-4 pt-6 sm:bottom-5 sm:left-5 sm:right-auto sm:p-0">
      <section
        aria-label="Уведомление об использовании cookies"
        className="relative w-full max-w-[420px] rounded-[22px] border border-gold-2/20 bg-[#15110d] p-6 pr-12 text-white shadow-[0_24px_70px_rgba(0,0,0,0.42)] ring-1 ring-white/8 sm:p-7 sm:pr-12"
        role="dialog"
      >
        <button
          aria-label="Принять cookies и закрыть уведомление"
          className="absolute right-4 top-4 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/55 transition-colors duration-200 hover:bg-white/8 hover:text-white focus-ring"
          onClick={acceptCookies}
          type="button"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
        <p className="text-[14px] leading-[1.55] text-white/78">
          Продолжая использование сайта, я выражаю согласие на обработку моих
          персональных данных при помощи сервисов {typeof window !== "undefined" && (window as Window & {__AGK_EDITION__?:string}).__AGK_EDITION__ === "com" ? "Яндекс.Метрика и Meta Pixel" : "Яндекс.Метрика"}, подтверждаю,
          что ознакомлен с{" "}
          <a
            className="font-semibold text-gold-2 underline decoration-gold-2/45 underline-offset-4 transition-colors duration-200 hover:text-gold-1"
            href={POLICY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Политикой в отношении обработки персональных данных
          </a>{" "}
          и уведомлен об использовании файлов cookies.
        </p>
        <button
          className="mt-5 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-gold-1 via-gold-2 to-gold-4 px-6 text-[14px] font-semibold text-black shadow-[0_12px_28px_rgba(240,212,165,0.2)] transition-opacity duration-200 hover:opacity-90 focus-ring"
          onClick={acceptCookies}
          type="button"
        >
          Соглашаюсь
        </button>
      </section>
    </div>
  );
}
