# Animation System: МЕТОД:КЛУБ

Детальное описание системы анимаций проекта.

---

## Философия анимаций

### Принципы

**1. Subtle, не overwhelming**
- Анимации должны быть **заметными**, но не отвлекающими
- Цель — добавить "живость", а не создать цирк

**2. Performance-first**
- Только GPU-ускоренные свойства (`transform`, `opacity`)
- Избегаем анимаций `width`, `height`, `margin`, `padding` — они вызывают reflow

**3. Accessibility**
- Уважаем `prefers-reduced-motion`
- Если пользователь отключил анимации — сайт остаётся полностью функциональным

---

## 5 типов анимаций

### 1. Появление блоков при скролле (Scroll-triggered animations)

**Эффект:** Fade-in + лёгкий подъём (translate Y)

**Реализация (Framer Motion):**
```tsx
import { motion } from 'framer-motion';

export const ScrollReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
```

**Где применять:**
- Секции страницы (Hero, WhatIsClub, Pricing, etc.)
- Карточки тарифов
- Блоки контента

**Параметры:**
- `duration: 0.6s` — комфортная скорость
- `y: 20` — небольшой сдвиг вверх (не слишком драматично)
- `viewport: { once: true }` — анимация срабатывает 1 раз (не при каждом скролле)
- `amount: 0.2` — триггер, когда 20% элемента в viewport

---

### 2. Hover-эффекты на карточках и кнопках

**Эффект:**
- Лёгкий подъём (`translateY`)
- Мягкое свечение (glow via box-shadow)

**Реализация (Tailwind):**

**Карточка:**
```tsx
<div className="
  rounded-card
  bg-card-bg
  border border-card-border
  shadow-card
  backdrop-blur-xl
  
  transition-all duration-300 ease-out
  hover:-translate-y-1
  hover:shadow-soft-glow
  
  motion-safe:transition-transform
  motion-safe:hover:-translate-y-1
">
  {/* Контент */}
</div>
```

**Кнопка:**
```tsx
<button className="
  inline-flex items-center justify-center
  rounded-pill px-6 py-3
  bg-gradient-to-r from-gold-1 via-gold-2 to-gold-4
  text-black font-semibold
  
  transition-all duration-200
  hover:-translate-y-0.5
  hover:shadow-lg
  
  active:translate-y-0
  
  motion-safe:transition-transform
">
  Вступить в клуб
</button>
```

**Где применять:**
- Все карточки (тарифы, бонусы, FAQ items)
- Все кнопки (CTA, secondary)
- Интерактивные элементы

**Параметры:**
- Карточки: `-translate-y-1` (4px подъём)
- Кнопки: `-translate-y-0.5` (2px подъём, аккуратнее)
- `duration-200` для кнопок (быстро)
- `duration-300` для карточек (чуть плавнее)

---

### 3. Плавающие декоративные элементы

**Эффект:** Медленное, еле заметное движение вверх-вниз

**Реализация (CSS keyframes):**

```css
/* globals.css */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-slower {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-15px) translateX(5px);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 12s ease-in-out infinite;
}

/* Отключаем при prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .animate-float-slow,
  .animate-float-slower {
    animation: none;
  }
}
```

**Использование:**
```tsx
// Декоративные фоновые элементы (gradients, blobs)
<div className="
  absolute top-10 left-10
  w-64 h-64
  bg-gradient-to-br from-gold-1/20 to-gold-4/10
  rounded-full blur-3xl
  animate-float-slow
  pointer-events-none
">
</div>
```

**Где применять:**
- Фоновые декоративные элементы (gradient blobs)
- Подсветки за карточками
- НЕ применять к основному контенту (только декор)

**Параметры:**
- `8-12s` — очень медленно
- `translateY` не больше 15px — движение должно быть почти незаметным

---

### 4. Sticky CTA на мобилке

**Эффект:** Фиксированная кнопка внизу экрана (только на мобильных)

**Реализация:**

