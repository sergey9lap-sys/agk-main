"use client";

import { Button } from "@/components/ui/Button";
import { PAYMENT_LINKS } from "@/lib/constants";
import { useEffect, useState } from "react";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-card-border bg-bg/90 p-3 pb-safe backdrop-blur-xl motion-safe:animate-slide-up lg:hidden">
      <Button
        variant="primary"
        className="h-14 w-full text-base"
        onClick={() => {
          window.location.assign(PAYMENT_LINKS.year);
        }}
      >
        Вступить в клуб
      </Button>
    </div>
  );
}
