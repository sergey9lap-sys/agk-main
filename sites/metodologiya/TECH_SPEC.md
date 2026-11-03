# TECH SPEC: МЕТОД:КЛУБ

Техническая спецификация проекта. Архитектура, стек, паттерны, правила разработки.

---

## 1. Стек технологий

### Frontend
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript 5+**
- **Tailwind CSS 3+**

### Styling
- Tailwind CSS как основной инструмент стилизации
- CSS Modules для кастомных анимаций (если нужно)
- `globals.css` для глобальных стилей

### Fonts
- **Inter** — через Google Fonts (подключение в `<head>`)
- **Steelfish** — локально через `@font-face` из `/public/fonts/`

### Animations
- **Framer Motion** — для сложных анимаций (появление блоков, слайдеры)
- **CSS transitions** — для простых эффектов (hover, focus)
- **Intersection Observer API** — для триггера анимаций при скролле

### Icons
- **Lucide React** — минималистичные outline-иконки

### UI Components
- Кастомные компоненты (без UI-библиотек типа MUI, Chakra)
- Переиспользуемые компоненты в `/src/components/ui/`

---

## 2. Структура проекта

```
method-club/
├── public/
│   ├── fonts/                    # Steelfish шрифты
│   │   ├── Steelfish-Regular.woff2
│   │   ├── Steelfish-Bold.woff2
│   │   └── ...
│   └── images/                   # Изображения, иконки
│       ├── expert.webp
│       ├── bot-screenshot-1.png
│       └── ...
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Глобальные стили
│   │
│   ├── components/               # Переиспользуемые компоненты
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Container.tsx
│   │       └── ...
│   │
│   ├── sections/                 # Секции страницы
│   │   ├── Hero.tsx
│   │   ├── WhatIsClub.tsx
│   │   ├── BotShowcase.tsx
│   │   ├── Pricing.tsx
│   │   ├── Bonuses.tsx
│   │   ├── GiftCertificates.tsx
│   │   ├── FAQ.tsx
│   │   ├── ContactCTA.tsx
│   │   └── Footer.tsx
│   │
│   ├── lib/                      # Утилиты и хелперы
│   │   ├── utils.ts             # Общие утилиты (cn, formatPrice)
│   │   ├── animations.ts        # Конфиги анимаций
│   │   └── constants.ts         # Константы (цены, тексты)
│   │
│   └── types/                    # TypeScript типы
│       └── index.ts
│
├── docs/                         # Документация
├── .env.example                  # Пример env-файла
├── .env.local                    # Локальные env (gitignore)
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 3. Компонентная архитектура

### Принципы

**1. Разделение ответственности**
- UI-компоненты (`/components/ui/`) — переиспользуемые "кирпичики"
- Секции (`/sections/`) — полноценные блоки страницы
- Страницы (`/app/`) — композиция секций

**2. Props typing**
Всегда типизируем пропсы через TypeScript:

```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ ... }) => { ... }
```

**3. Composition over configuration**
Вместо 100 пропсов — используем composition:

```tsx
// ❌ Плохо
<Card title="..." description="..." buttonText="..." />

// ✅ Хорошо
<Card>
  <Card.Title>...</Card.Title>
  <Card.Description>...</Card.Description>
  <Card.Actions>
    <Button>...</Button>
  </Card.Actions>
</Card>
```

---

## 4. Styling Guidelines

### Tailwind-first подход

**Используем Tailwind для:**
- Цветов, spacing, typography
- Layout (flex, grid, container)
- Responsive (breakpoints)
- Базовых transitions

**Кастомный CSS для:**
- Сложных анимаций (keyframes)
- Backdrop filters (если Tailwind не хватает)
- Специфичных эффектов (например, gradient border tricks)

---

### Утилита `cn()` для слияния классов

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Использование:**
```tsx
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```

---

### Responsive design

**Mobile-first:**
```tsx
<div className="text-sm md:text-base lg:text-lg">
  {/* Mobile → Tablet → Desktop */}
</div>
```

**Breakpoints:**
- `sm:` — 640px+
- `md:` — 768px+
- `lg:` — 1024px+
- `xl:` — 1280px+
- `2xl:` — 1536px+

---

## 5. Анимации

### Система анимаций

**5 типов анимаций:**

#### 1. Появление блоков при скролле
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  {/* Контент */}
</motion.div>
```

#### 2. Hover-эффекты
```tsx
<div className="
  transition-all duration-300
  hover:-translate-y-1
  hover:shadow-soft-glow
  motion-safe:transition-transform
">
  {/* Контент */}
</div>
```

#### 3. Плавающие декоративные элементы
```css
/* globals.css */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.float-slow {
  animation: float 8s ease-in-out infinite;
}
```

#### 4. Sticky CTA (мобильные)
```tsx
<div className="
  fixed bottom-0 left-0 right-0
  p-4 pb-safe
  bg-bg/80 backdrop-blur-xl
  border-t border-card-border
  lg:hidden
  z-50
">
  <Button className="w-full">Вступить в клуб</Button>
</div>
```

#### 5. Параллакс (desktop only)
```tsx
import { useScroll, useTransform, motion } from 'framer-motion';

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 1000], [0, -200]);

<motion.div style={{ y }} className="hidden lg:block">
  {/* Фоновые элементы */}
</motion.div>
```

---

### Prefers-reduced-motion

**Критически важно:**

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**В Tailwind:**
```tsx
<div className="motion-safe:animate-fade-in">
  {/* Анимация только если motion НЕ reduce */}
</div>
```

**Framer Motion:**
```tsx
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
  animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
>
  {/* Контент */}
</motion.div>
```

