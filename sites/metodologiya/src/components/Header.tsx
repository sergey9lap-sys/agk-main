"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "О курсе", href: "#about" },
  { label: "Автор программы", href: "#author" },
  { label: "Для кого", href: "#about" },
  { label: "Программа", href: "#program" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Вопросы", href: "#faq" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (pathname === "/metodologiya/challenge") {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#080808]/88 shadow-[0_12px_34px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          : "bg-[#080808]/74 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-[72px]">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 font-sans text-[20px] font-extrabold tracking-tight text-text-primary lg:text-[24px]"
        >
          <span aria-hidden="true" className="relative h-11 w-[128px] flex-none lg:h-12 lg:w-[148px]">
            <Image
              src="/metodologiya/optimized/d9dde605571dd3.webp"
              alt=""
              fill
              sizes="148px"
              className="object-contain drop-shadow-[0_0_18px_rgba(214,188,128,0.24)]"
              priority
            />
          </span>
          <span className="header-script-word hidden sm:inline">Методология</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary transition-all hover:-translate-y-0.5 hover:text-orange-2"
            >
              {link.label}
            </a>
          ))}
          <a href="#pricing">
            <Button variant="primary" size="sm">
              Записаться
            </Button>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden -mr-2 rounded-full p-2 text-text-primary transition-colors hover:bg-orange-1/10"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-white/10 bg-[#080808]/96 backdrop-blur-xl"
          >
            <nav className="flex flex-col items-center gap-6 py-8 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary transition-all hover:text-orange-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="#pricing" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="lg">
                  Иду на курс
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
