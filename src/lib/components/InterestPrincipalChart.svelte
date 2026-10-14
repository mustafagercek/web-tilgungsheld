<script lang="ts">
	import { page } from '$app/state';
	import type { MonthlyAmortizationEntry } from '#lib/domain/calculator.ts';
	import { linePath, pointsForSeries } from '#lib/domain/chartMath.ts';
	import { dateForScheduleMonth } from '#lib/domain/scheduleDate.ts';
	import type { Locale } from '#lib/i18n/locales.ts';
	import { intlLocale } from '#lib/i18n/locales.ts';
	import { messages } from '#lib/i18n/messages.ts';
	import ChartCard from '#lib/components/ChartCard.svelte';

	let { schedule }: { schedule: MonthlyAmortizationEntry[] } = $props();

	const lang = $derived(page.params.lang as Locale);
	const t = $derived(messages[lang].charts);

	// The final payment is usually a smaller, odd-sized leftover (just enough to zero out the
	// remaining balance), which makes both lines jump right at the very end — dropping it keeps
	// the chart reading as the clean, steady crossover it actually is.
	const entries = $derived(schedule.length > 1 ? schedule.slice(0, -1) : schedule);

	const width = 600;
	// The lines are drawn in a 0..width / 0..plotHeight coordinate space, then the whole group is
	// inset from the viewBox edges by this much on every side, so nothing sitting right at an edge
	// (dots, stroke width) gets clipped by the viewBox boundary.
	const xPadding = 8;
	const topPadding = 8;
	// The plot itself only uses the top part of the viewBox — the bottom strip is reserved for the
	// year labels, which sit right on the x axis instead of crowding the curves.
	const plotHeight = 150;
	const axisY = plotHeight + 20;
	const height = topPadding + axisY + 10;

	const interestValues = $derived(entries.map((entry) => entry.interestAmount));
	const principalValues = $derived(entries.map((entry) => entry.principalAmount));
	const maxValue = $derived(Math.max(1, ...interestValues, ...principalValues));

	const scale = $derived({ width, height: plotHeight, min: 0, max: maxValue });
	const interestPoints = $derived(pointsForSeries(interestValues, scale));
	const principalPoints = $derived(pointsForSeries(principalValues, scale));
	const interestPathD = $derived(linePath(interestPoints));
	const principalPathD = $derived(linePath(principalPoints));

	// The payment is fixed and interest strictly falls while principal strictly rises, so there's
	// exactly one crossover — the month the "flip" happens from paying mostly interest to mostly
	// principal. When the amortization rate is already higher than the interest rate, that crossover
	// is at month 1 — there's nothing to "flip" into, so the annotation instead states by how much
	// the gap already is from the very first payment.
	const crossoverIndex = $derived(
		entries.findIndex((entry) => entry.principalAmount >= entry.interestAmount)
	);
	const crossesFromTheStart = $derived(crossoverIndex === 0);

	const crossoverX = $derived(
		crossoverIndex > 0 && entries.length > 1
			? (crossoverIndex / (entries.length - 1)) * width
			: null
	);

	const crossoverY = $derived(
		crossoverIndex > 0
			? (interestPoints[crossoverIndex].y + principalPoints[crossoverIndex].y) / 2
			: null
	);

	const currency = $derived(
		new Intl.NumberFormat(intlLocale(lang), {
			style: 'currency',
			currency: 'EUR',
			maximumFractionDigits: 0
		})
	);
	const monthFormat = $derived(
		new Intl.DateTimeFormat(intlLocale(lang), { month: 'short', year: 'numeric' })
	);

	const crossoverLabel = $derived(
		crossoverIndex > 0
			? monthFormat.format(dateForScheduleMonth(entries[crossoverIndex].month))
			: null
	);

	const startGap = $derived(
		crossesFromTheStart && entries.length > 0
			? currency.format(entries[0].principalAmount - entries[0].interestAmount)
			: null
	);

	interface YearMark {
		x: number;
		topY: number;
		year: number;
		interestLabel: string;
		principalLabel: string;
	}

	// Same "callout" idea as the Restschuldverlauf chart: a handful of evenly-spaced years with the
	// actual Zinsen/Tilgung split at that point, so the crossover isn't the only concrete number on
	// the chart.
	const yearMarks = $derived.by<YearMark[]>(() => {
		const totalYears = Math.round(entries.length / 12);
		if (totalYears < 2 || entries.length < 3) return [];

		const interval = Math.max(1, Math.round(totalYears / 4));
		const marks: YearMark[] = [];
		for (let year = interval; year < totalYears; year += interval) {
			const index = year * 12;
			if (index <= 0 || index >= entries.length - 1) continue;
			marks.push({
				x: interestPoints[index].x,
				topY: Math.min(interestPoints[index].y, principalPoints[index].y),
				year: dateForScheduleMonth(entries[index].month).getFullYear(),
				interestLabel: currency.format(interestValues[index]),
				principalLabel: currency.format(principalValues[index])
			});
		}
		return marks;
	});
