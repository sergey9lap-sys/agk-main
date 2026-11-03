"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "О клубе", href: "/method-club/#about" },
  { label: "Автор", href: "/method-club/#author" },
  { label: "Тарифы", href: "/method-club/#pricing" },
  { label: "Вопросы", href: "/method-club/#faq" },
  { label: "Контакты", href: "/method-club/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#11100d]/88 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.28)]"
          : "bg-[linear-gradient(180deg,rgba(25,19,14,0.94),rgba(17,16,13,0.76))]"
      }`}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Logo */}
        <a
          href="/method-club/"
          className="gold-gradient-text font-heading text-[20px] tracking-[0.06em] uppercase sm:text-[22px] lg:text-[26px] lg:tracking-[0.08em]"
        >
          МЕТОД:КЛУБ
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-white transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
          <a href="/method-club/#pricing">
            <Button variant="primary" size="sm">
              Вступить
            </Button>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-primary p-2 -mr-2"
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
            className="md:hidden overflow-hidden bg-bg/95 backdrop-blur-2xl border-b border-white/10"
          >
            <nav className="flex flex-col items-center gap-6 py-8 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-white transition-colors text-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="/method-club/#pricing" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="lg">
                  Вступить в клуб
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
