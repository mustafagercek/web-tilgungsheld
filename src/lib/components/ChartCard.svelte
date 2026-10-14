<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		legend,
		children
	}: { title: string; legend?: Snippet; children: Snippet } = $props();
</script>

<div class="chart-card">
	<div class="chart-card__header">
		<span class="chart-card__title">{title}</span>
		{#if legend}
			<div class="chart-card__legend">{@render legend()}</div>
		{/if}
	</div>
	<div class="chart-card__body">
		{@render children()}
	</div>
</div>

<style>
	.chart-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-card);
		padding: 24px 28px 28px;
	}

	.chart-card__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}

	.chart-card__title {
		font-size: 14.5px;
		font-weight: 700;
		color: var(--color-text);
	}

	.chart-card__legend {
		display: flex;
		gap: 14px;
		font-size: 12px;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.chart-card__body {
		margin-top: 16px;
	}
</style>
