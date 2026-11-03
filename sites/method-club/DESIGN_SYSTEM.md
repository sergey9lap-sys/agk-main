# DESIGN SYSTEM: МЕТОД:КЛУБ

Полная дизайн-система проекта. Все визуальные решения берутся отсюда.

---

## 1. Философия дизайна

### Ключевые принципы

**Премиальность**
- Тёмный фон (#040404) — ассоциация с роскошью, элитностью
- Золотые акценты — благородство, статус, ценность
- Много воздуха — не давим, даём пространство для восприятия

**Глубина**
- Стеклянные карточки (glass morphism) — создают слои
- Тени и подсветки — визуальная иерархия
- Blur-эффекты — ощущение объёма

**Читаемость**
- Контрастный текст на тёмном фоне
- Иерархия размеров (H1 >> H2 >> H3)
- Чёткая типографическая сетка

**Живость**
- Аккуратные анимации — сайт "дышит"
- Hover-эффекты — отклик на действия
- Плавные переходы — нет резкости

---

## 2. Цветовая палитра

### Фон

```css
--color-bg: #040404;
```

**Применение:**
- Основной фон всего сайта
- Фон для секций

**Tailwind:**
```jsx
bg-bg
```

---

### Текст

**Основной:**
```css
--color-text-primary: #FFFFFF;
```

**Вторичный (пониженная видимость):**
```css
--color-text-secondary: rgba(255, 255, 255, 0.7);
```

**Приглушённый (для подписей, мелкого текста):**
```css
--color-text-muted: rgba(255, 255, 255, 0.5);
```

**Tailwind:**
```jsx
text-text-primary      // Основной текст
text-text-secondary    // Вторичный
text-text-muted        // Приглушённый
```

---

### Акценты (золотой градиент)

```css
--color-gold-1: #CC9B59;
--color-gold-2: #E2C9A2;
--color-gold-3: #FFECD0;
--color-gold-4: #E0AF68;
```

**Градиент для кнопок и акцентов:**
```css
--gradient-gold: linear-gradient(135deg, #CC9B59, #E2C9A2, #FFECD0, #E0AF68);
```

**Применение:**
- Кнопки (CTA)
- Подчёркивания, акценты в тексте
- Иконки, декоративные элементы
- Подсветки (glow)

**Tailwind:**
```jsx
// Градиент
bg-gradient-to-r from-gold-1 via-gold-2 to-gold-4

// Отдельные цвета
text-gold-1
bg-gold-2
border-gold-3
```

---

### Карточки (glass morphism)

**Фон:**
```css
--card-bg: rgba(255, 255, 255, 0.08);
```

**Граница:**
```css
--card-border: rgba(255, 255, 255, 0.16);
```

**Тень:**
```css
--card-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
```

**Tailwind:**
```jsx
bg-card-bg border border-card-border shadow-card backdrop-blur-xl
```

**Пример карточки:**
```jsx
<div className="rounded-card bg-card-bg border border-card-border shadow-card backdrop-blur-xl p-6">
  {/* Контент */}
</div>
```

---

## 3. Типографика

### Шрифты

**Заголовки:**
```css
font-family: 'Steelfish', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

**Основной текст:**
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

**Tailwind:**
```jsx
font-heading    // Steelfish
font-sans       // Inter (default)
```

---

### Размеры

| Уровень | Размер (desktop) | Размер (mobile) | Line Height | Использование |
|---------|------------------|-----------------|-------------|---------------|
| H1 | 240px | 64px | 0.9 | Главный заголовок Hero |
| H2 | 80px | 48px | 0.95 | Заголовки секций |
| H3 | 36px | 28px | 1.1 | Подзаголовки, заголовки карточек |
| Price | 28px | 24px | 1.1 | Цены, важные цифры |
| Body | 16px | 16px | 1.5 | Основной текст |
| Small | 14px | 14px | 1.4 | Подписи, мелкий текст |

**Tailwind:**
```jsx
text-h1         // 240px (desktop)
text-h2         // 80px (desktop)
text-h3         // 36px
text-price      // 28px
text-body       // 16px
text-small      // 14px
```

**Адаптивность:**
```jsx
<h1 className="text-[64px] lg:text-h1">
  МЕТОД:КЛУБ
</h1>
```

---

### Вес шрифта

```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

**Tailwind:**
```jsx
font-normal      // 400
font-medium      // 500
font-semibold    // 600
font-bold        // 700
```

**Применение:**
- Заголовки (H1, H2, H3) — `font-heading` + `font-bold`
- Цены, акценты — `font-bold` (700)
- Основной текст — `font-normal` (400)
- Подзаголовки, лиды — `font-medium` (500)

---

## 4. Spacing & Layout

### Container

```jsx
// Ограничение ширины контента
max-width: 1200px;
margin: 0 auto;
padding: 0 1.5rem;
```

**Tailwind:**
```jsx
<div className="container mx-auto px-6 lg:px-8">
  {/* Контент */}
</div>
```

---

### Spacing Scale

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
--space-4xl: 8rem;    /* 128px */
```

**Применение:**
- Между секциями: `py-16 lg:py-24` (64-96px)
- Между элементами в секции: `space-y-8 lg:space-y-12` (32-48px)
- Между карточками: `gap-6 lg:gap-8` (24-32px)
- Внутри карточек: `p-6 lg:p-8` (24-32px)

---

### Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

**Tailwind (mobile-first):**
```jsx
<div className="text-sm md:text-base lg:text-lg">
  Адаптивный текст
</div>
```

---

## 5. Borders & Radius

### Border Radius

```css
--radius-card: 10px;
--radius-pill: 999px;
```

**Tailwind:**
```jsx
rounded-card    // 10px (карточки)
rounded-pill    // 999px (кнопки, теги)
rounded-lg      // 8px
rounded-xl      // 12px
```

---

### Borders

**Карточки:**
```jsx
border border-card-border
```

**Акцентные границы:**
```jsx
border-2 border-gold-2
```

---

## 6. Shadows & Effects

### Тени

**Карточки:**
```css
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
```

**Glow (для hover):**
```css
box-shadow: 0 0 40px rgba(255, 236, 208, 0.25);
```

**Tailwind:**
```jsx
shadow-card        // Тень карточки
shadow-soft-glow   // Мягкая подсветка
```

---

### Backdrop Blur

Для стеклянных карточек:

```jsx
backdrop-blur-xl    // 20px blur
backdrop-blur-2xl   // 40px blur
```

---

## 7. Компоненты

### Button

**Варианты:**

**Primary (основной CTA):**
```jsx
<button className="
  inline-flex items-center justify-center
  rounded-pill px-6 py-3
  text-sm font-semibold
  bg-gradient-to-r from-gold-1 via-gold-2 to-gold-4
  text-black
  shadow-soft-glow
  transition-transform duration-200
  hover:-translate-y-0.5
  focus-visible:ring-2 focus-visible:ring-gold-3
">
  Вступить в клуб
</button>
```

**Secondary:**
```jsx
<button className="
  inline-flex items-center justify-center
  rounded-pill px-6 py-3
  text-sm font-semibold
  border border-card-border
  bg-card-bg text-text-primary
  backdrop-blur-xl
  hover:bg-white/10
  transition-colors duration-200
">
  Узнать больше
</button>
```

**Ghost:**
```jsx
<button className="
  inline-flex items-center justify-center
  rounded-pill px-6 py-3
  text-sm font-semibold
  text-text-secondary
  hover:text-text-primary hover:bg-white/5
  transition-colors duration-200
">
  Отмена
</button>
```

---

### Card

**Базовая карточка:**
```jsx
<div className="
  rounded-card
  bg-card-bg
  border border-card-border
  shadow-card
  backdrop-blur-xl
  p-6 lg:p-8
  transition-transform duration-300
  hover:-translate-y-1
">
  {/* Контент */}
</div>
```

**Карточка тарифа (акцентная):**
```jsx
<div className="
  rounded-card
  bg-card-bg
  border-2 border-gold-2
  shadow-card shadow-soft-glow
  backdrop-blur-xl
  p-8 lg:p-10
  relative
">
  {/* Бейдж "Популярный" */}
  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
    <span className="
      inline-block px-4 py-1
      rounded-pill
      bg-gradient-to-r from-gold-1 to-gold-4
      text-xs font-semibold text-black
    ">
      Популярный
    </span>
  </div>
  
  {/* Контент */}
</div>
```

---

### Container (layout wrapper)

```jsx
<div className="container mx-auto px-6 lg:px-8">
  {/* Контент с ограничением ширины */}
</div>
```

---

## 8. Анимации

### Transitions

**Базовые:**
```jsx
transition-colors duration-200    // Цвет
transition-transform duration-300 // Трансформация
transition-all duration-200       // Всё сразу
```

---

### Hover-эффекты

**Карточки:**
```jsx
hover:-translate-y-1    // Подъём на 4px
hover:shadow-soft-glow  // Добавить glow
```

**Кнопки:**
```jsx
hover:-translate-y-0.5  // Лёгкий подъём
hover:shadow-lg         // Усилить тень
```

---

### Появление при скролле

Используем Framer Motion или Intersection Observer:

```jsx
// Fade-in + slide-up
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
viewport={{ once: true }}
```

---

### Prefers-reduced-motion

**Критически важно:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

В Tailwind:
```jsx
<div className="
  motion-safe:transition-transform
  motion-safe:hover:-translate-y-1
">
  {/* Анимация только если motion не reduce */}
</div>
```

---

## 9. Иконки и графика

### Иконки

Используем **Lucide React** (минималистичные, outline-стиль):

```bash
npm install lucide-react
```

Примеры:
```jsx
import { Check, ArrowRight, Users, Calendar } from 'lucide-react';

<Check className="w-5 h-5 text-gold-2" />
```

---

### Изображения

**Оптимизация:**
- WebP формат
- Next.js Image component
- Lazy loading

```jsx
import Image from 'next/image';

<Image
  src="/images/expert.webp"
  alt="Александра Горева-Куртышева"
  width={600}
  height={600}
  className="rounded-lg"
  loading="lazy"
/>
```

---

## 10. Accessibility

### Focus States

Всегда добавляем видимый focus:

```jsx
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-gold-3
focus-visible:ring-offset-2
focus-visible:ring-offset-bg
```

---

### Color Contrast

Минимальные требования WCAG AA:
- Обычный текст: 4.5:1
- Крупный текст (18px+): 3:1

Наша палитра:
- ✅ Белый (#FFFFFF) на тёмном (#040404) — 21:1 (отлично)
- ✅ Золотой градиент на тёмном — 7+:1 (хорошо)

---

### Semantic HTML

Всегда используем правильные теги:

```jsx
<header>   // Шапка
<nav>      // Навигация
<main>     // Основной контент
<section>  // Секции
<article>  // Статьи/карточки
<footer>   // Футер

<h1>, <h2>, <h3>  // Заголовки (иерархия)
<button>           // Кнопки (не div)
<a>                // Ссылки
```

---

## 11. Responsive Design

### Mobile-first подход

**Базовая вёрстка:**
```jsx
// Mobile (default)
<div className="text-sm p-4">

// Tablet (md:)
<div className="text-sm md:text-base md:p-6">

// Desktop (lg:)
<div className="text-sm md:text-base lg:text-lg lg:p-8">
```

---

### Сетки

**Desktop:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Карточки */}
</div>
```

**Адаптивные колонки:**
```jsx
// 1 колонка на mobile, 2 на tablet, 3 на desktop
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

## 12. Performance

### Fonts

**Preload критичных шрифтов:**
```html
<link
  rel="preload"
  href="/fonts/Steelfish-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**font-display: swap:**
```css
@font-face {
  font-family: 'Steelfish';
  src: url('/fonts/Steelfish-Regular.woff2') format('woff2');
  font-display: swap; /* Показывать fallback, пока не загрузится */
}
```

---

### Images

- WebP формат (меньший размер)
- `loading="lazy"` для всех картинок кроме первого экрана
- `priority` для Hero-изображений в Next.js Image

---

## 13. Референсы дизайна

### Вдохновение

- **Apple** — премиальность, минимализм, чистота
- **Stripe** — ясность, структура, градиенты
- **Linear** — тёмная тема, depth, motion
- **Vercel** — типографика, spacing, контраст

### НЕ вдохновляться

- ❌ Типичные инфобизнес-лендинги (Tilda-шаблоны)
- ❌ Яркие, кричащие цвета
- ❌ Агрессивные таймеры и попапы
- ❌ Перегруз анимациями

---

**Этот документ — источник истины для всех визуальных решений. При сомнениях — смотри сюда.**
