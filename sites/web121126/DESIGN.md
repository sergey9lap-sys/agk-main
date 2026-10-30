---
name: AGK — Strategy Folio
description: Фактурный navy, приглушённое металлическое золото, коралловые действия и прозрачные винные книги.
colors:
  action: "#ff624a"
  navy: "#0b162a"
  paper: "#d4af37"
  ink: "#172039"
  gold: "#f0d4a5"
  gold-surface: "#d4af37"
  line: "#a68a48"
  cream: "#f7f4eb"
  card: "#1c2a4a"
  white: "#fff"
  warm-region: "#d4af37"
  card-line: "#8d794f"
  form-line: "#9d865d"
  input-surface: "#11192c"
  field-line: "#9d927b"
  placeholder: "#c6baa4"
  form-muted: "#ded2ba"
  program-muted: "#394056"
  preview-slate: "#252c40"
  preview-line: "#aa8b4f"
  hero-end: "#252c3d"
  texture-overlay: "#10162e65"
  card-overlay: "#26314db8"
  quote-surface: "#252c4066"
typography:
  display:
    fontFamily: "WebDisplay, Georgia, serif"
    fontSize: "clamp(42px,4vw,58px)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "0.005em"
  headline:
    fontFamily: "WebDisplay, Georgia, serif"
    fontSize: "44px"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "0.005em"
  title:
    fontFamily: "WebDisplay, Georgia, serif"
    fontSize: "25px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.005em"
  continuation:
    fontFamily: "WebText, Arial, sans-serif"
    fontSize: "23px"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "WebText, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  final-heading:
    fontFamily: "WebText, Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 650
    lineHeight: 1.35
    letterSpacing: "0"
  action:
    fontFamily: "WebText, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.35
rounded:
  field: "24px"
  surface: "24px"
  action: "24px"
spacing:
  field-gap: "12px"
  block-gap: "24px"
  row-padding: "12px 20px"
  panel-padding: "32px"
  action-gap: "36px"
  section-desktop: "64px"
  section-mobile: "48px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.navy}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "12px 48px 12px 24px"
    width: "320px"
    height: "64px"
  input:
    backgroundColor: "{colors.input-surface}"
    textColor: "{colors.cream}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    height: "48px"
---

# Design System: AGK — Strategy Folio

## Overview

**Creative North Star: "Strategy Folio"**

Деловой редакционный лист Академии: фактурный navy #0b162a, клубное градиентное золото, карточки #1c2a4a, светлый текст #f7f4eb и коралловый акцент действия #ff624a. V14 заменяет однотонные золотые регионы V13 точным градиентом пользовательского архива; геометрия и более свободный ритм V13 сохранены; hero выровнен по центру с формой, декоративная полоса .hero-rule скрыта. Полные тексты, шесть актов, винные прозрачные книги, настоящий портрет, логотип и отключённые формы сохранены. V12 с янтарным фоном #ffc247 и акцентами #ffce58 — историческая версия, заменённая V13.

Источники: ../../scripts/web121126-content.mjs и каскад public/webinar.css → public/refinement-v2.css → public/refinement-v3.css → public/palette-v6.css → public/compact-v7.css → public/details-v8.css → последующие цветовые уточнения → public/refinement-v13.css. Последний слой и прямые указания пользователя имеют приоритет. V4/V5 остаются историческими исходниками и не подключены. Благодарности подключают webinar.css → refinement-v3.css → palette-v6.css → compact-v7.css → details-v8.css. /web121126/ и /web121126_r/ используют общую композицию с исходными содержательными различиями. Контекст: PRODUCT.md, REVISION-V8.md, ASSETS-V8.json и IMAGE-PROMPTS-V8.md. Материалы V7 сохранены как история. Шрифты локальные, HTML статичен.

**Key Characteristics:**
- Шесть актов: navy / клубный золотой градиент / navy / клубный золотой градиент / navy / клубный золотой градиент.
- Playfair Display формирует заголовки; Manrope — продолжение оффера, текст и действия.
- Одна коралловая роль основного действия и радиус 24px объединяют кнопки и карточки.
- Hero: текст и подарок слева, вертикальная отключённая форма справа, без портрета.
- Винная книга — прозрачный предметный cutout без карточной рамки; настоящие фото и логотипы сохранены.

## Colors

### Primary

Action #ff624a — единый коралловый цвет основных действий и каретка; текст кнопки navy, border:0. Акцент CTA не используется для декора.

**The One Action Color Rule.** Все основные действия имеют один акцент и общую геометрию на соответствующей ширине экрана.

### Secondary

