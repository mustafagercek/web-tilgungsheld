import { resolve } from '$app/paths';
import type { Locale } from '#lib/i18n/locales.ts';

/**
 * One function per actual route, rather than building the route id string dynamically — `resolve`
 * is typed against the exact literal route ids SvelteKit generates, so a templated string
 * wouldn't type-check against it.
 */
export const paths = {
	home: (lang: Locale) => resolve('/[lang]', { lang }),
	tilgungsrechner: (lang: Locale) => resolve('/[lang]/tilgungsrechner', { lang }),
	datenschutz: (lang: Locale) => resolve('/[lang]/datenschutz', { lang }),
	nutzungsbedingungen: (lang: Locale) => resolve('/[lang]/nutzungsbedingungen', { lang }),
	impressum: (lang: Locale) => resolve('/[lang]/impressum', { lang })
};
