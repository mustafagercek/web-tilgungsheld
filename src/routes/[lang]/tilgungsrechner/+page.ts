import { locales } from '#lib/i18n/locales.ts';

// Tells the prerenderer both locales exist for this page — `entries` is only valid in +page.ts
// (not +layout.ts), so every leaf page under [lang] declares this itself.
export const entries = () => locales.map((lang) => ({ lang }));

// This page reads the real query string on first render (to carry over the landing page's
// "Berechnen" inputs) — SSR has no real query string for a prerendered static page, so turning it
// off here means the very first thing rendered is already correct, instead of flashing the
// defaults before the client picks up the actual URL.
export const ssr = false;
