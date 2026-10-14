<script lang="ts">
	import { page } from '$app/state';
	import type { MonthlyAmortizationEntry } from '#lib/domain/calculator.ts';
	import { areaPath, linePath, pointsForSeries } from '#lib/domain/chartMath.ts';
	import { dateForScheduleMonth } from '#lib/domain/scheduleDate.ts';
	import type { Locale } from '#lib/i18n/locales.ts';
	import { intlLocale } from '#lib/i18n/locales.ts';
	import { messages } from '#lib/i18n/messages.ts';
	import ChartCard from '#lib/components/ChartCard.svelte';

	let { schedule, principal }: { schedule: MonthlyAmortizationEntry[]; principal: number } =
		$props();

	const lang = $derived(page.params.lang as Locale);
	const t = $derived(messages[lang].charts);

	const width = 600;
	// The line/area/dots are drawn in a 0..width / 0..plotHeight coordinate space, then the whole
	// group is inset from the viewBox edges by this much on every side — otherwise the start/end
	// dots (which have radius) get clipped exactly at the edges.
	const xPadding = 8;
	const topPadding = 8;
	// The plot itself only uses the top part of the viewBox — the bottom strip is reserved for the
	// year labels, which sit right on the x axis instead of crowding the curve.
	const plotHeight = 150;
	const axisY = plotHeight + 20;
	const height = topPadding + axisY + 10;

	// Prefixing with the principal gives the line a real starting point at month 0, instead of
	// jumping straight in at month 1's already-slightly-reduced balance.
	const values = $derived([principal, ...schedule.map((entry) => entry.remainingDebt)]);
	const points = $derived(
		pointsForSeries(values, { width, height: plotHeight, min: 0, max: principal || 1 })
	);
	const linePathD = $derived(linePath(points));
	const areaPathD = $derived(areaPath(points, width, plotHeight));

	const yearFormat = $derived(new Intl.DateTimeFormat(intlLocale(lang), { year: 'numeric' }));
	const startYear = $derived(yearFormat.format(dateForScheduleMonth(1)));
	const endYear = $derived(yearFormat.format(dateForScheduleMonth(Math.max(schedule.length, 1))));

	const currency = $derived(
		new Intl.NumberFormat(intlLocale(lang), {
			style: 'currency',
			currency: 'EUR',
			notation: 'compact',
			maximumFractionDigits: 0
		})
	);

	interface YearMark {
		x: number;
		topY: number;
		year: number;
		value: string;
	}

	// A handful of evenly-spaced "callout" marks along the line (roughly every quarter of the
	// term) — a dashed line up from the axis to the curve at that year, with the remaining debt
	// at that point, so you can read off a concrete number without hovering/guessing from the
	// curve's shape alone.
	const yearMarks = $derived.by<YearMark[]>(() => {
		const totalYears = Math.round(schedule.length / 12);
		if (totalYears < 2 || points.length < 3) return [];

		const interval = Math.max(1, Math.round(totalYears / 4));
		const marks: YearMark[] = [];
		for (let year = interval; year < totalYears; year += interval) {
			const index = year * 12;
			if (index <= 0 || index >= points.length - 1) continue;
			marks.push({
				x: points[index].x,
				topY: points[index].y,
				year: dateForScheduleMonth(index).getFullYear(),
				value: currency.format(values[index])
			});
		}
		return marks;
	});
</script>

<ChartCard title={t.restschuldverlaufTitle}>
	<svg
		class="chart"
		viewBox="0 0 {width + xPadding * 2} {height}"
		style:aspect-ratio="{width + xPadding * 2} / {height}"
	>
		<g transform="translate({xPadding}, {topPadding})">
			<line x1="0" y1={plotHeight * 0.25} x2={width} y2={plotHeight * 0.25} class="chart__grid" />
			<line x1="0" y1={plotHeight * 0.5} x2={width} y2={plotHeight * 0.5} class="chart__grid" />
			<line x1="0" y1={plotHeight * 0.75} x2={width} y2={plotHeight * 0.75} class="chart__grid" />
			<path d={areaPathD} class="chart__area" />
			{#each yearMarks as mark (mark.year)}
				<line x1={mark.x} y1={plotHeight} x2={mark.x} y2={mark.topY} class="chart__mark-line" />
			{/each}
			<path d={linePathD} class="chart__line" />
			{#if points.length > 0}
				<circle cx={points[0].x} cy={points[0].y} r="4" class="chart__dot" />
				<circle cx={points.at(-1)?.x} cy={points.at(-1)?.y} r="4" class="chart__dot" />
			{/if}
			{#each yearMarks as mark (mark.year)}
				<text
					x={mark.x}
					y={Math.max(14, mark.topY - 8)}
					text-anchor="middle"
					class="chart__mark-value">{mark.value}</text
				>
			{/each}
			<text x="0" y={axisY} text-anchor="start" class="chart__axis-label">{startYear}</text>
			{#each yearMarks as mark (mark.year)}
				<text x={mark.x} y={axisY} text-anchor="middle" class="chart__axis-label"
					>{mark.year}</text
				>
			{/each}
			<text x={width} y={axisY} text-anchor="end" class="chart__axis-label">{endYear}</text>
		</g>
	</svg>
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

	.chart__area {
		fill: var(--color-mint);
		opacity: 0.14;
	}

	.chart__line {
		fill: none;
		stroke: var(--color-mint-dark);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.chart__dot {
		fill: var(--color-mint-dark);
	}

	.chart__mark-line {
		stroke: var(--color-text-muted);
		stroke-width: 1;
		stroke-dasharray: 3 3;
		opacity: 0.6;
	}

	.chart__mark-value {
		font-size: 10px;
		font-weight: 700;
		fill: var(--color-text);
	}

	.chart__axis-label {
		font-size: 11px;
		font-weight: 600;
		fill: var(--color-text-muted);
	}
</style>
