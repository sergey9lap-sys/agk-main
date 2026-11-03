import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

type CardVariant = "default" | "accent";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  default: "border-white/12",
  accent: "border-accent-blue/30 shadow-soft-glow",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group",
          "rounded-card",
          "bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))]",
          "border",
          "shadow-card",
          "backdrop-blur-xl",
          "p-4 sm:p-5 lg:p-6",
          "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
          "motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01] motion-safe:hover:border-accent-blue/20 motion-safe:hover:shadow-soft-glow",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
