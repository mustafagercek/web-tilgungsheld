<script lang="ts">
	/*
	 * Ported from the iOS app's `PaymentScheduleView`: grouped by year, a year collapses to a
	 * totals row until tapped, then opens back up to its monthly rows. There's no real persisted
	 * start date here (this is the standalone web calculator, not a saved loan), so the schedule is
	 * treated as starting this month — which also means "current month" is always the very first
	 * row, so the first year starts out expanded instead of scrolling to find it.
	 */
	import { page } from '$app/state';
	import type { MonthlyAmortizationEntry } from '#lib/domain/calculator.ts';
	import { dateForScheduleMonth } from '#lib/domain/scheduleDate.ts';
	import type { Locale } from '#lib/i18n/locales.ts';
	import { intlLocale } from '#lib/i18n/locales.ts';
	import { messages } from '#lib/i18n/messages.ts';

	let { schedule }: { schedule: MonthlyAmortizationEntry[] } = $props();

	const lang = $derived(page.params.lang as Locale);
	const t = $derived(messages[lang].plan);

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
	const startYear = new Date().getFullYear();

	interface YearGroup {
		year: number;
		entries: MonthlyAmortizationEntry[];
		totalInterest: number;
		totalPrincipal: number;
		endingBalance: number;
	}

	const yearGroups = $derived.by<YearGroup[]>(() => {
		const byYear = new Map<number, MonthlyAmortizationEntry[]>();
		for (const entry of schedule) {
			const year = dateForScheduleMonth(entry.month).getFullYear();
			const group = byYear.get(year);
			if (group) {
				group.push(entry);
			} else {
				byYear.set(year, [entry]);
			}
		}
		return [...byYear.entries()]
			.sort(([a], [b]) => a - b)
			.map(([year, entries]) => ({
				year,
				entries,
				totalInterest: entries.reduce((sum, entry) => sum + entry.interestAmount, 0),
				totalPrincipal: entries.reduce((sum, entry) => sum + entry.principalAmount, 0),
				endingBalance: entries.at(-1)?.remainingDebt ?? 0
			}));
	});

	let expandedYear = $state<number | null>(startYear);

	function toggleYear(year: number) {
		expandedYear = expandedYear === year ? null : year;
	}
</script>

<div class="plan">
	{#each yearGroups as group (group.year)}
		{@const expanded = expandedYear === group.year}
		<div class="plan__year-row" class:plan__year-row--expanded={expanded}>
			<button type="button" class="plan__year-toggle" onclick={() => toggleYear(group.year)}>
				<span class="plan__chevron" class:plan__chevron--open={expanded}>›</span>
				<span class="plan__year-label">{group.year}</span>
				<span class="plan__spacer"></span>
				<span class="plan__figure plan__figure--interest">
					<strong>{currency.format(group.totalInterest)}</strong>
					<small>{t.zinsen}</small>
				</span>
				<span class="plan__figure plan__figure--principal">
					<strong>{currency.format(group.totalPrincipal)}</strong>
					<small>{t.tilgung}</small>
				</span>
				<span class="plan__figure">
					<strong>{currency.format(group.endingBalance)}</strong>
					<small>{t.restschuld}</small>
				</span>
			</button>
		</div>

		{#if expanded}
			{#each group.entries as entry, index (entry.month)}
				<div class="plan__month-row">
					<span class="plan__month-label">
						{monthFormat.format(dateForScheduleMonth(entry.month))}
					</span>
					<span class="plan__spacer"></span>
					<span class="plan__figure plan__figure--interest">
						<strong>{currency.format(entry.interestAmount)}</strong>
						<small>{t.zinsen}</small>
					</span>
					<span class="plan__figure plan__figure--principal">
						<strong>{currency.format(entry.principalAmount)}</strong>
						<small>{t.tilgung}</small>
					</span>
					<span class="plan__figure">
						<strong>{currency.format(entry.remainingDebt)}</strong>
						<small>{t.restschuld}</small>
					</span>
				</div>
				{#if index < group.entries.length - 1}<hr class="plan__divider" />{/if}
			{/each}
		{/if}
	{/each}
</div>

<style>
	.plan {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-card);
		padding: 8px 28px;
	}

	.plan__year-row + .plan__year-row {
		border-top: 1px solid var(--color-border);
	}

	.plan__year-toggle {
		all: unset;
		display: flex;
		align-items: center;
		width: 100%;
		gap: 10px;
		padding-block: 16px;
		cursor: pointer;
	}

	.plan__chevron {
		font-size: 18px;
		font-weight: 700;
		color: var(--color-text-muted);
		transition: transform 0.2s ease;
		width: 12px;
		flex-shrink: 0;
	}

	.plan__chevron--open {
		transform: rotate(90deg);
	}

	.plan__year-label {
		font-size: 15px;
		font-weight: 700;
		width: 48px;
		flex-shrink: 0;
	}

	.plan__spacer {
		flex: 1;
	}

	.plan__figure {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 1px;
		min-width: 76px;
	}

	.plan__figure strong {
		font-size: 13.5px;
		font-weight: 700;
		color: var(--color-text);
	}

	.plan__figure--interest strong {
		color: #c2650a;
	}

	.plan__figure--principal strong {
		color: var(--color-mint-dark);
	}

	.plan__figure small {
		font-size: 10.5px;
		font-weight: 500;
		color: var(--color-text-muted);
	}

	.plan__month-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 0 8px 22px;
	}

	.plan__month-label {
		font-size: 12.5px;
		font-weight: 500;
		color: var(--color-text-muted);
		width: 64px;
		flex-shrink: 0;
	}

	.plan__divider {
		border: none;
		border-top: 1px solid var(--color-border);
	}

	@media (max-width: 560px) {
		.plan {
			padding-inline: 16px;
		}

		.plan__figure {
			min-width: 58px;
		}

		.plan__figure strong {
			font-size: 12px;
		}
	}
</style>
