import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "cream" | "secondary" | "ghost";
type ButtonSize = "default" | "lg" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-[linear-gradient(135deg,#F07830_0%,#FFB060_100%)]",
    "text-[#090909] font-semibold uppercase",
    "shadow-button",
    "motion-safe:hover:shadow-button-hover motion-safe:hover:-translate-y-0.5",
    "motion-safe:active:translate-y-0 motion-safe:active:scale-100",
    "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out"
  ),
  cream: cn(
    "border border-white/12",
    "bg-[#151515] text-text-primary font-semibold uppercase",
    "shadow-[0_14px_34px_rgba(0,0,0,0.18)]",
    "motion-safe:hover:border-orange-1/45 motion-safe:hover:bg-[#1C1C1C] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-card-hover",
    "motion-safe:active:translate-y-0 motion-safe:active:scale-100",
    "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out"
  ),
  secondary: cn(
    "border border-orange-1/55",
    "bg-orange-5 text-orange-2 font-semibold uppercase",
    "motion-safe:hover:bg-orange-1 motion-safe:hover:text-[#090909] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-button",
    "motion-safe:active:translate-y-0",
    "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out"
  ),
  ghost: cn(
    "text-text-secondary font-semibold",
    "motion-safe:hover:text-orange-3",
    "motion-safe:transition-colors motion-safe:duration-200"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-9 py-[18px] text-base",
  lg: "px-11 py-5 text-lg",
  sm: "px-7 py-3.5 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-[12px] font-semibold tracking-wide cursor-pointer",
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