Navy #0b162a — hero, подарок, спикер, результат и фон благодарностей. Navy-секции используют общую льняную фактуру с тёмным overlay #10162e65 вместо прежнего градиента hero. V14: аудитория, программа и финал используют --club-gold: linear-gradient(135deg,#d6a65c 0%,#f0d4a5 36%,#fff2d8 58%,#f3be72 100%). Тот же градиент применяется к .role-avatar и .topic-number; --gold: #f0d4a5 задаёт однотонные золотые детали. Источник — пользовательский Method-club-main.zip, src/styles/globals.css, класс .gold-gradient-text. Базовые paper/gold-surface/warm-region #d4af37 остаются fallback-токенами V13; финальные регионы перекрыты градиентом.

### Neutral

Ink #172039 — тёмный текст золотых секций. Cream #f7f4eb — текст на navy и тёмных карточках. Card #1c2a4a — карточки аудитории/программы, формы и панель благодарностей. Card-line #8d794f и form-line #9d865d — контуры. Поля: input-surface #11192c, field-line #9d927b, cream-ввод и placeholder #c6baa4. Form-muted #ded2ba — статусы, подписи и футер; program-muted #394056 — пояснение программы. Превью подарка: preview-slate #252c40 и preview-line #aa8b4f. Line #a68a48 — общий токен контура. Результат — navy с cream-текстом и gold-заголовком.

Винная иллюстрация книги имеет настоящий alpha-канал: CSS-фон transparent и радиус 0. Белая полоса подлинных логотипов, собственные цвета фотографий и бумага внутри изображения книги сохраняются; белой CSS-подложки книги нет.

## Typography

**Display Font:** локальный Playfair Display под именем WebDisplay, Georgia и serif в резерве.

**Body Font:** локальный Manrope под именем WebText, Arial и sans-serif в резерве.

Desktop: hero h1 clamp(42px,4vw,58px) в V13, продолжение 23px / 1.35, описание 17px / 1.6; дата 23px. Заголовки секций 44px, аудитории 40px, автора 40px; hero-форма 29px. Аудитория: заголовок 25px, текст 16px / 1.55. Программа: текст 18px / 1.5 до 75ch, номер 16px; результат 23px / 1.35, его метка 18px. Подарок: h3 27px, текст 16px / 1.6. Достижения 16px / 1.55, цитата 22px / 1.45. Превью подарка 14px / 1.55. Кнопки Manrope 800, 16px / 1.35.

При desktop >=1000px и высоте <=820px V13 сохраняет hero clamp(42px,4vw,58px); остальные правила V8: продолжение 21px, описание 16px / 1.5, форма 27px; заголовки секций 38px, аудитории 36px, автора 36px, финала 28px. Программа 17px / 1.45, результат 21px, цитата 20px; достижения 15px / 1.5.

До 1100px аудитория 36px; до 999px аудитория 33px. Hero h1 во всех ширинах использует последнюю V13 clamp(42px,4vw,58px). До 760px: продолжение 23px / 1.4, описание 16px / 1.6; форма 28px; секции 36px, аудитория clamp(25px,7.8vw,31px), программа 16px / 1.6, номера 15px; подарок h3 25px, результат 23px / 1.4, автор 36px, цитата 22px / 1.45, финал 27px / 1.4. До 360px: продолжение 22px, форма 26px, секции 33px, аудитория 25px, финал 25px, превью 13px. Благодарности сохраняют h1 52/44/42/38px по прежним breakpoint 1100/760/360.

Финальный блок использует одну гарнитуру WebText/Manrope: h2 650, 30px / 1.35 (28px на низком desktop, 27px mobile, 25px до 360px); служебный текст, дата, время и подарок 16px / 1.55 с letter-spacing:0; дата и время 700, остальные 400. До 360px подарок 14px. Заголовок формы 24px / 1.35, 650.

**The Visible Copy Rule.** Все смысловые тексты и точные названия подарков остаются живым HTML; иллюстрация их не заменяет. Компактность не достигается скрытием текста.

## Layout

Контейнер: максимум 1280px, ширина calc(100% - 2 * clamp(24px,7vw,112px)); до 760px ширина calc(100% - 44px), до 360px calc(100% - 32px). V13: padding-block секций 64px, min-height 680px на desktop; программа минимум 900px, подарок и финал минимум 740px. Секции используют flex/align-items:center. До 760px padding-block 48px, min-height 0 и естественная высота по полному тексту без clipping. Последний слой заменяет прежние компактные отступы V8.

Шесть актов: hero → аудитория → подарок → программа/результат/бонус → автор → регистрация. Последний V13 задаёт свободный ритм поверх основы V8. Проверки V8 в .impeccable/review/v8-qa.json и V8-скриншоты фиксируют отсутствие переполнения/битых изображений, одинаковую геометрию CTA и равные интервалы аудитории. Эти проверки описывают наблюдаемое поведение, а не фиксированные CSS-высоты. На мобильном секции растут по полному тексту.

