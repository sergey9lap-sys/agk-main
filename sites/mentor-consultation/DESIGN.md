# Mentoring consultation

Public route: /mentor-consultation/; /mentoring/ intentionally reserved for the separate long-lived site. Internal folder follows public slug. Native widget remains 1667814, no placeholder redirect/alias added to the reserved route.

Current reading markers: chapters have visible 2px separators (#8E7F6B on beige, #8195B8 on navy) and static Manrope subheadings on desktop and mobile. Semantic reading parts use 7px circular markers with 24px inset; no arrows, controls or hidden copy. Next intro/conditions and standalone conclusions use bullets; the original three outcomes retain their numbered panels. No new rank/step numbering assigned to explanatory fragments. Source text and widget behavior unchanged.

Current mobile reading, replacing rejected disclosure: no details/summary or Подробнее. Editorial topic labels become static Manrope subheadings; complete source paragraphs visible underneath, with semantic reading spans and bold key phrases. No taps needed, no truncation, desktop topic labels stay hidden to preserve its hierarchy. Forms/link removal unchanged; provider CSS still only prepared for user's editor.

Mobile refinement: long explanations use native details with short editorial topic labels on <=600px; all source paragraphs remain intact. Desktop details opened and summaries hidden; no-JS content remains open. Regular audience cards have no check/arrow affordance. Approved heading changed to «Почему стоит начинать с него, а не с курса или клуба». Outbound form link removed in all layouts, inline retry replaces network fallback. Mobile native iframe host wider by 16px, white contained frame, main hero CTA preserved. Provider has internal 25px 40px form padding and 6px 60px button padding; GETCOURSE-MOBILE.css is a proposal for widget editor 1667814, NOT applied or verified in production/provider yet.

Latest approved direction: prepared-paused WAAPI fade 0→1/10px, 800ms, short heading-first stagger <=400ms. Preparation occurs while covered by loader or before viewport, never hides an already read visible node. site:ready synchronizes first-screen playback; focus/reduce/bfcache cancel all pending states. Capital/start/next prose is sequential in a centered 78ch reading lane rather than horizontal newspaper groups; original source phrases bolded without copy edits. Outcome numerals navy 30px, photos/cards shadows deepened. Method layout remains unchanged as explicitly liked by user.

Latest refinement 12.10: no opacity fades during scroll. Shared entry keeps opacity 1, uses only 6px movement over 600ms, skips already visible targets, starts before viewport, never replays. Compact comparison headings 25px and 24px panel padding; capital continuation semantic grid (explanation + verdict, full-width conclusion); method panels use entire shell; start/next grouped sibling content fills both columns. No sentence removed. Soft offset shadows on photos/cards/own CTA; footer reuses working-desk image under a dark readability overlay. Build-injected, theme-specific nonblocking loader closes on fonts-ready with 700ms race / hard 1200ms failsafe. No-JS loader hidden. Scoped themed 404 + Apache ErrorDocument; generated root 404 dispatches COM theme by pathname. Public routing still awaits publication verification.

Mode: Persuade, with readable editorial body. Refinement of the supplied navy/cream site, not identity replacement.

Palette: navy #141C3A, deeper navy #10172F, cream #FBF6EE, warm surface #F3EBDD, ink #22283A, muted #5F6680, line #E6DCC8, brand gold #D4AF5E, orange action #BC5024, white #FFFFFF.

Type: original Playfair Display headings and Manrope copy; preserve Cyrillic. Headings up to 52px on desktop, body 17px/1.75, mobile body 16px. Self-host supplied-licensed font resources where available.

Layout: shell max 1380px, 56px outer gutters desktop / 20px mobile. Broad compositions, individual prose columns max 70ch. Five semantic image/text scenes with varied reading rhythm, not a 720px article. Width doesn't mean stretching every paragraph across the monitor.

Actions: single orange #BC5024; 360x64 desktop and full-width 64px mobile, radius 32px. Native GetCourse submit belongs to provider and remains outside host CSS.

Preserve original logo files and face. AI still-life scenes are atmospheric metaphors, never client evidence. Keyboard focus, reduced motion and static readable content.

12.10 updated entrance: shared mentoring/archetype WAAPI, 800ms strong ease-out, 8px travel, priority order heading → explanation → image → action/supporting cards, delays capped at 400ms. Backwards fill prevents visible-then-dim stagger flashes; nested targets excluded from double animation. Reveal once, default-visible DOM, cancel on focus/reduced-motion. Feedback 160ms pointer-gated; no moving prose/typewriter.

Reading refinement: remove gold mark backgrounds, retain emphasis as bold. Source kicker moved from competing heading to image caption; intro uses ordinary body size. Reading spans group long source paragraphs without removing sentences. Continuations and next-step copy use linear flow rather than newspaper columns. Audience and exclusion cards navy on beige; author portrait 220x275 desktop. Economics illustration pins at 18vh on wide screens, remains in normal flow below 900px. Hero arrows and consultation outcome panels gain restrained pointer-only feedback; no fake clickable affordance.

Readability refinement: monetization/capitalization paired comparison panels, structured audience and non-mentoring lists, three consultation outcomes, separated next-step conditions. Source sentences and punctuation remain intact; inline bold fragments never create isolated commas or broken sentence fragments.

Native GetCourse iframe controls keep their provider styling; host cannot safely recolor or animate their fields across origins. Parent and standalone site CTAs are still unified. Mobile host padding reduced once the native form is ready, giving it maximum width.

12.10 corrected color sequence, explicitly approved by user: hero navy → audience beige → capital navy → method beige → start navy → economics beige → next navy → final form beige. No adjacent blue content sections. Headings/primary copy are cream on navy, secondary copy light blue; contained panels retain dark ink on light surfaces. No copy, images, form logic or CTA geometry changed.
