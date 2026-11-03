"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cleanupHeadings: (() => void) | null = null;

    const start = async () => {
      const [{ default: Lenis }, { gsap }, { default: SplitType }] =
        await Promise.all([import("lenis"), import("gsap"), import("split-type")]);

      lenis = new Lenis({
        duration: 1.08,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.82,
        touchMultiplier: 1.08,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      const headings = Array.from(
        document.querySelectorAll<HTMLElement>("h1, h2")
      ).filter((heading) => heading.textContent && heading.offsetParent !== null);

      const splits = headings.map(
        (heading) => new SplitType(heading, { types: "lines", lineClass: "split-line" })
      );

      gsap.set(".split-line", {
        yPercent: 110,
        opacity: 0,
        rotateX: -24,
        transformOrigin: "left bottom",
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const lines = entry.target.querySelectorAll(".split-line");
            gsap.to(lines, {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.78,
              ease: "power3.out",
              stagger: 0.08,
              delay: entry.target.tagName === "H1" ? 0.12 : 0,
            });
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.24, rootMargin: "0px 0px -8% 0px" }
      );

      headings.forEach((heading) => {
        observer.observe(heading);
      });

      cleanupHeadings = () => {
        observer.disconnect();
        splits.forEach((split) => split.revert());
      };
    };

    start();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      cleanupHeadings?.();
      lenis?.destroy();
    };
  }, []);

  return null;
}
