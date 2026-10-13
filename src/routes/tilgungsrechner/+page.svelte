<script lang="ts">
	import AmortizationCalculator from '#lib/components/AmortizationCalculator.svelte';
</script>

<svelte:head>
	<title>Tilgungsrechner – Tilgungsheld</title>
	<meta
		name="description"
		content="Berechne monatliche Rate, Laufzeit und Gesamtzinsen deines Immobilienkredits – direkt im Browser, ohne Anmeldung."
	/>
</svelte:head>

<main class="container calculator">
	<p class="eyebrow">Testrechner</p>
	<h1>Tilgungsrechner</h1>
	<p class="intro">
		Die gleiche Berechnung wie in der App: feste monatliche Rate aus Zinssatz und anfänglicher
		Tilgungsrate, Laufzeit ergibt sich daraus. Alles läuft lokal in deinem Browser.
	</p>

	<div class="calculator__body">
		<AmortizationCalculator />
	</div>
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
</style>
