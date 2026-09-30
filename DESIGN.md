---
name: Centro Educativo Villa de Ángeles
description: A Dominican school notebook come alive, in crest royal blue and sunflower amber on grained paper.
colors:
  crest: "#2b2f8f"
  crest-deep: "#1c1f5e"
  crest-soft: "#e0e2f7"
  sun: "#f6b42c"
  sun-light: "#ffd15c"
  sun-soft: "#ffe08a"
  amber-ink: "#8a5e10"
  palm: "#2f8f5b"
  coral: "#f26b5b"
  paper: "#f4f6fa"
  sheet: "#fdfdff"
  white: "#ffffff"
  ink: "#1b1d3a"
  ink-soft: "#464a78"
  error: "#c0392b"
typography:
  brand:
    fontFamily: "Pirata One, Georgia, serif"
    fontSize: "clamp(2.9rem, 11.5vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 0.98
  display:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  statement:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.35rem)"
    fontWeight: 600
    lineHeight: 1.28
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 2.4vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Source Sans 3 Variable, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Source Sans 3 Variable, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  hand:
    fontFamily: "Shantell Sans Variable, Comic Sans MS, cursive"
    fontSize: "clamp(1.5rem, 2.4vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "0"
  label:
    fontFamily: "Source Sans 3 Variable, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  photo: "8px"
  field: "12px"
  polaroid: "14px"
  card: "16px"
  band: "2rem"
  band-lg: "3rem"
  pill: "9999px"
spacing:
  gutter: "1.25rem"
  gutter-md: "2rem"
  notebook-line: "1.75rem"
  nav-height: "4rem"
  section: "5rem"
  section-md: "7rem"
  section-lg: "8rem"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.crest-deep}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.crest}"
    textColor: "{colors.white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.crest}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.crest}"
    textColor: "{colors.white}"
  button-light:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.crest}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    height: "48px"
  button-light-hover:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.crest-deep}"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 14px"
  card-sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  nav-pill:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.crest}"
    rounded: "{rounded.pill}"
    height: "{spacing.nav-height}"
  nav-link-active:
    backgroundColor: "{colors.sun-light}"
    textColor: "{colors.crest}"
    rounded: "{rounded.pill}"
    height: "44px"
  crest-band:
    backgroundColor: "{colors.crest}"
    textColor: "{colors.white}"
    rounded: "{rounded.band}"
  icon-disc:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.crest-deep}"
    rounded: "{rounded.pill}"
    size: "44px"
  whatsapp-fab:
    backgroundColor: "{colors.palm}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    size: "56px"
---

# Design System: Centro Educativo Villa de Ángeles

## Overview

**Creative North Star: "The Living Schoolbook"**

The site is a Dominican school notebook come alive. The crest's royal blue fills whole pages the way a notebook cover does; sunflower amber is the single action color, the highlighter swiped across one word and the pill a parent taps to start admission. Everything sits on a cool paper ground with a fine grain, and the school's own material carries the trust: real photographs of its children and classrooms, the crest, the mission, the seven values, the two levels, the requirements list. Die-cut stickers (gold star, pencil, crown, block, paper plane, laurel, wing, clip) are the child's energy, orbiting content rather than replacing it.

Density is generous and rhythmic: wide sections on a 72rem measure, big display type, then a calm reading line. The page alternates between paper stretches and crest-blue bands with 2rem to 3rem rounded edges, so scrolling feels like turning between notebook pages and their covers. A handwritten margin voice in Shantell Sans adds one short aside where a teacher would write it. Motion is ease-out and arrives from an already-visible default: content nudges into place, it never fades up from nothing. Springs are reserved for objects a hand can grab (the polaroid photo stack, draggable stickers, the magnetic primary button). One statement per page lights up word by word on scroll, and one marquee band runs the school's values.

The world refuses the category default for school sites: a full-bleed photo slideshow, generic program cards, a centered crest, and invented proof. There are no testimonials, counters, rankings, or badges, because none exist. Spanish is the primary language and English is equal; every layout has to hold both string lengths.

**Key Characteristics:**
- Crest royal blue as whole regions (page intros, vision band, level cover, clipboard, footer, mobile menu), never as scattered tints.
- Sunflower amber as the only action color, plus a few committed amber regions (values marquee band, value notes, the Primario level cover).
- Cool paper ground with a mirror-tiled grain texture; content sheets in near-white with soft crest-tinted shadows.
- Die-cut raster stickers with a white border and a crest drop shadow; palm green and coral live only inside them.
- Highlighter swipe on one word and hand-drawn amber underlines under section headings.
- Pill controls, 16px cards, 2rem to 3rem rounded bands.
- Ease-out arrivals from a visible default; springs only for grabbable objects; hover only on fine pointers; full reduced-motion fallbacks.
- Page changes pass behind a crest-blue curtain carrying the crest.

