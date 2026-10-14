import { redirect } from '@sveltejs/kit';
import { paths } from '#lib/i18n/paths.ts';
import { defaultLocale } from '#lib/i18n/locales.ts';

// The bare domain root has no locale segment of its own — send visitors straight to the default
// language's home page. SvelteKit's prerenderer bakes this into a static redirect page, so it
// works without a server.
export const load = () => {
	redirect(307, paths.home(defaultLocale));
};
