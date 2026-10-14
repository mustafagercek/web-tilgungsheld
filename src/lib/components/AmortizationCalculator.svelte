<script lang="ts">
	import { page } from '$app/state';
	import { calculateForRepaymentInput, type RepaymentMode } from '#lib/domain/calculator.ts';
	import { dateForScheduleMonth } from '#lib/domain/scheduleDate.ts';
	import type { Locale } from '#lib/i18n/locales.ts';
	import { intlLocale } from '#lib/i18n/locales.ts';
	import { messages } from '#lib/i18n/messages.ts';
	import { paths } from '#lib/i18n/paths.ts';
	import PercentageSlider from '#lib/components/PercentageSlider.svelte';
	import CurrencyAmountField from '#lib/components/CurrencyAmountField.svelte';
	import LabeledValueField from '#lib/components/LabeledValueField.svelte';

	let {
		principal = $bindable(200_000),
		interestRate = $bindable(4.2),
		repaymentMode = $bindable<RepaymentMode>('amortizationRate'),
		amortizationRate = $bindable(2.0),
		desiredDurationYears = $bindable(25),
		desiredMonthlyPayment = $bindable(1_000),
		showCalculateLink = false
	}: {
		principal?: number;
		interestRate?: number;
		repaymentMode?: RepaymentMode;
		amortizationRate?: number;
		desiredDurationYears?: number;
		desiredMonthlyPayment?: number;
		showCalculateLink?: boolean;
	} = $props();

	const lang = $derived(page.params.lang as Locale);
	const t = $derived(messages[lang].calculator);

	const modes: { mode: RepaymentMode; label: string }[] = $derived([
		{ mode: 'amortizationRate', label: t.modeAmortizationRate },
		{ mode: 'desiredDuration', label: t.modeDesiredDuration },
		{ mode: 'desiredMonthlyPayment', label: t.modeDesiredMonthlyPayment }
	]);

	const result = $derived(
		calculateForRepaymentInput(principal, interestRate, {
			mode: repaymentMode,
			amortizationRatePercent: amortizationRate,
			desiredDurationYears,
			desiredMonthlyPayment
		})
	);

	const currency = $derived(
		new Intl.NumberFormat(intlLocale(lang), {
			style: 'currency',
			currency: 'EUR',
			maximumFractionDigits: 0
		})
	);

	const payoffDateFormat = $derived(
		new Intl.DateTimeFormat(intlLocale(lang), { month: 'short', year: 'numeric' })
	);
	const payoffDate = $derived(
		result.totalMonths > 0 ? payoffDateFormat.format(dateForScheduleMonth(result.totalMonths)) : '—'
	);

	const calculatorHref = $derived(
		`${paths.tilgungsrechner(lang)}?principal=${principal}&interestRate=${interestRate}&mode=${repaymentMode}&amortizationRate=${amortizationRate}&durationYears=${desiredDurationYears}&monthlyPayment=${desiredMonthlyPayment}`
	);
</script>