## Colors

A three-voice palette: crest blue commits whole regions, sunflower amber marks every action, and a cool paper white holds the reading; two sticker accents stay inside the art.

### Primary
- **Crest Royal Blue** (#2b2f8f): The school's shield blue. Fills whole regions: the page-intro header on every inner route, the vision band, the Inicial level cover, the requirements clipboard, the footer, the mobile menu, and the page-transition curtain. It is also the text color for headings on paper, the outline-button stroke, the focus outline, form carets and checkmarks, and the fill that wipes across an amber pill on hover.
- **Crest Night** (#1c1f5e): The deepest crest. Text on amber (pill labels, icon glyphs inside amber discs, amber-note text) and the tint of every shadow and photo scrim.
- **Crest Mist** (#e0e2f7): The palest crest. Lead text on crest bands, one value-note tone, the datepicker header.

### Secondary
- **Sunflower Amber** (#f6b42c): The one action color. Primary pill fill, icon discs, the highlighter swipe, heading underlines, the field focus glow, the text-selection color, the close button in the mobile menu. Also allowed as a committed region fill: the tilted values marquee band, the Primario level cover, and some value notes.
- **Bright Sunflower** (#ffd15c): The active-page highlight pill that slides between nav links, and footer link hover on crest.
- **Butter Amber** (#ffe08a): A soft amber note tone in the values collage.
- **Amber Ink** (#8a5e10): The only amber that may sit on paper as text. It colors the handwritten margin voice, because sunflower amber on paper fails contrast.

### Tertiary
- **Palm Green** (#2f8f5b): Sticker art only, with one sanctioned exception: the floating WhatsApp button, where the green is channel recognition.
- **Coral** (#f26b5b): Sticker art only. It never appears as a UI fill, border, or text color.

### Neutral
- **Cool Paper** (#f4f6fa): The page ground under the paper-grain tile. Also the scrollbar track.
- **Sheet White** (#fdfdff): Content sheets (forms, contact and careers panels), the floating nav pill, the light button, the notebook paper, and one value-note tone.
- **Pure White** (#ffffff): Form field interiors, polaroid frames, the discs behind the crest logo, sticker borders, and text on crest bands.
- **Notebook Ink** (#1b1d3a): Body text on paper.
- **Soft Ink** (#464a78): Secondary text on paper: the hero welcome line, field subtext, notebook entry bodies.
- **Correction Red** (#c0392b): The invalid-field border. Error notes use a pale red panel with dark red text.

### Named Rules
**The One Action Color Rule.** Every tappable pill that moves a parent forward is sunflower amber, or an outline or sheet pill that fills with crest on hover. No second action color exists.

**The Whole Region Rule.** Crest blue is committed as full regions with rounded band edges, not sprinkled as tinted boxes. A section is either paper or crest.

**The Sticker Accent Rule.** Palm green and coral appear only inside sticker art. The WhatsApp button is the single exception for palm, because parents recognize that green as the channel.

## Typography

**Brand Font:** Pirata One (with Georgia, serif)
**Display Font:** Bricolage Grotesque Variable (with system-ui, sans-serif)
**Body Font:** Source Sans 3 Variable (with system-ui, sans-serif)
**Hand Font:** Shantell Sans Variable (with Comic Sans MS, cursive)

All four are self-hosted through Fontsource.

**Character:** A blackletter school name out of the crest's own tradition, set against a warm, chunky, slightly tight grotesque that shouts headings the way a child's notebook label does, with a plain humanist sans for calm reading and a marker-pen hand for the teacher's margin notes.

### Hierarchy
- **Brand** (400, clamp from 2.9rem to 4.25rem on phones and up to 5.9rem on desktop, line-height 0.98): The school name only: the home hero headline, the nav wordmark, the footer name. Marked `translate="no"`.
- **Display** (800, 2.6rem to 5.5rem, line-height 0.95, tracking -0.035em): The largest content statements: level age ranges on the level covers, value names in the marquee (3.2rem to 6rem), inner page-intro titles (2.6rem to 4.5rem, line-height 1.02).
- **Headline** (800, 2.25rem to 3.75rem, line-height 1.02, tracking -0.025em): Section headings, always with the hand-drawn amber underline beneath.
- **Statement** (600, 1.6rem to 2.35rem, line-height 1.28, tracking -0.015em): The one scroll-lit paragraph per page (the mission on home).
- **Title** (800, 1.3rem to 1.875rem, line-height 1, tracking -0.02em): Value-note titles, level-name chips, service strip labels.
- **Lead** (400, 1.125rem to 1.25rem, line-height 1.625): Intro paragraphs under a hero or page intro, 44ch to 58ch.
- **Body** (400, 17px, line-height 1.625): Running text, capped at 58ch to 62ch.
- **Hand** (600, 1.5rem to 1.75rem, line-height 1.375, rotated -2° to -3°): The margin voice. One short aside per section, set in amber ink.
- **Label** (600, 15px): Nav links, field labels (14px, crest), footer links, button labels (16px).

Headings use balanced wrapping; paragraphs use pretty wrapping; numbers in counters use tabular figures.

### Named Rules
**The One Blackletter Rule.** Pirata One sets the school's name and nothing else. Headings, titles, and numbers never borrow it.

**The Margin Voice Rule.** Shantell Sans is a handwritten aside: one short line, slightly rotated, in amber ink or crest. It never sets body copy, buttons, labels, or headings.

## Layout

A centered 72rem container (80rem for the vision band) with 1.25rem gutters on phones and 2rem from tablet up. Sections breathe on a 5rem vertical rhythm on phones, 7rem to 8rem on desktop. Two-column moments use a 12-column grid: the home hero splits 7 and 5 (headline and pills left, photo stack right; stacked on phones with the headline first), mission sits in 3 and 9 with a sticky heading, contact and careers panels split 7 and 5.

The navigation floats as a pill inset 0.75rem from the viewport edges, 4rem tall, and hides on scroll down after 140px, returning on scroll up. Anchored scrolling leaves 6rem of top padding for it. Below the large breakpoint the nav collapses into a full-screen crest menu that opens as a circular wipe from the menu button.

Responsive shifts are structural rather than scaled: service strips become an expanding flex accordion on desktop and a snap-scrolling carousel of 72%-wide cards on phones; value notes reflow from one plus three pairs on phones to three plus four on desktop; level covers stack as sticky, overlapping pages from tablet up. The notebook sheet uses a 1.75rem ruled line with a 3rem margin rule, and its text line-height matches the ruling exactly. Breakpoints are Tailwind's defaults (640, 768, 1024, 1280px).

## Elevation & Depth

Depth is lifted paper. Surfaces sit on the grained ground and cast long, soft, negative-spread shadows tinted with crest night, as if sheets and photos were laid on a desk under daylight. Crest regions are flat color with no shadow of their own. Stickers carry a drop-shadow filter so the die-cut silhouette, not a box, casts the shade. The floating nav adds a translucent sheet fill with background blur and a hairline crest ring.

### Shadow Vocabulary
- **Sheet** (`box-shadow: 0 18px 40px -24px rgba(28, 31, 94, 0.35)`): Resting content sheets, value notes, service strips, nav pill, marquee band, photo-stack controls.
- **Lift** (`box-shadow: 0 24px 48px -20px rgba(28, 31, 94, 0.45)`): Objects that sit higher: level covers, the requirements clipboard, the notebook on Características, the WhatsApp button, the exam timer.
- **Polaroid** (`box-shadow: 0 22px 36px -18px rgba(28, 31, 94, 0.5)`): The white-framed photos in the hero stack.
- **Sticker** (`filter: drop-shadow(0 10px 12px rgba(28, 31, 94, 0.28))`): Every die-cut sticker.

### Named Rules
**The Crest-Tinted Shadow Rule.** Every shadow is soft, pulled below the object by a negative spread, and tinted crest night. No neutral black shadows, no hard offsets.

## Shapes

Round and friendly, with a clear ladder. Controls are full pills: buttons, nav links, the nav itself, language toggle, icon discs, logo discs. Cards and photo panels use gently rounded 16px corners; this is a deliberate cap, and it replaced the 24px the direction contract first named. Form fields use 12px, polaroid frames 14px with an 8px photo inside. Large crest regions use 2rem corners on phones and 3rem from tablet up, rounded only on the edge that meets paper (page intros round their bottom, the footer rounds its top, the vision band rounds all four).

Handmade tilt is the recurring silhouette: polaroids rest at -6° to 5°, value notes at -2.5° to 2.5°, level-name chips at -1.5°, the marquee band at -2°, the handwritten asides at -2° to -3°. The highlighter swipe is an irregular blob (asymmetric corner radii, rotated -1.5°) that covers the lower half of the word. The heading underline is a single hand-drawn stroke, 6 units thick with round caps. Stickers are raster die-cuts with a thick white border following their outline.

**The 16px Cap Rule.** No card, sheet, or photo panel rounds past 16px. Only full-width bands (2rem to 3rem) and pills go further.

## Components

### Buttons
Round, warm, and a little alive: an amber pill that floods with crest from wherever the pointer enters.
- **Shape:** Full pill (9999px), 48px minimum height, 12px by 24px padding, 16px semibold label, optional trailing arrow at 0.9em.
- **Primary:** Sunflower amber fill with crest-night text. The hero Admisión button is magnetic: on a mouse it drifts toward the pointer on a spring (strength 0.28, stiffness 220, damping 16).
- **Outline:** Transparent with a 2px crest stroke and crest text; floods crest with white text on hover.
- **Light:** Sheet white with crest text, for use on crest bands and beside photos; floods sunflower amber with crest-night text on hover.
- **Hover / Focus:** On fine pointers only, a circular fill grows from the pointer's entry point (260ms out, 480ms in, ease-out) and the label flips color. Keyboard focus shows the same fill centered plus the 3px crest focus outline. Pressing scales to 0.97 over 160ms. Disabled drops to 60% opacity.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** Sheet white for forms and panels; crest or amber for level covers; a rotation of amber, butter, sheet, crest, and mist for value notes.
- **Shadow Strategy:** Sheet at rest, Lift for level covers and the clipboard (see Elevation & Depth).
- **Border:** None; separation comes from shadow and tone.
- **Internal Padding:** 24px on phones, 32px to 40px on desktop; level covers 24px to 48px.

### Inputs / Fields
- **Style:** White interior, 1px crest stroke at 22% opacity, 12px corners, 10px by 14px padding, 15px text in notebook ink, placeholder in a muted crest-grey. Labels are 14px semibold crest.
- **Hover:** The stroke deepens to 45% crest.
- **Focus:** Solid crest stroke plus a 3px sunflower glow at 55% opacity.
- **Error / Disabled:** Invalid fields take the correction-red stroke. Disabled fields go to a pale grey-lilac fill with muted text and a not-allowed cursor. The datepicker inherits the field look with a crest-mist header and crest selected day.

### Navigation
- **Style:** A floating sheet-white pill (4rem tall, 90% opaque with background blur, sheet shadow, hairline crest ring) holding the crest logo and the blackletter wordmark ("CEVDA" below 1280px, the full name above).
- **Links:** 15px semibold crest labels in 44px pill hit areas; the current page sits on a bright-sunflower pill that slides between links (400ms ease-out). Hover shifts the label to a lighter crest on fine pointers.
- **Mobile:** A 48px crest menu button opens a full-screen crest panel as a circular wipe from the button (550ms). Links are 2.1rem extra-bold display type, staggering in at 50ms; the current page turns amber with a star sticker beside it. The panel traps focus, closes on Escape, and returns focus to the menu button. Its close button is a sunflower disc; the language toggle and WhatsApp link sit on a hairline-divided footer row.
- **Language toggle:** A pill with the target language's flag and "ES" or "EN".

### Page Intro (Signature Component)
Every inner route opens on a crest-blue header that rounds its bottom edge (2rem, then 3rem), with a display title (2.6rem to 4.5rem, max 16ch) underlined by the hand-drawn amber stroke, an optional crest-mist lead (max 58ch), and two stickers drifting on scroll parallax. Title and lead arrive with a small upward nudge from a visible default.

### Section Heading with Hand-Drawn Underline (Signature Component)
Headline type in crest (or white on crest) with a single amber stroke beneath, up to 14rem wide, that draws itself left to right when it enters the viewport (700ms ease-out, 150ms delay). Left-aligned by default, centered for the values section.

### Highlighter Swipe (Signature Component)
One word per page gets a sunflower amber swipe behind its lower half. With motion allowed, the swipe draws in from left after the headline lands (680ms ease-out, 420ms delay). Used on "Ángeles" in the home hero.

### Die-Cut Stickers (Signature Component)
Eight raster stickers (star, pencil, crown, block, plane, laurel, wing, clip), each generated with a white die-cut border and saved with a provenance sidecar. They sit absolutely around content, rotated, drifting on scroll parallax (10px to 48px) and bobbing gently (6s cycle, paused offscreen). With a mouse and motion allowed they can be grabbed and flung; they spring back to origin. Decorative only: always `aria-hidden`, never carrying meaning.

### Polaroid Photo Stack (Signature Component)
The home hero's five real school photos, each in a white 14px frame with a deep bottom margin, stacked with small offsets and resting tilts. The whole stack tilts toward a mouse pointer (up to 7° and 9°) on a spring; the top photo can be dragged or flicked to send it to the back, or tapped. Previous and next buttons (a sheet disc and a crest disc) sit below around a handwritten counter. With reduced motion it becomes a static grid: one wide photo over four squares.

### Values Marquee and Notes (Signature Component)
One amber band per site, tilted -2°, runs the value names in display type separated by star stickers. It drifts slowly and speeds up with scroll velocity, reversing with scroll direction, and pauses offscreen. Below it, seven value notes in rotating amber, butter, sheet, crest, and mist tones sit tilted with a sticker pinned at the corner; on fine-pointer hover a note straightens and lifts 6px.

### Notebook Paper (Signature Component)
A sheet-white page with blue ruled lines every 1.75rem and a lavender margin rule at 3rem, text locked to the ruling. Used for the Características list (amber icon discs beside each title) and the admission requirements, where it sits on a crest clipboard held by a clip sticker and each item gets a crest checkmark that draws in sequence (420ms each, 70ms stagger) when the sheet scrolls into view.

### Scroll-Lit Statement (Signature Component)
One paragraph per page in Statement type whose words brighten from 20% to full opacity as the reader scrolls through it. The full text is always present for screen readers; with reduced motion it renders as a plain paragraph.

### WhatsApp Button
A 56px palm-green disc with a white glyph and a 4px white ring, fixed bottom right on every page, Lift shadow. Tilts -6° on fine-pointer hover; presses to 0.97.

### Page Transitions
Route changes run through a view transition: the old page lifts and fades (320ms), the new page wipes up from the bottom with rounded top corners (560ms, starting at 140ms), over a crest curtain showing the crest logo on a white disc. With reduced motion the transition is a 160ms crossfade. Browsers without view transitions navigate instantly.

### Named Rules
**The Visible Default Rule.** In-flow content is readable before any animation runs. Arrivals are small upward nudges (12px to 40px) with ease-out; nothing in the page flow starts at zero opacity.

**The Springs Are For Hands Rule.** Spring physics belong only to things a hand can grab: the photo stack, draggable stickers, and the magnetic primary button. Everything else moves on ease-out curves.

**The Fine Pointer Rule.** Hover effects apply only when the device can hover with a fine pointer. Touch users get press feedback (scale 0.97) instead.

## Do's and Don'ts

### Do:
- **Do** fill whole regions with crest royal blue and round only the edge that meets paper (2rem on phones, 3rem from tablet up).
- **Do** make every forward action a sunflower amber pill, or an outline or sheet pill that floods crest on hover.
- **Do** use the school's own photographs and words: its photos, crest, mission, values, levels, and requirements.
- **Do** give each section heading the hand-drawn amber underline, and give at most one word per page the highlighter swipe.
- **Do** set handwritten asides in Shantell Sans, one short line, rotated -2° to -3°, in amber ink.
- **Do** tint every shadow with crest night and keep it soft with a negative spread.
- **Do** animate with ease-out (cubic-bezier(0.16, 1, 0.3, 1)) from a visible default, and provide a static fallback for every scroll-, drag-, or loop-driven effect under reduced motion.
- **Do** route internal links through the transition link so page changes pass behind the crest curtain.
- **Do** check every layout with both Spanish and English strings; Spanish is primary and usually longer.

### Don't:
- **Don't** use palm green or coral in UI fills, borders, or text; they belong to stickers, except palm on the WhatsApp button.
- **Don't** set sunflower amber as text on paper; use amber ink.
- **Don't** round cards, sheets, or photo panels past 16px.
- **Don't** fade in-flow content up from zero opacity.
- **Don't** put springs on anything that cannot be grabbed.
- **Don't** apply hover effects outside a hover-capable, fine-pointer device.
- **Don't** use Pirata One for anything but the school's name.
- **Don't** add more than one scroll-lit statement or more than one marquee to a page.
- **Don't** add testimonials, enrollment counts, rankings, accreditation badges, or stock photography; the school has none of those claims.
