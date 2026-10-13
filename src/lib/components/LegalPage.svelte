<script lang="ts">
	import LogoMark from '#lib/components/LogoMark.svelte';

	let {
		title,
		lastUpdated,
		sections
	}: {
		title: string;
		lastUpdated: string;
		sections: { title: string; body: string }[];
	} = $props();
</script>

<header class="nav">
	<div class="container nav__inner">
		<a href="/" class="nav__brand">
			<LogoMark size={36} />
			<span>Tilgungsfreund</span>
		</a>
		<a href="/" class="back">← Zurück</a>
	</div>
</header>

<main class="container legal">
	<h1>{title}</h1>
	<p class="updated">{lastUpdated}</p>

	{#each sections as section (section.title)}
		<section>
			<h2>{section.title}</h2>
			<p>{section.body}</p>
		</section>
	{/each}
</main>

<style>
	.nav {
		border-bottom: 1px solid var(--color-border);
	}

	.nav__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
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

	.back {
		font-size: 14.5px;
		font-weight: 500;
		color: var(--color-text-muted);
		text-decoration: none;
	}

	.back:hover {
		color: var(--color-text);
	}

	.legal {
		max-width: 720px;
		padding-block: 64px 96px;
	}

	.legal h1 {
		font-size: clamp(1.8rem, 3.5vw, 2.4rem);
		font-weight: 800;
		letter-spacing: -0.01em;
	}

	.updated {
		margin-top: 8px;
		color: var(--color-text-muted);
		font-size: 14px;
	}

	.legal section {
		margin-top: 36px;
	}

	.legal h2 {
		font-size: 17px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.legal p {
		font-size: 15px;
		line-height: 1.65;
		color: var(--color-text-muted);
	}
</style>
