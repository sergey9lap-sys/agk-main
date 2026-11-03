"use client";

import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/metodologiya/challenge") {
        setIsVisible(false);
        return;
      }

      // Show after scrolling past hero, hide when at pricing section
      const pricingSection = document.getElementById("pricing");
      const pricingTop = pricingSection?.getBoundingClientRect().top ?? Infinity;
      
      setIsVisible(window.scrollY > 500 && pricingTop > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname === "/metodologiya/challenge") {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-orange-1/35 bg-bg/95 p-4 pb-safe shadow-[0_-14px_34px_rgba(58,0,12,0.12)] backdrop-blur-xl motion-safe:animate-slide-up lg:hidden">
      <div>
        <a href="#pricing" className="block w-full">
          <Button variant="primary" className="w-full">
            Записаться
          </Button>
        </a>
      </div>
    </div>
  );
}
