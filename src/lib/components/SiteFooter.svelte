<script lang="ts">
	import { resolve } from '$app/paths';
	import LogoMark from '#lib/components/LogoMark.svelte';
</script>

<footer class="footer" id="kontakt">
	<div class="container footer__inner">
		<div class="nav__brand footer__brand">
			<LogoMark size={28} />
			<span>Tilgungsheld</span>
		</div>
		<nav class="footer__links">
			<a href={resolve('/datenschutz')}>Datenschutz</a>
			<a href={resolve('/nutzungsbedingungen')}>Nutzungsbedingungen</a>
			<a href="mailto:mustafa.gercek@nicetoapp.de">Kontakt</a>
		</nav>
		<p class="footer__copy">© {new Date().getFullYear()} Tilgungsheld</p>
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