</script>

{#snippet legend()}
	<span class="chart-legend-item"
		><i class="chart-swatch chart-swatch--interest"></i>{t.zinsenLegend}</span
	>
	<span class="chart-legend-item"
		><i class="chart-swatch chart-swatch--principal"></i>{t.tilgungLegend}</span
	>
{/snippet}

<ChartCard title={t.zinsenTilgungTitle} {legend}>
	<svg
		class="chart"
		viewBox="0 0 {width + xPadding * 2} {height}"
		style:aspect-ratio="{width + xPadding * 2} / {height}"
	>
		<g transform="translate({xPadding}, {topPadding})">
			<line x1="0" y1={plotHeight * 0.5} x2={width} y2={plotHeight * 0.5} class="chart__grid" />
			{#if crossoverX !== null}
				<line
					x1={crossoverX}
					y1="0"
					x2={crossoverX}
					y2={plotHeight}
					class="chart__crossover-line"
				/>
			{/if}
			{#each yearMarks as mark (mark.year)}
				<line x1={mark.x} y1={plotHeight} x2={mark.x} y2={mark.topY} class="chart__mark-line" />
			{/each}
			<path d={interestPathD} class="chart__line chart__line--interest" />
			<path d={principalPathD} class="chart__line chart__line--principal" />
			{#if crossoverX !== null}
				<circle cx={crossoverX} cy={crossoverY} r="3.5" class="chart__crossover-dot" />
			{/if}
			{#each yearMarks as mark (mark.year)}
				{@const textBaseY = Math.max(24, mark.topY - 8)}
				<text x={mark.x} y={textBaseY - 11} text-anchor="middle" class="chart__mark-interest"
					>{mark.interestLabel}</text
				>
				<text x={mark.x} y={textBaseY} text-anchor="middle" class="chart__mark-principal"
					>{mark.principalLabel}</text
				>
			{/each}
			{#each yearMarks as mark (mark.year)}
				<text x={mark.x} y={axisY} text-anchor="middle" class="chart__axis-label"
					>{mark.year}</text
				>
			{/each}
		</g>
	</svg>
	{#if crossoverLabel}
		<p class="chart__annotation">
			{t.crossoverText.before}<strong>{crossoverLabel}</strong>{t.crossoverText.after}
		</p>
	{:else if startGap}
		<p class="chart__annotation">
			{t.startGapText.before}<strong>{startGap}</strong>{t.startGapText.after}
		</p>
	{/if}
</ChartCard>

<style>
	.chart {
		display: block;
		width: 100%;
		height: auto;
		font-family: var(--font-sans);
	}

	.chart__grid {
		stroke: var(--color-border);
		stroke-width: 1;
	}

	.chart__crossover-line {
		stroke: var(--color-text-muted);
		stroke-width: 1;
		stroke-dasharray: 4 4;
	}

	.chart__line {
		fill: none;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.chart__line--interest {
		stroke: #c2650a;
	}

	.chart__line--principal {
		stroke: var(--color-mint-dark);
	}

	.chart__crossover-dot {
		fill: var(--color-surface);
		stroke: var(--color-text-muted);
		stroke-width: 1.5;
	}

	.chart__mark-line {
		stroke: var(--color-text-muted);
		stroke-width: 1;
		stroke-dasharray: 3 3;
		opacity: 0.6;
	}

	.chart__mark-interest,
	.chart__mark-principal {
		font-size: 10px;
		font-weight: 700;
	}

	.chart__mark-interest {
		fill: #c2650a;
	}

	.chart__mark-principal {
		fill: var(--color-mint-dark);
	}

	.chart__axis-label {
		font-size: 11px;
		font-weight: 600;
		fill: var(--color-text-muted);
	}

	.chart__annotation {
		margin-top: 10px;
		font-size: 12.5px;
		color: var(--color-text-muted);
	}

	.chart__annotation strong {
		color: var(--color-text);
	}

	:global(.chart-legend-item) {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	:global(.chart-swatch) {
		display: inline-block;
		width: 9px;
		height: 9px;
		border-radius: 2px;
	}

	:global(.chart-swatch--interest) {
		background: #c2650a;
	}

	:global(.chart-swatch--principal) {
		background: var(--color-mint-dark);
	}
</style>
