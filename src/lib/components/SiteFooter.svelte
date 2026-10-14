<script lang="ts">
	import { page } from '$app/state';
	import { paths } from '#lib/i18n/paths.ts';
	import type { Locale } from '#lib/i18n/locales.ts';
	import { messages } from '#lib/i18n/messages.ts';
	import LogoMark from '#lib/components/LogoMark.svelte';

	const lang = $derived(page.params.lang as Locale);
	const t = $derived(messages[lang]);
</script>

<footer class="footer" id="kontakt">
	<div class="container footer__inner">
		<div class="nav__brand footer__brand">
			<LogoMark size={28} inverted />
			<span>Tilgungsheld</span>
		</div>
		<nav class="footer__links">
			<a href={paths.impressum(lang)}>{t.footer.impressum}</a>
			<a href={paths.datenschutz(lang)}>{t.footer.datenschutz}</a>
			<a href={paths.nutzungsbedingungen(lang)}>{t.footer.nutzungsbedingungen}</a>
			<a href="mailto:mustafa.gercek@nicetoapp.de">{t.footer.kontakt}</a>
		</nav>
		<p class="footer__copy">{t.footer.copyright(new Date().getFullYear())}</p>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-border);
		padding-block: 32px;
	}

	.footer__inner {
		display: flex;
		align-items: center;
		gap: 24px;
		flex-wrap: wrap;
	}

	.nav__brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-weight: 700;
		text-decoration: none;
		color: var(--color-text);
	}

	.footer__brand {
		font-size: 15px;
	}

	.footer__links {
		display: flex;
		gap: 20px;
		margin-inline-end: auto;
		font-size: 14px;
	}

	.footer__links a {
		text-decoration: none;
		color: var(--color-text-muted);
	}

	.footer__links a:hover {
		color: var(--color-text);
	}

	.footer__copy {
		font-size: 13px;
		color: var(--color-text-muted);
	}
</style>
