<script lang="ts">
	import { page } from '$app/state';
	import type { Locale } from '#lib/i18n/locales.ts';
	import { messages } from '#lib/i18n/messages.ts';
	import LegalPage from '#lib/components/LegalPage.svelte';

	const lang = $derived(page.params.lang as Locale);
	const t = $derived(messages[lang].legal.datenschutz);
</script>

<svelte:head>
	<title>{t.metaTitle}</title>
</svelte:head>

<LegalPage title={t.title} lastUpdated={t.lastUpdated} sections={t.sections} />