<div class="calculator__grid">
	<div class="card inputs">
		<div class="principal-field">
			<span class="principal-field__label">{t.principalLabel}</span>
			<CurrencyAmountField bind:value={principal} locale={intlLocale(lang)} />
		</div>
		<PercentageSlider
			label={t.interestRateLabel}
			bind:value={interestRate}
			decrementLabel={t.decrementAria}
			incrementLabel={t.incrementAria}
		/>

		<div class="repayment-mode">
			<span class="repayment-mode__label">{t.rueckzahlungLabel}</span>
			<div class="repayment-mode__switch">
				{#each modes as option (option.mode)}
					<button
						type="button"
						class="repayment-mode__option"
						class:repayment-mode__option--active={repaymentMode === option.mode}
						onclick={() => (repaymentMode = option.mode)}
					>
						{option.label}
					</button>
				{/each}
			</div>
		</div>

		<!--
		  All three fields are always mounted, stacked in the same grid cell (one `display:none` CSS
		  trick layer deeper) — the cell then sizes to the tallest of the three, so it never changes
		  size when switching modes, regardless of actual pixel heights. Only the active one is
		  visible; the others are `visibility:hidden` (not `display:none`) so they still occupy
		  their slot for sizing purposes, and `visibility:hidden` also removes them from tab order.
		-->
		<div class="repayment-field">
			<div
				class="repayment-field__slot"
				class:repayment-field__slot--hidden={repaymentMode !== 'amortizationRate'}
			>
				<PercentageSlider
					label={t.amortizationRateLabel}
					bind:value={amortizationRate}
					decrementLabel={t.decrementAria}
					incrementLabel={t.incrementAria}
				/>
			</div>
			<div
				class="repayment-field__slot"
				class:repayment-field__slot--hidden={repaymentMode !== 'desiredDuration'}
			>
				<LabeledValueField
					label={t.desiredDurationYearsLabel}
					bind:value={desiredDurationYears}
					unit={t.yearsUnit}
					min={1}
				/>
			</div>
			<div
				class="repayment-field__slot"
				class:repayment-field__slot--hidden={repaymentMode !== 'desiredMonthlyPayment'}
			>
				<div class="desired-payment-field">
					<span class="desired-payment-field__label">{t.desiredMonthlyPaymentLabel}</span>
					<CurrencyAmountField
						bind:value={desiredMonthlyPayment}
						locale={intlLocale(lang)}
						compact
					/>
				</div>
			</div>
		</div>

		{#if showCalculateLink}
			<a href={calculatorHref} class="button button--primary calculator__cta">{t.berechnen}</a>
		{/if}
	</div>

	<div class="card results">
		<div class="result">
			<span class="result__label">{t.monatlicheRate}</span>
			<span class="result__value">{currency.format(result.monthlyPayment)}</span>
		</div>
		<div class="result">
			<span class="result__label">{t.laufzeit}</span>
			<span class="result__value"
				>{t.duration(Math.floor(result.totalMonths / 12), result.totalMonths % 12)}</span
			>
		</div>
		<div class="result">
			<span class="result__label">{t.payoffDate}</span>
			<span class="result__value">{payoffDate}</span>
		</div>
		<div class="result">
			<span class="result__label">{t.gesamtzinsen}</span>
			<span class="result__value">{currency.format(result.totalInterest)}</span>
		</div>
		<div class="result result--accent">
			<span class="result__label">{t.gesamtsumme}</span>
			<span class="result__value">{currency.format(result.totalRepayment)}</span>
		</div>
	</div>
</div>

<style>
	.calculator__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		/* Grid's default (stretch) rather than `start` — so the inputs and results cards always
		   match height, even when one has more content than the other (e.g. the "Berechnen" link
		   only shown on the landing page, or different repayment-mode fields). */
	}

	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 28px;
		box-shadow: var(--shadow-card);
	}

	.inputs {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 20px;
	}

	.principal-field {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding-bottom: 4px;
	}

	.principal-field__label {
		font-size: 13px;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.desired-payment-field {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
	}

	.desired-payment-field__label {
		font-size: 14px;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.repayment-mode {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 4px;
	}

	.repayment-mode__label {
		font-size: 14px;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.repayment-mode__switch {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.repayment-mode__option {
		all: unset;
		cursor: pointer;
		padding: 7px 14px;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		font-size: 12.5px;
		font-weight: 600;
		color: var(--color-text-muted);
		transition:
			background-color 0.15s ease,
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.repayment-mode__option:hover {
		border-color: var(--color-text-muted);
		color: var(--color-text);
	}

	.repayment-mode__option--active {
		background: var(--color-mint);
		border-color: var(--color-mint);
		color: #06251b;
	}

	.repayment-mode__option--active:hover {
		border-color: var(--color-mint);
		color: #06251b;
	}

	/* All three swappable fields stack in this one grid cell, so its height is always the tallest
	   of the three — switching modes never changes the card's overall height. */
	.repayment-field {
		display: grid;
		margin-top: 4px;
	}

	.repayment-field__slot {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.repayment-field__slot--hidden {
		visibility: hidden;
		pointer-events: none;
	}

	.calculator__cta {
		justify-content: center;
		margin-top: 4px;
	}

	.results {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 18px;
	}

	.result {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-bottom: 16px;
		border-bottom: 1px solid var(--color-border);
	}

	.result:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.result__label {
		font-size: 13px;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.result__value {
		font-size: 22px;
		font-weight: 800;
		letter-spacing: -0.01em;
	}

	.result--accent .result__value {
		color: var(--color-mint-dark);
	}

	@media (max-width: 720px) {
		.calculator__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
