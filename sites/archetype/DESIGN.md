---
name: "AGK — Archetype"
description: "Cold navy runway architecture, luminous blue arches and icy reading surfaces; original AGK identity and coral actions."
colors:
  coral: "#b84d35"
  navy: "#05172b"
  deep: "#03101f"
  ivory: "#f2f7fc"
  ink: "#102d46"
  ice: "#c8e6fa"
  steel: "#2c5774"
  brand-gold: "#e1bd7a"
  muted: "#c5d8e8"
  line: "rgba(161,204,236,.38)"
  white: "#fff"
  reading-card: "#f8fbfe"
  reading-emphasis: "#dceaf5"
  reading-border: "#a8c5db"
  dark-card: "rgba(5,23,43,.92)"
typography:
  display:
    fontFamily: "Prata, Georgia, serif"
    fontSize: "clamp(44px,4.55vw,70px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-.02em"
  headline:
    fontFamily: "Prata, Georgia, serif"
    fontSize: "clamp(30px,3.35vw,48px)"
    fontWeight: 400
    lineHeight: 1.18
  title:
    fontFamily: "Prata, Georgia, serif"
    fontSize: "25px"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  action:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  control: "6px"
  plaque: "12px"
  container: "14px"
  card: "16px"
  action: "36px"
  audience-shoulder: "52px"
  audience-shoulder-mobile: "44px"
  circle: "50%"
spacing:
  compact: "16px"
  card: "24px"
  relaxed: "28px"
  broad: "32px"
  section: "90px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "10px 38px"
    width: "360px"
    height: "72px"
  button-primary-hover:
    backgroundColor: "{colors.coral}"
  card-dark:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.card}"
    padding: "28px 24px"
  card-reading:
    backgroundColor: "{colors.reading-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px"
  card-reading-emphasis:
    backgroundColor: "{colors.reading-emphasis}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  card-featured-tariff:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    rounded: "{rounded.container}"
  outcome-plaque:
    backgroundColor: "rgba(5,23,43,.85)"
    textColor: "{colors.ivory}"
    rounded: "{rounded.plaque}"
    padding: "13px 14px"
  tariff-select:
    backgroundColor: "{colors.reading-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 10px"
    width: "100%"
---

# Design System: AGK — Archetype

### Refinement v14: inner insets and screen-centered play marks

Audience/named-archetype icons and headings, plus program dates/icons/headings, receive12px extra left inset relative to body copy. Centered unknown archetypes are exempt. Both lecture-format play marks are decorative aria-hidden spans, positioned at50% horizontal and27%/34% vertical of their distinct covers; text keeps its previous flow position. No new video action, copy change, image regeneration or CTA-token change.

## Current refinement v13

Continuous rounded window vaults supersede the angular v12 shoulders and the older card-corner descriptions below. Two ImageGen variants, square and wide, are sliced into cap/rails/foot; the cap has an explicit stable height, while only straight rails follow content. This applies to audience, approach, archetypes, program, tariff, bonus and review cards. Tariff body closes 24px above its72px CTA, preventing corner collisions on phones. Comparison titles are centered, approach top spacing76px desktop/56px mobile. Primary actions use the verified shared360×72 desktop,300×72 intermediate/full-container×72 mobile,#b84d35,36px radius,16px Manrope. Original artwork and copy remain live and unchanged.

## Overview

**Creative North Star: "Холодная архитектура звёздной сцены"**

The current world follows the supplied runway frames: cold midnight blue, luminous steel-blue arches and icy white cloud surfaces. Architectural scenery gives the page physical scale while original photographs keep the author recognisable. The approved option C composition remains the first-surface authority; the later runway correction replaces its obsolete beige, antique-atlas and general gold material direction.

Live serif headings and readable sans-serif copy sit over quiet zones in the scenery. Thin blue outlines, restrained constellations and portrait arches connect dark scenes to light reading sections. Original AGK gold and the approved sphere on books in the hero remain intentional warm exceptions. Bonus imagery now matches the cool runway material.

This record is extracted from the current HTML, the complete CSS cascade including v5 overrides, and desktop/mobile hero, method, program and bonus screenshots in `.impeccable/review/`. The supplied frames are verified visual references; no full-show video viewing is claimed. Historical `hero-repro` evidence is an old composition checkpoint, not proof of the current palette. PRODUCT.md, the top v5 BRIEF.md section and CONTENT-MAP.md govern product truth and source preservation.

**Key Characteristics:**

- Cold navy scenery and icy cloud-white reading surfaces.
- Luminous blue architecture, photographic portrait arches and thin constellation lines.
- Original portraits, AGK wordmark and cool runway bonus imagery.
- One coral primary-action treatment with consistent geometry at each breakpoint.
- Local Prata and Manrope support complete Russian copy.

## Colors

Coral identifies actions; ice and steel supply the architectural signature; navy and icy ivory support reading.

### Primary

- **Coral:** all main participation actions, including hover. White labels and arrows provide contrast.

### Secondary

- **Ice blue:** portrait outlines, constellations, heading emphasis, keyboard focus and light details on dark scenes.
- **Steel blue:** labels, rules and icon strokes on light surfaces.
- **Original AGK gold:** the original wordmark retains its brand colour. The single hero sphere/books retains its warm gold imagery; bonus raster covers use cold blue light.