```tsx
export const StickyMobileCTA: React.FC = () => {
  return (
    <div className="
      fixed bottom-0 left-0 right-0
      p-4 pb-safe
      bg-bg/90 backdrop-blur-xl
      border-t border-card-border
      lg:hidden
      z-50
      
      motion-safe:animate-slide-up
    ">
      <a href={process.env.NEXT_PUBLIC_CLUB_YEAR_URL}>
        <Button variant="primary" className="w-full">
          Вступить в клуб
        </Button>
      </a>
    </div>
  );
};
```

**Анимация появления:**
```css
/* globals.css */
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
```

**Где применять:**
- Только на мобильных (`lg:hidden`)
- Появляется после прокрутки (можно добавить условие: показывать после Hero)

**Параметры:**
- `z-50` — поверх всего контента
- `backdrop-blur-xl` — размытие фона
- `pb-safe` — учёт safe area на iOS (для notch/home indicator)

---

### 5. Мягкий параллакс (только desktop)

**Эффект:** Фон/декор двигается медленнее контента при скролле

**Реализация (Framer Motion):**

```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

export const ParallaxSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollY } = useScroll();
  
  // Фон двигается на 30% медленнее
  const y = useTransform(scrollY, [0, 1000], [0, -300]);
  
  return (
    <section className="relative overflow-hidden">
      {/* Фоновый слой с параллаксом */}
      <motion.div
        style={{ y }}
        className="
          absolute inset-0
          bg-gradient-to-b from-gold-1/5 to-transparent
          -z-10
          hidden lg:block
        "
      />
      
      {/* Основной контент */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};
```

**Где применять:**
- Hero section (фоновые подсветки)
- Крупные секции с декоративными элементами
- **Только на desktop** (`hidden lg:block`)

**Параметры:**
- Коэффициент замедления: 0.3-0.5 (фон двигается на 30-50% медленнее)
- Избегать сильного параллакса — может вызвать motion sickness

---

## Prefers-reduced-motion

### Глобальное правило

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### В Tailwind

Используем `motion-safe:` и `motion-reduce:` префиксы:

```tsx
<div className="
  motion-safe:transition-transform
  motion-safe:hover:-translate-y-1
  motion-reduce:transform-none
">
  {/* Контент */}
</div>
```

### В Framer Motion

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
  animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
>
  {/* Контент */}
</motion.div>
```

---

## Performance Tips

### 1. Используем только GPU-ускоренные свойства

✅ **Хорошо (GPU):**
- `transform` (translate, scale, rotate)
- `opacity`

❌ **Плохо (CPU, вызывают reflow):**
- `width`, `height`
- `margin`, `padding`
- `left`, `top`, `right`, `bottom` (без `transform`)

### 2. `will-change` для сложных анимаций

Только для элементов, которые точно будут анимироваться:

```tsx
<div className="will-change-transform">
  {/* Элемент с частыми анимациями */}
</div>
```

**Важно:** Не злоупотреблять — `will-change` потребляет память.

### 3. `contain` для изоляции

Для секций с анимациями:

```css
.section {
  contain: layout style paint;
}
```

---

## Timing Functions

### Рекомендуемые easing

- **ease-out** — для появлений (элемент замедляется к концу)
- **ease-in-out** — для hover (плавное ускорение и замедление)
- **ease-in** — для исчезновений (элемент ускоряется к концу)

```tsx
transition={{ duration: 0.6, ease: 'easeOut' }}
```

### Кастомные cubic-bezier

```css
/* Премиальное, плавное движение */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Checklist анимаций

Перед запуском проверить:

- [ ] Все анимации уважают `prefers-reduced-motion`
- [ ] Нет анимаций `width`, `height`, `margin` (только `transform`, `opacity`)
- [ ] Плавающие элементы не отвлекают от основного контента
- [ ] Hover-эффекты работают только на desktop (на мобильных нет `:hover`)
- [ ] Параллакс только на desktop
- [ ] Sticky CTA не перекрывает важный контент
- [ ] Анимации не вызывают лаг (проверить на медленных устройствах)
- [ ] Нет "тряски" при наведении/скролле

---

**Этот документ — единственный источник правды по анимациям. При добавлении новых эффектов — обновляй его.**
