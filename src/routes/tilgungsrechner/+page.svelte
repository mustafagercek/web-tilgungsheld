<script lang="ts">
	import { resolve } from '$app/paths';
	import LogoMark from '#lib/components/LogoMark.svelte';
	import { calculateAmortization } from '#lib/domain/calculator.ts';

	let principal = $state(250_000);
	let interestRate = $state(3.5);
	let amortizationRate = $state(2.0);

	const result = $derived(
		calculateAmortization(principal, interestRate / 100, amortizationRate / 100)
	);

	const currency = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 0
	});

	function durationText(totalMonths: number): string {
		const years = Math.floor(totalMonths / 12);
		const months = totalMonths % 12;
		if (months === 0) return `${years} Jahre`;
		return `${years} Jahre, ${months} Monate`;
	}
</script>

<svelte:head>
	<title>Tilgungsrechner – Tilgungsfreund</title>
	<meta
		name="description"
		content="Berechne monatliche Rate, Laufzeit und Gesamtzinsen deines Immobilienkredits – direkt im Browser, ohne Anmeldung."
	/>
</svelte:head>

<header class="nav">
	<div class="container nav__inner">
		<a href={resolve('/')} class="nav__brand">
			<LogoMark size={36} />
			<span>Tilgungsfreund</span>
		</a>
		<a href={resolve('/')} class="back">← Zurück</a>
	</div>
</header>

<main class="container calculator">
	<p class="eyebrow">Testrechner</p>
	<h1>Tilgungsrechner</h1>
	<p class="intro">
		Die gleiche Berechnung wie in der App: feste monatliche Rate aus Zinssatz und anfänglicher
		Tilgungsrate, Laufzeit ergibt sich daraus. Alles läuft lokal in deinem Browser.
	</p>

	<div class="calculator__grid">
		<div class="card inputs">
			<label>
				<span>Darlehenssumme</span>
				<input type="number" bind:value={principal} min="1000" step="1000" />
			</label>
			<label>
				<span>Zinssatz (% p.a.)</span>
				<input type="number" bind:value={interestRate} min="0" step="0.05" />
			</label>
			<label>
				<span>Anfängliche Tilgungsrate (% p.a.)</span>
				<input type="number" bind:value={amortizationRate} min="0" step="0.1" />
			</label>
		</div>

		<div class="card results">
			<div class="result">
				<span class="result__label">Monatliche Rate</span>
				<span class="result__value">{currency.format(result.monthlyPayment)}</span>
			</div>
			<div class="result">
				<span class="result__label">Laufzeit</span>
				<span class="result__value">{durationText(result.totalMonths)}</span>
			</div>
			<div class="result">
				<span class="result__label">Gesamtzinsen</span>
				<span class="result__value">{currency.format(result.totalInterest)}</span>
			</div>
			<div class="result result--accent">
				<span class="result__label">Gesamtsumme</span>
				<span class="result__value">{currency.format(result.totalRepayment)}</span>
			</div>
		</div>
	</div>
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

	.calculator__grid {
		margin-top: 40px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		align-items: start;
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
		gap: 20px;
	}

	.inputs label {
		display: flex;
		flex-direction: column;
		gap: 8px;
		font-size: 14px;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.inputs input {
		font-family: var(--font-sans);
		font-size: 17px;
		font-weight: 600;
		color: var(--color-text);
		padding: 12px 14px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border);
		background: var(--color-bg);
	}

	.inputs input:focus {
		outline: 2px solid var(--color-mint);
		outline-offset: 1px;
	}

	.results {
		display: flex;
		flex-direction: column;
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
