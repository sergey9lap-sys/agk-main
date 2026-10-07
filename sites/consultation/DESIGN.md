---
name: AGK Consultation
description: Implemented navy and gold system for the AGK diagnostic landing page.
colors:
  navy: "#0A2342"
  gold: "#F5CF5C"
  gold-dark: "#8A6A39"
  paper: "#F4F1EA"
  white: "#FBFAF6"
  heading-white: "#FCFAF6"
  ivory: "#F7F2EA"
  sand: "#EDE3D3"
  field-border: "#E4D6C0"
  ink: "#1D2333"
  form-ink: "#0A1B33"
  muted: "#5D6170"
  status-bg: "#FFF4CC"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(44px, 4.5vw, 64px)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-.02em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-.01em"
  body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: ".05em"
rounded:
  field: "12px"
  form: "16px"
  notice: "10px"
  capsule: "100px"
  portrait: "50%"
spacing:
  field-gap: "10px"
  author-gap: "16px"
  content-gap: "24px"
  desktop-inset: "32px"
  mobile-inset: "18px"
components:
  button-disabled:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.muted}"
    rounded: "{rounded.capsule}"
    padding: "14px 36px"
    height: "68px"
    width: "100%"
  input:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "14px 18px"
    width: "100%"
  form-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.form-ink}"
    rounded: "{rounded.form}"
    padding: "32px"
    width: "100%"
  form-status:
    backgroundColor: "{colors.status-bg}"
    textColor: "{colors.navy}"
    rounded: "{rounded.notice}"
    padding: "12px 14px"
---

# Design System: AGK Consultation

Integration update 2026-10-07: the provided GetCourse widget 1665870 replaces the temporary disabled form. Field/button tokens below describe the former local form, not the external iframe. The surrounding paper panel, navy/gold palette and responsive ordering are unchanged. GetCourse controls its own fields, consent and submit styling; the parent page does not claim to restyle cross-origin content.

## Overview

The implemented surface uses the blue and gold palette recovered from `clients-funnels-webinar-2026/src/styles.css` following the user's rejection of the earlier gray-purple treatment. A blue photographic background carries white text and gold emphasis; a paper-colored form surface separates the application fields from the offer. The reference establishes the palette used here, without implying approval of this rendered revision.

This document records the final CSS cascade: `src/source.css` followed by `src/consultation.css`. It describes the implemented consultation surface, without assigning an unconfirmed metaphor or extending page-specific composition to other AGK sites.

**Key Characteristics:**

- Navy background with gold headings, rules and numeric emphasis.
- Cormorant Garamond headings and Onest body text.
- Open light form and unboxed explanatory groups.
- Desktop columns and explicit mobile content ordering.

## Colors

### Primary

- **Gold:** field focus border, keyboard outline on the dark surface, portrait outline, italic offer line, explanatory headings, bullets, statistics and text selection.
- **Dark gold:** the short format terms below the form button.

### Neutral

- **Navy:** page background, selection text and keyboard outlines within the light form card.
- **Paper:** form-card background.
- **White:** supporting text on the blue surface.
- **Heading white:** main heading and author-name text; the supplied portrait border also retains this value.
- **Ivory:** input backgrounds.
- **Sand:** disabled-action surface.
- **Field border:** input outlines at rest.
- **Ink:** field values.
- **Form ink:** form heading and card text.
- **Muted:** input placeholders, form description, disabled button label and policy text.
- **Status background:** registration availability notice, paired with navy text.

The background combines the supplied photograph with a blue linear overlay using `rgba(10,35,66,.97)` and `rgba(10,35,66,.9)`. The reference's deep-blue token is not used in this surface and is therefore omitted. The former light background, emerald list accent and orange enabled-button gradients remain in the supplied stylesheet but do not define the visible consultation system.

## Typography

Headings use Cormorant Garamond with Georgia fallback; body copy, form controls and supporting labels use Onest with a system sans-serif fallback. Display headings are semibold, while the gold italic line uses weight 500. Text uses lining numerals.

The display token applies to normal-height desktop screens. On desktop screens at or below 820px tall it becomes 48px. At or below 960px wide it uses `clamp(36px, 7vw, 48px)` with line height 1.05. The form heading changes from 32px to 30px on mobile. Main offer description is 18px on desktop and 17px on mobile/short desktop; body and input text are 16px. Author name is a 21px serif; statistics are 26px serif with line height 1. Supporting terms and privacy copy use 13px.

