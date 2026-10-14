<script lang="ts">
	import { page } from '$app/state';
	import { calculateForRepaymentInput, type RepaymentMode } from '#lib/domain/calculator.ts';
	import type { Locale } from '#lib/i18n/locales.ts';
	import { messages } from '#lib/i18n/messages.ts';
	import AmortizationCalculator from '#lib/components/AmortizationCalculator.svelte';
	import RepaymentPlanTable from '#lib/components/RepaymentPlanTable.svelte';
	import RemainingDebtChart from '#lib/components/RemainingDebtChart.svelte';
	import InterestPrincipalChart from '#lib/components/InterestPrincipalChart.svelte';

	const lang = $derived(page.params.lang as Locale);
	const t = $derived(messages[lang].tilgungsrechnerPage);

	// Carries over the inputs from the landing page's "Berechnen" button, if present. This route
	// has SSR turned off (see +page.ts) specifically so this can read the real query string on the
	// very first render — with SSR on, a static-prerendered page has no real query string at build
	// time, so it would briefly show these defaults before snapping to the transferred values once
	// the client picked up the actual URL, a visible "jump" right after the handoff.
	function paramNumber(key: string, fallback: number): number {
		const parsed = Number(page.url.searchParams.get(key));
		return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
	}

	const repaymentModes: RepaymentMode[] = ['amortizationRate', 'desiredDuration', 'desiredMonthlyPayment'];
	function paramMode(): RepaymentMode {
		const raw = page.url.searchParams.get('mode');
		return (repaymentModes as string[]).includes(raw ?? '')
			? (raw as RepaymentMode)
			: 'amortizationRate';
	}

	let principal = $state(paramNumber('principal', 200_000));
	let interestRate = $state(paramNumber('interestRate', 4.2));
	let repaymentMode = $state(paramMode());
	let amortizationRate = $state(paramNumber('amortizationRate', 2.0));
	let desiredDurationYears = $state(paramNumber('durationYears', 25));
	let desiredMonthlyPayment = $state(paramNumber('monthlyPayment', 1_000));

	const result = $derived(
		calculateForRepaymentInput(principal, interestRate, {
			mode: repaymentMode,
			amortizationRatePercent: amortizationRate,
			desiredDurationYears,
			desiredMonthlyPayment
		})
	);
</script>

<svelte:head>
	<title>{t.metaTitle}</title>
	<meta name="description" content={t.metaDescription} />
</svelte:head>

<main class="container calculator">
	<p class="eyebrow">{t.eyebrow}</p>
	<h1>{t.title}</h1>
	<p class="intro">
		{t.intro}
	</p>

	<div class="calculator__body">
		<AmortizationCalculator
			bind:principal
			bind:interestRate
			bind:repaymentMode
			bind:amortizationRate
			bind:desiredDurationYears
			bind:desiredMonthlyPayment
		/>
	</div>

	<section class="charts-section">
		<h2>{t.auswertungTitle}</h2>
		<p class="section-intro">
			{t.auswertungIntro}
		</p>
		<div class="charts-section__grid">
			<RemainingDebtChart schedule={result.schedule} {principal} />
			<InterestPrincipalChart schedule={result.schedule} />
		</div>
	</section>

	<section class="plan-section">
		<h2>{t.planTitle}</h2>
		<p class="section-intro">
			{t.planIntro}
		</p>
		<div class="plan-section__body">
			<RepaymentPlanTable schedule={result.schedule} />
		</div>
	</section>

	<p class="app-hint">{t.appHint}</p>
</main>

<style>
	.calculator {
		max-width: 880px;
		padding-block: 56px 96px;
	}

	.calculator h1 {
		font-size: clamp(1.8rem, 3.5vw, 2.4rem);
		font-weight: 800;
		letter-spacing: -0.01em;
		margin-top: 8px;
	}

	.intro {
		margin-top: 14px;
		color: var(--color-text-muted);
		font-size: 15.5px;
		line-height: 1.6;
		max-width: 56ch;
	}

	.calculator__body {
		margin-top: 40px;
	}

	.plan-section,
	.charts-section {
		margin-top: 56px;
	}

	.plan-section h2,
	.charts-section h2 {
		font-size: 1.3rem;
		font-weight: 800;
		letter-spacing: -0.01em;
	}

	.section-intro {
		margin-top: 8px;
		color: var(--color-text-muted);
		font-size: 14.5px;
		line-height: 1.6;
		max-width: 56ch;
	}

	.plan-section__body {
		margin-top: 20px;
	}

	.charts-section__grid {
		margin-top: 20px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.app-hint {
		margin-top: 56px;
		padding-top: 24px;
		border-top: 1px solid var(--color-border);
		font-size: 14px;
		color: var(--color-text-muted);
		text-align: center;
	}

	@media (max-width: 720px) {
		.charts-section__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
