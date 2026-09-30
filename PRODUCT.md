# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Dominican parents, mostly on phones, comparing schools for a child between 45 days and 10 years old. They need to trust the school, then start admission or get in touch.

Secondary: job applicants (Carreras), adults interested in INFOTEP courses, and families taking the English placement exam.

## Product Purpose

The public website of Centro Educativo Villa de Ángeles (CEVDA), a private school in Santo Domingo Este. It presents the school's mission, values, levels, and activities, and collects admission requests, job applications, contact messages, and English exam submissions. Success is a parent who understands what the school offers and starts admission or contacts the school.

## Positioning

A small community school offering Nivel Inicial (45 días a 5 años) and Nivel Primario (6 a 10 años), with a semi-boarding program and extracurriculars that include robotics, programming, computer science, English, flute, ballet, and early stimulation. It is also an INFOTEP course site.

## Operating Context

- Bilingual site (Spanish default, English), translated through i18next locale files in `frontend/public/locales`.
- Forms post to an email handler with reCAPTCHA v3; the admission form has a printable version.
- WhatsApp is the most direct contact channel.

## Capabilities and Constraints

- Routes: `/`, `/admision`, `/caracteristicas`, `/infotep`, `/carreras`, `/contacto`, `/examen-ingles`. Slugs and form fields are fixed.
- React 18, Vite, Tailwind CSS 3, React Router 7.

## Brand Commitments

- The crest (royal-blue shield with angel wings, crown, and laurels) in `frontend/src/assets/cevda_logo_tr.png`.
- The school name set in a blackletter face.
- Blue and amber as brand colors.
- Existing copy voice: warm, formal Spanish addressed to families.

## Evidence on Hand

- Real photos: `frontend/src/assets/carousel/*`, `frontend/src/assets/services/*`, `frontend/src/assets/careers/*`.
- Mission, vision, seven values, levels, extracurriculars, and admission requirements in the locale files.
- No testimonials, enrollment numbers, rankings, or accreditation claims exist. Do not invent them.

## Product Principles

1. Trust first: parents are handing over their children; every page should feel safe and cared for.
2. Real material only: show the school's own photos and words, never invented proof.
3. The next step is always visible: admission and contact are one tap away.
4. Spanish first, English equal: every string works in both languages.

## Accessibility & Inclusion

Parents browse on mid-range phones and variable connections. Keep pages fast, readable in daylight, fully keyboard accessible, and respectful of reduced-motion preferences.
