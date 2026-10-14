<script lang="ts">
	import { page } from '$app/state';
	import { paths } from '#lib/i18n/paths.ts';
	import type { Locale } from '#lib/i18n/locales.ts';
	import { messages } from '#lib/i18n/messages.ts';
	import LogoMark from '#lib/components/LogoMark.svelte';

	const lang = $derived(page.params.lang as Locale);
	const t = $derived(messages[lang]);

	const home = $derived(paths.home(lang));
	const rechner = $derived(paths.tilgungsrechner(lang));

	const otherLang = $derived<Locale>(lang === 'de' ? 'en' : 'de');
	// Switches to the same page in the other language, not just its home page.
	const switchHref = $derived.by(() => {
		switch (page.route.id) {
			case '/[lang]/tilgungsrechner':
				return paths.tilgungsrechner(otherLang);
			case '/[lang]/datenschutz':
				return paths.datenschutz(otherLang);
			case '/[lang]/nutzungsbedingungen':
				return paths.nutzungsbedingungen(otherLang);
			case '/[lang]/impressum':
				return paths.impressum(otherLang);
			default:
				return paths.home(otherLang);
		}
	});
</script>

<!--
  Rendered once from the root layout so every route shares the exact same nav — a dedicated,
  stripped-down header per subpage (as `/tilgungsrechner` and the legal pages used to have) made
  navigating between them feel like leaving the site rather than moving within it.
-->
<header class="nav">
	<div class="container nav__inner">
		<a href={home} class="nav__brand">
			<LogoMark size={36} inverted />
			<span>Tilgungsheld</span>
		</a>
		<nav class="nav__links">
			<a href={rechner} class:active={page.route.id === '/[lang]/tilgungsrechner'}
				>{t.nav.rechner}</a
			>
		</nav>
		<a href={switchHref} class="nav__lang" aria-label="{lang === 'de' ? 'English' : 'Deutsch'}"
			>{otherLang.toUpperCase()}</a
		>
		<a href="{home}#download" class="button button--primary nav__cta">{t.nav.appLaden}</a>
	</div>
</header>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 10;
		background: rgba(248, 250, 252, 0.8);
		backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border);
	}

	.nav__inner {
		display: flex;
		align-items: center;
		gap: 24px;
		padding-block: 14px;
	}

	.nav__brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-weight: 700;
		font-size: 17px;
		text-decoration: none;
		color: var(--color-text);
	}

	.nav__links {
		display: flex;
		gap: 28px;
		margin-inline: auto;
		font-size: 14.5px;
		font-weight: 500;
	}

	.nav__links a {
		text-decoration: none;
		color: var(--color-text-muted);
		transition: color 0.15s ease;
	}

	.nav__links a:hover {
		color: var(--color-text);
	}

	.nav__links a.active {
		color: var(--color-text);
		font-weight: 700;
		border-bottom: 2px solid var(--color-mint-dark);
		padding-bottom: 2px;
	}

	.nav__lang {
		text-decoration: none;
		color: var(--color-text-muted);
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.02em;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		padding: 5px 10px;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.nav__lang:hover {
		color: var(--color-text);
		border-color: var(--color-text-muted);
	}

	.nav__cta {
		padding: 10px 18px;
		font-size: 14px;
	}

	@media (max-width: 860px) {
		.nav__links {
			display: none;
		}
	}
</style>
