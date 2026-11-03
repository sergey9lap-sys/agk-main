import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "lg" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-gradient-to-r from-gold-1 via-gold-2 to-gold-4 text-black font-semibold",
    "shadow-[0_16px_40px_rgba(240,212,165,0.18)]",
    "motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-[0_18px_46px_rgba(240,212,165,0.24)]",
    "motion-safe:active:translate-y-0 motion-safe:active:scale-100",
    "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out"
  ),
  secondary: cn(
    "border border-white/14",
    "bg-white/6 text-text-primary backdrop-blur-xl",
    "motion-safe:hover:bg-white/10 motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-gold-2/40",
    "motion-safe:active:translate-y-0",
    "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out"
  ),
  ghost: cn(
    "text-text-secondary",
    "motion-safe:hover:text-text-primary motion-safe:hover:bg-white/5",
    "motion-safe:transition-colors motion-safe:duration-200"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-7 py-3.5 text-sm rounded-[14px]",
  lg: "px-9 py-4 text-base rounded-[16px]",
  sm: "px-5 py-2.5 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          "font-semibold",
          "focus-ring",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
