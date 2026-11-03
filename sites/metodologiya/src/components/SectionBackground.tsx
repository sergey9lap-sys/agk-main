type SectionBackgroundProps = {
  src: string;
  variant: "dark" | "light" | "orange";
  position?: string;
  className?: string;
};

const overlays = {
  dark: "bg-[linear-gradient(rgba(8,8,8,0.74),rgba(8,8,8,0.82))]",
  orange:
    "bg-[linear-gradient(135deg,rgba(8,8,8,0.88),rgba(21,21,21,0.74)),radial-gradient(circle_at_78%_16%,rgba(240,120,48,0.18),transparent_32rem)]",
  light: "bg-[linear-gradient(rgba(8,8,8,0.78),rgba(14,14,14,0.86))]",
};

export function SectionBackground({
  variant,
}: SectionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 ${overlays[variant]}`}
    />
  );
}