Hero V13: min-height 720px, padding-block 48px, align-items:center; .hero-copy padding-block 24px; .hero-rule display:none. До 760px min-height 0, padding-block сетки 20px и текста 10px. Геометрия колонок: minmax(0,1.3fr) / minmax(360px,.85fr), gap 30px, на низком desktop 28px; до 1100px 1.15fr / minmax(330px,.85fr), gap 26px; до 900px одна колонка, gap 30px, до 760px 28px. Текст использует ширину своей колонки без max-width. Портрета в hero нет.

Аудитория — три карточки с общими subgrid-рядами. V13: padding-block 64px, заголовок min-height 0, margin-bottom 32px и естественный перенос строк. До 760px секция получает общие 48px, margin-bottom заголовка 28px; карточки одной колонкой с gap 16px. Прежние фиксированные интервалы V8 100/84/112/104px заменены V13.

Программа — пять карточек в одном вертикальном пути, ширина до 1100px вместе с заголовком, результатом и бонусом. Результат — горизонтальная сетка 110px / 1fr, gap 22px, padding 18px 22px; до 999px одна колонка. Бонус и CTA ниже, на мобильном последовательно.

Подарок: сетка до 1160px, равные колонки, gap 88px (52px до 1100px); текст до 560px. Mobile одна колонка, gap 30px. Авторский контейнер V13 до 1120px, сетка 260px / 1fr, gap 34px; низкий desktop 240px / 1fr, gap 30px; до 1100px фото-колонка 240px; до 999px .7fr / 1.3fr, gap 28px; mobile одна колонка. Сетка автора выровнена по центру; цитата margin-top 32px, CTA margin-top 28px. Цитата и CTA до 940px по центру. Логотипы по содержимому, выравнивание слева. Финальная сетка 1fr / minmax(360px,.9fr), gap 40px (30px до 1100px); до 900px одна колонка, форма до 560px по центру. Благодарности сохраняют navy-фон, оригинальную шапку, тёмную панель и настоящее фото.

**The Shared Composition Rule.** Аудиторные варианты используют одну композицию и стили; различия приходят из исходной конфигурации.

## Elevation & Depth

