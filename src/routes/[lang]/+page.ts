import { locales } from '#lib/i18n/locales.ts';

// Tells the prerenderer both locales exist for this page — `entries` is only valid in +page.ts
// (not +layout.ts), so every leaf page under [lang] declares this itself.
export const entries = () => locales.map((lang) => ({ lang }));