### Neutral

- **Midnight navy / deep navy:** primary scene and footer foundations.
- **Icy ivory:** light sections and the featured tariff; its historic token name does not imply a warm beige.
- **Ink:** headings and copy on light surfaces.
- **Muted blue:** subordinate text on dark scenes.
- **Blue line:** translucent rules on dark backgrounds.
- **Reading card / reading emphasis / reading border:** near-white panels, pale blue emphasis and cool outlines.
- **Dark card:** translucent navy surfaces over generated scenes.

**The Cool Alias Rule.** Legacy CSS names `--gold` and `--gold-dark` resolve to ice and steel. Only `--brand-gold` retains the original gold identity colour; never interpret the legacy names as permission to restore antique gold interface chrome.

**The Single Action Rule.** Primary actions use coral in both default and hover states. Hover changes the border to ice; it does not introduce another fill colour.

## Typography

**Display Font:** Prata, Georgia, serif.
**Body Font:** Manrope, Arial, sans-serif.

**Character:** Regular-weight Prata gives the Russian headings an editorial rhythm. Manrope carries full paragraphs, dates, prices' supporting text and actions without competing with the scenery. Fonts are hosted locally.

### Hierarchy

- **Display:** the desktop frontmatter role is the hero baseline. At widths up to 1199px it uses `clamp(41px,4.7vw,58px)`; up to 900px, `clamp(38px,7.8vw,64px)`; up to 600px, `clamp(31px,7.4vw,44px)`, line height 1.16 and tracking -.025em.
- **Headline:** normal section headings use the frontmatter role; section overrides step to 38px, 36px and 30px at 1199px, 900px and 600px. Method and closing have their own observed variants.
- **Title:** Prata card headings cluster around 23–30px by component and breakpoint. Tariff and bonus titles lead their supporting labels in actual DOM order.
- **Body:** the default is 17px/1.6 with a 70ch maximum paragraph measure. Section copy varies from 16–18px with line heights 1.6–1.75; mobile reading copy is usually 16px.
- **Action:** semibold Manrope; intermediate widths use 14px, mobile returns to 15px. Two-line labels stay within the shared control height.

**The Reading Rule.** Preserve complete source text and readable contrast over imagery. Use the navy mobile method panel to protect long copy when its architectural background passes beneath the text.

## Layout

The shared shell has a 1380px maximum width, with 56px side allowances on large screens, 32px at widths up to 1199px and 20px up to 600px. Standard section padding steps from 90px to 70px, 65px and 52px at 1199px, 900px and 600px. Distinct scenes retain their component-specific spacing.

The desktop hero uses 57% text / 43% portrait; it stacks at 900px. Audience and archetype grids start at four columns, reduce to two at 900px and one at 600px. Program, tariffs and bonuses start at three columns and stack at 900px. Tariff and bonus stacks keep their respective maximum widths of 530px and 560px. Author and closing portraits retain their dedicated layout and mobile scale.

Shared actions are 310 × 60px above 1199px and 230 × 60px from 601–1199px. Up to 600px they use the available viewport width minus 40px, producing 350 × 60px at 390px and 280 × 60px at 320px, including tariff actions. These are responsive sizes, not separate section variants.

The saved QA report measures desktop 1536 × 1024, laptop 1280 × 720, mobile 390 × 844 and narrow 320px. It records matching CTA geometry within each measured viewport, no horizontal overflow and no missing images. Measurements describe the tested build; they do not imply publication or user acceptance.

## Elevation & Depth

Depth comes chiefly from photographic portraits and seven ImageGen material backgrounds: six distinct runway scenes plus one light cloud surface. Thin borders, tonal layering and translucent navy panels organise content. Cards rest flat; the native tariff dialog supplies the major interface shadow.

### Shadow Vocabulary

- **Dialog lift:** `0 22px 80px rgba(0,0,0,.35)`, against a `rgba(4,12,24,.78)` backdrop.
- **Action press:** `inset 0 2px 5px rgba(0,0,0,.22)`, only on the primary control's active state.

A single constellation glint runs for 2.4 seconds with `cubic-bezier(.16,1,.3,1)`. Action and FAQ state transitions last .2 seconds. Reduced motion disables animations/transitions and smooth scrolling.

**The Material Rule.** Let the supplied photographic and generated materials carry scene depth. Do not replace them with repeated generic gradients or extra decorative objects.

## Shapes

Large portrait arches use matching rounded shoulders with straight bases: hero, author and closing are deliberately different photographic frames. Blue double lines around the hero portrait echo the luminous stage architecture.

Audience cards echo that architecture with paired 52px top shoulders and 16px lower corners, stepping to 44px shoulders on mobile. Approach, program, archetype and bonus cards use the same 16px radius at every corner. Tariff cards, review panels and the dialog retain their observed 14px radius. Outcomes use 12px; native select controls use 6px; actions use 30px. Circular icons and the DISC seal remain circular. These functional families do not justify arbitrary opposite-corner asymmetry.

