import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

type CardVariant = "default" | "accent";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  default: "border-card-border",
  accent: "border border-orange-1/50 shadow-card-hover",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group",
          "relative overflow-hidden",
          "rounded-[16px]",
          "bg-card-bg/95",
          "border",
          "shadow-card",
          "p-5 lg:p-6",
          "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
          "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-orange-1 before:to-orange-3",
          "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card-hover motion-safe:hover:border-orange-1/55",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
