<script lang="ts">
	import { resolve } from '$app/paths';
	import LogoMark from '#lib/components/LogoMark.svelte';

	const home = resolve('/');
</script>

<!--
  Rendered once from the root layout so every route shares the exact same nav — a dedicated,
  stripped-down header per subpage (as `/tilgungsrechner` and the legal pages used to have) made
  navigating between them feel like leaving the site rather than moving within it.
-->
<header class="nav">
	<div class="container nav__inner">
		<a href={home} class="nav__brand">
			<LogoMark size={36} />
			<span>Tilgungsheld</span>
		</a>
		<nav class="nav__links">
			<a href="{home}#funktionen">Funktionen</a>
			<a href="{home}#rechner">Rechner</a>
			<a href="{home}#privatsphaere">Privatsphäre</a>
			<a href="{home}#kontakt">Kontakt</a>
		</nav>
		<a href="{home}#download" class="button button--primary nav__cta">App laden</a>
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