**The Paired Corner Rule.** Match left and right corners within each structural pair. Retain intentional audience shoulders and portrait arches; do not reintroduce opposite decorative corner patterns.

## Components

### Primary actions

Coral controls are calm and explicit: fixed height, consistent width within the breakpoint, a 30px radius and a right-aligned inline SVG arrow. Default and hover fills match. Hover reveals an ice border; active applies the inset press shadow. Keyboard focus is a 3px ice outline with 5px offset. No secondary CTA variant is currently implemented.

### Header navigation

The original gold AGK wordmark accompanies two real in-page links. Desktop uses a 36px Prata mark, 16px links and a 40px navigation gap. Mobile uses a 30px mark, 14px links and a 24px gap. Links underline and turn ice on hover; keyboard focus remains explicit.

### Outcome plaques

Noninteractive outcomes follow the hero action in actual source order. A navy translucent surface, thin ice stroke, small inline SVG and 12px equal corners remain consistent across desktop and mobile. The row becomes a stacked list on mobile; it is not an interactive chip filter.

### Reading and audience cards

Near-white panels and pale blue emphasis support ink text with cool outlines. Program cards use 32px desktop inner padding; mobile uses 26px 24px. Audience cards add paired arch shoulders and circle-stroke icons. Icons are SVG, not decorative character glyphs.

### Dark archetype and tariff cards

Archetype cards use navy translucency and 16px corners. Tariffs use 14px corners, cool outlines and readable separators; the featured tariff reverses to icy ivory and ink with a two-pixel ice outline. Tariff names and supporting labels follow the title in the DOM. Prices use tabular numerals. Main controls share the global action geometry.

### Bonus covers

The three raster covers use cold blue light and individually composed scenes. Two lectures depict silver-blue tablet screens; the Moscow New Year cover is a conceptual festive scene. Their outer cards use 16px equal corners, navy bases and a dark lower gradient supporting live text. Titles precede supporting labels in the DOM. Lecture play symbols are noninteractive; they do not imply a working player. Desktop cards have a 640px minimum height, stacked cards 620px and mobile cards 580px. The celebration image is conceptual artwork, not proof of the actual venue.

### Native tariff selector and dialog

Mobile polish v9: event and outcome plaques use the CTA's 30px radius. Flush tariff actions and card lower corners both use 30px, with unchanged CTA size. Approach receives 32px top padding. Author switches to a compact 56:44 introductory text/photo grid, 200px image height, full-width remaining copy and unchanged original assets/logos. The closing portrait has a complete 1px lower border, 16px lower corners and separation from the footer on desktop/mobile. Current audience arch shoulders and rectangular content cards are retained pending the user's choice among arch-window, light-panel or glazed-panel families; no new generated illustrations are implied.

Mobile hero refinement v8 (≤600px): a 65:35 heading/portrait row, followed by full-width description, CTA and outcome plaques. The original author credit remains readable as a full-width signature after the plaques. The long unchanged heading uses `clamp(18px,5.65vw,28px)` so whole words fit at 320px; portrait height is 240px. Mobile decorative instruments are omitted, not content. Desktop composition stays unchanged. Site-controlled prices use the ordinary Cyrillic letter Р instead of ₽; currency inside the external GetCourse embeds remains provider-controlled.

The dialog uses icy ivory, ink copy, a blue outline, 14px corners and the dialog-lift shadow. The select remains a real native control with a near-white background, cool border, 6px radius and 50px minimum height. Focus is explicit; Escape closes the dialog and returns focus. Three user-supplied GetCourse embeds load on demand in separate persistent panels (1667037/1667040/1667041). Loading, load-error retry and a direct-form fallback are provided. Cross-origin form fields, consent text, submit appearance and actual payment behavior belong to GetCourse; the site does not simulate payment. The footer carries the original mkclients legal/contact content with the current archetype offer and cold navy styling.

### Native FAQ

Details/summary uses horizontal cool rules and clear Manrope questions. A plus rotates when opened; the native element supports keyboard interaction and does not depend on a motion library.

## Do's and Don'ts

### Do:

- **Do** use the cold runway palette and luminous blue architecture from the supplied frames.
- **Do** retain original portraits and the original gold AGK wordmark; use cool runway materials for bonus covers.
- **Do** keep primary CTA fill, geometry and arrow treatment identical within each breakpoint.
- **Do** preserve complete source content and put tariff/bonus supporting labels after titles in the DOM.
- **Do** use paired audience shoulders, equal card corners and photographic portrait arches for their established roles.
- **Do** preserve readable quiet zones, keyboard focus and reduced-motion behavior.

### Don't:

- **Don't** restore beige reading surfaces, antique-atlas interface chrome or arbitrary opposite rounded corners.
- **Don't** reinterpret legacy gold token names as the current interface palette.
- **Don't** repeat the hero sphere/books or add globe, atlas or folded-cloth objects back into the current scenery.
- **Don't** regenerate the author's face or replace original company logos with approximate marks.
- **Don't** treat the old hero-repro checkpoint as current palette evidence or claim the full runway video was watched.
- **Don't** invent a secondary action variant, a working bonus player, registration submission or payment behavior.