Navy-секции используют одну повторяющуюся льняную WebP 512×512px, 38252байта: media/navy-linen-v8.webp. Body/hero/gift/speaker: linear-gradient(#10162e65,#10162e65) поверх фактуры; карточки, результат, формы, превью и панель благодарностей: overlay #26314db8 поверх той же фактуры. Это общий материал, не набор разных текстур.

Тени: карточки/формы/портреты/логотипы/цитата 0 10px 24px #050a1f3d; CTA 0 10px 24px #03091c55, hover 0 13px 28px #03091c66; ролевые плитки и номера 0 4px 10px #050a1f26; винная книга drop-shadow(0 18px 18px #02061780). Цитата имеет #252c4066, радиус 24px, padding 20px 26px (18px 24px на низком desktop, 22px mobile, 20px до 360px).

## Shapes

Кнопки, карточки, поля, регистрационные панели, контейнеры превью, фото автора и полоса логотипов сохраняют радиус 24px. Исключение — само изображение винной книги: border-radius:0, background:transparent, настоящий alpha-канал, предметный cutout без карточной рамки. Ролевые плитки теперь 52×52px с SVG 48×48px. Номер программы 36×36px, мобильный 32×32px. Золотые круглые маркеры достижений 6px сохранены.

## Components

### Buttons

Основные действия сохраняют 320×64px, padding 12px 48px 12px 24px, радиус 24px и SVG справа в 18px. До 1100px ширина 260px, до 760px calc(100vw - 2 * var(--gutter) - 48px), max-width ограничивает контейнером. CTA: коралл #ff624a, navy-текст, border:0, вес 800. Hover: без контура, только усиленная тень и сдвиг стрелки (3px,-3px), 200ms cubic-bezier(.23,1,.32,1). Клавиатурный focus: контур 3px с отступом 4px, navy на золотом и cream на тёмном. Disabled opacity 1; disabled-семантика и статус ожидания сохранены. Reduced motion отключает переход стрелки и плавную прокрутку.

### Inputs / Fields

Поля 48px высотой, padding 12px 14px, радиус 24px; 6px между подписью и полем, 12px между полями. Обе формы вертикальны и отключены по прямому указанию пользователя до новых GetCourse widget ID: disabled fieldset и submit, честный статус ожидания. Отправка и успех не имитируются. Hero-панель padding 26px (22px на компактном desktop; 26px 20px на мобильном, 16px горизонтально до 360px). Юридический текст margin-top 14px. Внешний iframe после получения ID не является частью этих токенов.

### Cards / Containers

Аудитория: card/card-line, padding 24px, внутренний gap 16px; компактный desktop 20px и gap 14px; mobile 22px, до 360px 20px. Программа: card/card-line, padding 18px 20px в V13, gap между карточками 9px, внутренние колонки 38px / 1fr с gap 18px; компактный desktop padding 18px 18px и gap 8px; mobile padding 18px 16px, колонки 32px / 1fr, gap 12px. Финальная форма и панель благодарностей сохраняют базовые адаптивные отступы; их поля используют общую компактную геометрию.

### Navigation

Шапка сохраняет фирменный знак и текстовую ссылку регистрации со стрелкой; padding-block 18px, компактный desktop 14px, mobile 20px. Футер сохраняет исходные ссылки. Благодарности: Telegram, ВКонтакте, MAX с исходными URL, вертикальный gap 14px.

### Signature Components

Подарки: gift-audience-wine-{320,640,960}.webp и gift-meeting-wine-{320,640,960}.webp с настоящим alpha и srcset. Universal использует audience, второй вариант meeting. Одна соответствующая иллюстрация повторяется в hero, подарке, финале и благодарности; точные названия сохранены. Основная книга max-width 310px, max-height 450px, object-fit:contain; mobile width min(72%,250px). Responsive sizes для основной книги — 310px. Превью: колонка 76px, gap 18px, padding 14px; компактный desktop 64px/16px/12px; mobile 66px/14px/14px; до 360px 56px/12px/12px. Изображение внутри превью также прозрачно и имеет радиус 0. Hero eager, остальные lazy, async decoding.

Происхождение: ASSETS-V8.json фиксирует встроенный ImageGen, хеши source-art/gift-{audience,meeting}-v8.png, alpha, WebP-производные и льняную фактуру. IMAGE-PROMPTS-V8.md хранит точные запросы: редактирование книг V7 в винный bookcloth со светлыми буквами при сохранении композиции/названий и генерацию общей льняной фактуры. Исходники V8 и прошлые PNG сохранены вне public. V7-золотые книги — история, в UI используются V8-винные. Иллюстрация не подтверждает готовность PDF-файла.

Настоящий автор: public/media/author-v2.webp, исходник 1J2A5829 (1).jpg, PHOTO-SOURCE-V2.json. Только EXIF-ориентация, пропорциональное уменьшение и WebP, без генерации лица, зеркалирования и ретуши. Фото используется в авторском блоке и благодарностях /thanks/ и /spasibo/.

## Do's and Don'ts

### Do:
- **Do** сохранять все исходные тексты, шесть актов, оригинальные логотипы и настоящий портрет.
- **Do** использовать точный --club-gold V14 для аудитории, программы, финала и смысловых маркеров; navy для результата.
- **Do** соблюдать V13: 64px desktop / 48px mobile, минимальные desktop-высоты 680/900/740px и hero 720px; прежние правила действуют лишь там, где не перекрыты V13.
- **Do** оставлять мобильную высоту естественной и весь текст видимым.
- **Do** применять 24px к карточкам и действиям, но 0 к прозрачной предметной книге.
- **Do** повторять соответствующую винную alpha-книгу во всех четырёх местах, хранить исходники и provenance.
- **Do** сохранять коралл только для действий, общую фактуру, ритм аудитории V13 и единую гарнитуру финала.
- **Do** сохранять общий дизайн двух вариантов, исходные messenger URL, фокус и reduced-motion.
- **Do** оставлять обе регистрации отключёнными до новых widget ID.

### Don't:
- **Don't** сокращать текст или скрывать его ради высоты секции.
- **Don't** возвращать бежевую программу, кобальтовые регионы V5 или большие белые области V4.
- **Don't** рисовать белую подложку или скруглённую карточную рамку самой книге.
- **Don't** заменять лицо, логотипы или клиентские факты сгенерированными аналогами.
- **Don't** возвращать портрет в hero, арочные фото или двухколоночную программу.
- **Don't** имитировать отправку формы или подтверждение регистрации.


## V13 handoff — 30.10.2026

Исторический handoff V13: PRODUCT.md на этом этапе фиксировал V13; public/refinement-v13.css подключён последним. V12 — только история. По переданным локальным результатам QA на четырёх ширинах переполнений и ошибок нет; свежий reviewer verdict — Ship для локального результата. Это не подтверждение публикации. Документация обновлена без изменения UI, текстов, изображений и форм.


## V14 handoff — 30.10.2026

Актуальное уточнение — V14. Последний файл остаётся public/refinement-v13.css: --club-gold задаёт linear-gradient(135deg,#d6a65c 0%,#f0d4a5 36%,#fff2d8 58%,#f3be72 100%) из пользовательского Method-club-main.zip/src/styles/globals.css (.gold-gradient-text). Градиент применён к .audience, .program, .final, .role-avatar и .topic-number; --gold равен #f0d4a5. Коралловый CTA, navy и геометрия V13 сохранены; тексты, изображения и отключённые формы не менялись. Переданный свежий revision3_finish: Ship локального результата; публикация не подтверждена.
