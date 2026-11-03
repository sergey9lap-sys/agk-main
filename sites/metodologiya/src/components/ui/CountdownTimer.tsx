"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string;
  compact?: boolean;
}

export function CountdownTimer({ targetDate, compact = false }: CountdownTimerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  const timeUnits = [
    { value: timeLeft.days, label: "дней" },
    { value: timeLeft.hours, label: "часов" },
    { value: timeLeft.minutes, label: "минут" },
    { value: timeLeft.seconds, label: "секунд" },
  ];

  return (
    <div className={`flex items-center justify-center ${compact ? "gap-1.5 sm:gap-2" : "gap-2 sm:gap-4"}`}>
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div
            className={`flex items-center justify-center rounded-xl bg-orange-1 shadow-lg ${
              compact ? "h-10 w-10 sm:h-11 sm:w-11" : "h-14 w-14 sm:h-16 sm:w-16"
            }`}
          >
            <motion.span
              key={unit.value}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 4, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`font-heading font-black text-white ${compact ? "text-base sm:text-lg" : "text-xl sm:text-2xl"}`}
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.span>
          </div>
          <span className={`${compact ? "mt-0.5 text-[10px] sm:text-xs" : "mt-1 text-xs sm:text-sm"} font-medium text-text-muted`}>
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
