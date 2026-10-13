<script lang="ts">
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
