# AGENTS.md — Sergey Lapin Website Agent Rules

Use this file as mandatory project instructions for Codex or any coding agent that creates websites for Sergey Lapin.

## Core Role

You are not the marketing strategist.

Your job is to turn the provided structure, copy, and technical specification into a strong website through:

- design quality;
- layout;
- typography;
- visual hierarchy;
- responsive implementation;
- animation;
- performance;
- clean code.

Do not rewrite marketing strategy unless explicitly asked.

## Priority Order

When there is a conflict, follow this order:

1. User’s explicit task.
2. Provided technical specification.
3. Existing copy and block order.
4. These agent rules.
5. Your own design suggestions.

## Work Strictly by the Specification

If the user provides a technical specification, block structure, or ready copy, follow it exactly.

Do not:

- rewrite the meaning of the copy;
- remove blocks from the specification;
- add new sections without need;
- change the block order if it is defined;
- shorten important wording;
- invent a new structure when one is already provided.

Allowed:

- improve visual presentation;
- adapt line breaks for layout without changing meaning;
- suggest improvements separately, but do not apply them instead of the specification unless asked.

## Language Rules

For Russian websites, all interface text must be in Russian.

Do not use English interface labels such as:

- buttons;
- cards;
- features;
- pricing;
- testimonials;
- hero.

Exceptions:

- brand names;
- technology names;
- terms the user explicitly asks to keep;
- Telegram as a platform name.

Use “Телеграм” or “Telegram” consistently depending on the project style. Do not mix both randomly.

## Header Rules

If the site has fewer than 10 sections, usually do not create a header.

If the site has 10 or more sections, a header may be useful.

If the user explicitly asks for a header, create it.

For short landing pages, prefer a direct linear journey from top to bottom instead of extra navigation.

## CTA Rules

CTA buttons must be visible and easy to understand.

Hero CTA:

- must be noticeable immediately;
- must not be tiny, narrow, or visually lost;
- must contrast with the background;
- must be large enough to feel important, but not absurdly huge.

For landing pages, place CTA approximately every 2 sections when appropriate.

Possible CTA text examples:

- Зарегистрироваться;
- Присоединиться;
- Оставить заявку;
- Перейти в Телеграм;
- Забронировать место;
- Получить доступ.

Do not hide the only CTA deep in the page.

## Forms

Forms must be simple and clear.

Rules:

- do not ask for unnecessary fields;
- use clear field labels;
- show errors near the relevant field;
- show clear success state after submit;
- make the submit button visible;
- make focus state visible;
- make disabled/loading states understandable.

## Images and Asset Optimization

Do not generate or use PNG unless transparency is required.

Use:

- WebP;
- JPG;
- AVIF when appropriate.

Rules:

- background images should not be PNG unless transparency is needed;
- optimize all images before usage;
- do not overload the site with heavy assets;
- keep page weight under control;
- avoid too many heavy visual effects at once.

## Hero Image Rules

If Hero uses a photo, do not place it as a random rectangular image unless the design clearly requires it.

Prefer:

- integrating the photo into the background;
- soft blending with the background;
- gradient masks;
- blur;
- overlay;
- visual connection with the composition.

Never allow text to overlap the photo in a way that harms readability.

## Animation Rules

Do not create a fully static site when the project uses GSAP, Lenis, SplitType, Framer Motion, or similar tools.

Use animation to make the site feel alive:

- text reveal;
- soft card reveal;
- subtle photo movement;
- animated badges;
- section entrance animations.

Do not:

- overload the site with random animation;
- use harsh or chaotic motion;
- make animation break mobile UX;
- make the site heavy just for effects.

## Unified Animation Language

Animations must feel like one system.

Bad:

- block 1: fade;
- block 2: flip;
- block 3: rotate;
- block 4: zoom;
- block 5: bounce.

Good:

- consistent reveal logic;
- similar timing;
- similar easing;
- same emotional tone;
- mobile-safe variants.

The site must move like one product, not like a collection of random effects.

## Mobile First Animation Rule

Design mobile animation first, then expand it for desktop.

On mobile, prefer:

- opacity;
- scale;
- reveal;
- slide;
- stack;
- bottom-sheet style interactions.

Avoid directly copying desktop effects such as:

- large horizontal movement;
- complex parallax;
- wide card explosions;
- heavy scroll timelines.

If a desktop animation breaks mobile UX, replace it with a simpler mobile animation.

## Responsiveness

The website must be responsive from the first implementation.

Check:

- desktop;
- tablet;
- mobile.

Never allow:

- horizontal scroll;
- text overlapping images;
- broken layout;
- tiny tap targets;
- desktop-only animation logic.

Mobile is a separate composition, not a compressed desktop.

## Interaction States

Every interactive element must have appropriate states.

For:

- buttons;
- cards;
- links;
- forms;
- menus;
- toggles.

Include:

- default;
- hover;
- active;
- focus;
- disabled;
- loading when relevant.

Small states heavily affect perceived quality.

## Accessibility and Usability

The site must be usable, not only beautiful.

Check:

- readable text contrast;
- visible focus states;
- large enough tap areas;
- understandable form errors;
- no unreadable small text on mobile;
- no critical information hidden only in hover interactions.

## Design Tokens

Before or during implementation, define a small visual system.

Use consistent tokens for:

- colors;
- fonts;
- heading sizes;
- text sizes;
- spacing;
- border radius;
- shadows;
- buttons;
- cards;
- icons;
- animation timing.

Default spacing scale:

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96

Do not use random values such as 17px, 29px, 43px, 51px unless there is a deliberate optical correction.

## Final Agent Check

Before finishing the task, verify:

- the site follows the given specification;
- the copy meaning was not changed;
- the block order was not changed without instruction;
- no oversized headings;
- no excessive empty space;
- no orphan prepositions or short words in important headings;
- text is readable on all backgrounds;
- CTA buttons are visible;
- no 3–4 same-tone sections in a row;
- typography is consistent;
- punctuation style is consistent;
- responsive layout works;
- mobile animation is not broken;
- images are optimized;
- site does not look like default template blocks;
- visual system is consistent.

# Project instructions

Use Next.js App Router, TypeScript, Tailwind CSS and shadcn/ui.

For animations:
- Prefer GSAP for scroll-based cinematic animations.
- Use Lenis for smooth scroll.
- Use SplitType for text animations.
- Use Framer Motion only for component-level microinteractions.

Design direction:
- Premium cinematic website.
- Strong composition, advanced typography, atmospheric sections.
- Avoid generic SaaS templates.

Design references:

- Awwwards
- Godly
- Max Brabus
- Cuberto
- Locomotive
- Active Theory
- Bruno Simon

Avoid:
- Generic SaaS layouts
- Large empty sections
- Default Tailwind appearance
- Repetitive cards

Prefer:
- Cinematic storytelling
- Scroll-driven experiences
- Layered depth
- Premium typography
- Unexpected transitions

Every section should feel like it belongs on Awwwards.

Before implementing:
1. Think of 3 different layouts.
2. Choose the most unique one.
3. Avoid standard landing page patterns.
4. Prioritize visual impact over implementation simplicity.