---

## 6. Переменные окружения

### Файл `.env.example`

```bash
# Telegram
NEXT_PUBLIC_TG_SUPPORT_URL=https://t.me/your_bot

# Payment links
NEXT_PUBLIC_CLUB_MONTH_URL=https://agkedu.getcourse.ru/club-month
NEXT_PUBLIC_CLUB_YEAR_URL=https://agkedu.getcourse.ru/club-year

# Gift certificates
NEXT_PUBLIC_CERT_MONTH_URL=https://agkedu.getcourse.ru/cert-month
NEXT_PUBLIC_CERT_YEAR_URL=https://agkedu.getcourse.ru/cert-year

# Visioners
NEXT_PUBLIC_VISIONERS_APPLY_URL=https://agkedu.getcourse.ru/master-groop
```

### Использование в коде

```tsx
const telegramUrl = process.env.NEXT_PUBLIC_TG_SUPPORT_URL;

<a href={telegramUrl} target="_blank" rel="noopener noreferrer">
  Написать в Telegram
</a>
```

---

## 7. TypeScript Guidelines

### Типизация пропсов

```tsx
// ✅ Хорошо
type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={cn("card-base", className)}>{children}</div>;
};
```

### Использование `type` vs `interface`

- **`type`** — для props, unions, primitives
- **`interface`** — для объектов данных, API responses

```tsx
// type для props
type ButtonProps = {
  variant: 'primary' | 'secondary';
};

// interface для данных
interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}
```

### Избегаем `any`

```tsx
// ❌ Плохо
const handleClick = (data: any) => { ... }

// ✅ Хорошо
const handleClick = (data: MouseEvent<HTMLButtonElement>) => { ... }
```

---

## 8. Performance оптимизации

### Images

**Используем Next.js Image:**
```tsx
import Image from 'next/image';

<Image
  src="/images/expert.webp"
  alt="Александра Горева-Куртышева"
  width={600}
  height={600}
  priority={false} // true только для Hero
  loading="lazy"
  className="rounded-lg"
/>
```

### Fonts

**Preload критичных шрифтов:**
```tsx
// app/layout.tsx
<head>
  <link
    rel="preload"
    href="/fonts/Steelfish-Regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

### Code splitting

Next.js делает это автоматически, но можем добавить динамические импорты для тяжёлых компонентов:

```tsx
import dynamic from 'next/dynamic';

const BotShowcase = dynamic(() => import('@/sections/BotShowcase'), {
  loading: () => <p>Загрузка...</p>,
});
```

---

## 9. Accessibility (a11y)

### Semantic HTML

```tsx
// ✅ Хорошо
<header>
  <nav>...</nav>
</header>
<main>
  <section>...</section>
</main>
<footer>...</footer>

// ❌ Плохо
<div className="header">
  <div className="nav">...</div>
</div>
```

### Keyboard navigation

```tsx
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Нажми меня
</button>
```

### Focus states

Всегда видимы:

```tsx
<button className="
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-gold-3
  focus-visible:ring-offset-2
  focus-visible:ring-offset-bg
">
  Кнопка
</button>
```

### ARIA labels

```tsx
<button aria-label="Закрыть модальное окно">
  <X className="w-5 h-5" />
</button>
```

---

## 10. Git workflow

### Branches

- `main` — production-ready код
- `develop` — разработка
- `feature/название` — фичи
- `fix/название` — багфиксы

### Commits

Используем Conventional Commits:

```bash
feat: добавить блок Hero
fix: исправить адаптивность тарифов
docs: обновить README
style: поправить отступы в Card
refactor: вынести константы цен в lib/constants
perf: оптимизировать изображения
```

---

## 11. Testing (опционально)

Если нужны тесты:

### Unit tests
- **Vitest** для юнит-тестов компонентов
- **React Testing Library** для тестирования UI

### E2E tests
- **Playwright** для end-to-end тестирования

Но на начальном этапе тесты не критичны — фокус на быструю доставку MVP.

---

## 12. Deployment

### Рекомендация: Vercel

Next.js создан Vercel, поэтому деплой туда — идеален:

```bash
# Установить Vercel CLI
npm i -g vercel

# Задеплоить
vercel
```

### Альтернативы
- **Netlify**
- **Railway**
- **Самостоятельный сервер** (VPS + Docker)

---

## 13. Code Style & Linting

### ESLint

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

`.eslintrc.json`:
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

### Prettier

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

`.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 14. Checklist перед запуском

### Функциональность
- [ ] Все блоки реализованы и работают
- [ ] Ссылки ведут на правильные env-переменные
- [ ] Формы (если есть) валидируются
- [ ] Адаптивность работает на всех разрешениях

### Performance
- [ ] Lighthouse Performance > 90
- [ ] Изображения оптимизированы (WebP, lazy loading)
- [ ] Шрифты preload
- [ ] Нет лишних зависимостей

### Accessibility
- [ ] Lighthouse Accessibility > 95
- [ ] Все анимации уважают `prefers-reduced-motion`
- [ ] Keyboard navigation работает
- [ ] Focus states видимы

### SEO
- [ ] Title и meta description настроены
- [ ] Open Graph теги для шеринга
- [ ] Canonical URL
- [ ] Robots.txt и sitemap (если нужно)

### Контент
- [ ] Все тексты сверены с текущим сайтом
- [ ] Цены актуальные (5000, 50000, 550000)
- [ ] Реквизиты корректные
- [ ] Ссылки на оферту и политику работают

---

**Этот документ — технический фундамент проекта. При принятии архитектурных решений — смотри сюда.**