## Layout

Compact integration update: the outer form panel uses 16px vertical / 24px horizontal padding (16px all around on mobile), a 28px heading (26px mobile), and 15px introductory text at 1.4 line-height with 12px spacing before the widget. Above 1100px the grid is 1.05fr/.95fr, giving the external form more wrapping room. The iframe retains its full automatic height; no clipping, fixed-height scroll box, zoom or transform scaling is used. Other layout and palette rules stay unchanged.

The centered container has a maximum width of 1240px and horizontal padding of 32px. Desktop uses a `1.15fr .85fr` grid with a 48px column gap and centered vertical alignment. The screen has a minimum height of `100svh` and 36px vertical padding. At widths from 961px to 1100px, columns become equal with a 32px gap; the author group wraps and the statistics retain their own full-width row.

At or below 960px, the container inset is 18px and the grid becomes a vertical flex layout. The intact offer heading and description come first, the form second, and explanatory groups plus author evidence third. The two explanatory groups stack. Mobile screen padding is 28px above and 36px below; the form has 24px vertical and 20px horizontal padding with a 28px trailing gap. Desktop screens at or below 820px tall use 24px screen and form padding.

Form fields use a 10px gap. The phone/email wrapper is single-column on every breakpoint in the final cascade. Explanatory groups use a 24px gap. The author group uses a 16px gap; its statistics use 16px on desktop and 12px on mobile.

## Elevation & Depth

The light form has a single diffuse shadow (`0 22px 46px -22px #0008`). Explanatory groups have no shadow or filled card background; a translucent gold top rule separates their text. The portrait retains its fine gold outline and soft source shadow (`0 0 0 1px var(--gold), 0 10px 20px -10px rgba(29,35,51,.4)`). The disabled button has no shadow or transform.

## Shapes

Form-card, input and notice corners use the frontmatter roles. The form button retains the supplied capsule silhouette. The portrait is a 64px circle with a 2px paper border and a cropped photograph positioned at `center 12%`. Explanatory groups are square-edged, open surfaces with a 1px top rule. Their list bullets are solid 6px circles.

## Components

### Form card and fields

The card pairs a serif heading with sans-serif supporting copy. Inputs span the card width, have a minimum height of 52px, a thin field-border stroke and the ivory background. Placeholders use the muted token with opacity 1. The form exposes three required fields and one optional Telegram field; their source labels remain intact.

**The Visible Focus Rule.** Inputs, buttons and links receive a 3px `:focus-visible` outline with a 3px offset: navy within the light form card and gold on the dark surface. Input focus also changes its border to gold. Field border transitions take 0.2s; reduced-motion disables transitions.

### Application button and availability notice

The current button is disabled because registration has no supplied endpoint. It is full-width and 68px tall. Its label uses 15px semibold uppercase text on desktop and 14px on mobile; the inline SVG arrow is independently positioned 16px from the right edge so it does not shift the label. Disabled styling uses sand and muted text with `cursor: not-allowed` and no lift.

The status notice is separate from supplied sales copy and appears immediately above the fields. Do not interpret this disabled state as the approved styling of a future enabled CTA: connection and its enabled appearance remain unresolved.

### Explanatory groups and author evidence

Each explanatory group begins with a translucent gold top rule and an uppercase sans-serif heading, then a list with gold bullets. The author group preserves the supplied portrait, name, method attribution and three numerical facts. Statistics remain visible at intermediate desktop widths and form a full-width mobile row.

### Policy link

The policy link retains native underlining, the muted text color and the shared visible-focus treatment. It opens the supplied policy URL in a new tab with `noopener noreferrer`.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied copy, images, form fields and author evidence when adapting this surface.
- **Do** preserve the whole offer before the form on mobile, followed by explanatory content.
- **Do** retain the visible navy keyboard outline within the light form, gold outline on dark surfaces and readable muted placeholders.
- **Do** keep the registration availability notice adjacent to the disabled action.

### Don't:

- **Don't** hide author statistics to fit a shorter desktop viewport.
- **Don't** promote the superseded orange button or emerald list treatments into the consultation palette.
- **Don't** describe the current disabled form as connected registration or fabricate successful submission behavior.
- **Don't** replace supplied identity assets with approximate illustrations or rewrite source claims during styling changes.
