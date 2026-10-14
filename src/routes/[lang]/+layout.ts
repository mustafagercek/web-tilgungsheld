import { error } from '@sveltejs/kit';
import { isLocale } from '#lib/i18n/locales.ts';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	if (!isLocale(params.lang)) {
		error(404, 'Not found');
	}
	return { lang: params.lang };
};
