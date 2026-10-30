"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionCtaProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

export default function MotionCta({
  href = "#tariffs",
  className = "",
  children,
  ariaLabel,
}: MotionCtaProps) {
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      className={`btn ${className}`}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <span>{children}</span>
      <i aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></i>
    </motion.a>
  );
}
