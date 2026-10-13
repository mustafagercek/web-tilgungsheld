<script lang="ts">
	import HeroMark from '#lib/components/HeroMark.svelte';
	import AmortizationCalculator from '#lib/components/AmortizationCalculator.svelte';

	const features = [
		{
			icon: 'chart.bar',
			title: 'Fortschritt auf einen Blick',
			text: 'Sieh sofort, wie viel du von deinem Kredit schon getilgt hast und wann die letzte Rate fällig ist – pro Kredit und für alle zusammen.'
		},
		{
			icon: 'calendar',
			title: 'Vollständiger Tilgungsplan',
			text: 'Jede Rate, jeder Monat, jede Phase der Zinsbindung – als durchsuchbare Liste, nicht nur als Summe.'
		},
		{
			icon: 'banknote',
			title: 'Eigenkapital im Zeitverlauf',
			text: 'Verfolge, wie dein Immobilienwert abzüglich Restschuld über die Jahre wächst – als Diagramm, nicht als Tabelle.'
		},
		{
			icon: 'plusminus',
			title: 'Sondertilgungen planen',
			text: 'Simuliere zusätzliche Zahlungen und sieh direkt den Effekt auf Laufzeit und Zinskosten – vor und nachher im Vergleich.'
		}
	];
</script>

<svelte:head>
	<title>Tilgungsheld – Dein Kredit, transparent im Blick</title>
	<meta
		name="description"
		content="Tilgungsheld verwaltet deine Immobilienkredite, Tilgungspläne und Sondertilgungen – lokal auf deinem Gerät, ohne Konto, ohne Cloud."
	/>
</svelte:head>

<main>
	<section class="hero">
		<div class="container hero__inner">
			<div class="hero__copy">
				<p class="eyebrow hero__eyebrow">Baufinanzierung · Tilgung · Eigenkapital</p>
				<h1>Dein Kredit.<br />Transparent. Unter Kontrolle.</h1>
				<p class="hero__subtext">
					Tilgungsheld zeigt dir Fortschritt, Tilgungsplan und Eigenkapital deiner Immobilienkredite
					auf einen Blick – und simuliert Sondertilgungen, bevor du sie wirklich machst.
				</p>
				<div class="hero__actions">
					<a href="#download" class="button button--primary">Jetzt im App Store</a>
					<a href="#rechner" class="button button--ghost">Rechner testen</a>
				</div>
			</div>
			<div class="hero__visual">
				<HeroMark size={280} />
			</div>
		</div>
	</section>

	<section class="rechner" id="rechner">
		<div class="container">
			<h2 class="section-title">Probier's direkt aus</h2>
			<p class="section-subtitle">
				Die gleiche Berechnung wie in der App: feste monatliche Rate aus Zinssatz und anfänglicher
				Tilgungsrate. Kein Download, keine Anmeldung.
			</p>
			<div class="rechner__body">
				<AmortizationCalculator />
			</div>
		</div>
	</section>

	<section class="features" id="funktionen">
		<div class="container">
			<h2 class="section-title">Alles, was ein Kredit braucht – nichts, was er nicht braucht</h2>
			<p class="section-subtitle">
				Keine Werbung, kein Abo-Zwang, keine Daten, die irgendwo hochgeladen werden. Nur die Zahlen,
				die zu deinem Kredit gehören.
			</p>
			<div class="feature-grid">
				{#each features as feature (feature.title)}
					<article class="feature-card">
						<div class="feature-card__icon" class:feature-card__icon--accent={feature.icon === 'plusminus'}>
							{#if feature.icon === 'plusminus'}
								<span class="feature-card__plusminus">+−</span>
							{:else if feature.icon === 'chart.bar'}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
									<rect x="3" y="12" width="4" height="9" rx="1.5" fill="currentColor" />
									<rect x="10" y="7" width="4" height="14" rx="1.5" fill="currentColor" />
									<rect x="17" y="2" width="4" height="19" rx="1.5" fill="currentColor" />
								</svg>
							{:else if feature.icon === 'calendar'}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
									<rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" stroke-width="2" />
									<path d="M3 10h18M8 2v6M16 2v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
								</svg>
							{:else}
								<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
									<rect x="2" y="6" width="20" height="12" rx="2.5" stroke="currentColor" stroke-width="2" />
									<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" />
								</svg>
							{/if}
						</div>
						<h3>{feature.title}</h3>
						<p>{feature.text}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="privacy" id="privatsphaere">
		<div class="container privacy__inner">
			<div class="privacy__copy">
				<p class="eyebrow privacy__eyebrow">Privacy by design</p>
				<h2>Keine Server. Keine Konten. Keine Ausnahme.</h2>
				<p>
					Tilgungsheld speichert alles, was du einträgst, ausschließlich lokal auf deinem Gerät.
					Es gibt keine Benutzerkonten, keine Cloud-Synchronisierung und keine Analyse- oder
					Tracking-Dienste von Drittanbietern. Deine Kreditdaten verlassen dein Gerät nie.
				</p>
			</div>
			<ul class="privacy__list">
				<li>Keine Registrierung erforderlich</li>
				<li>Keine Werbung, kein Tracking</li>
				<li>Volle Kontrolle – jederzeit löschbar</li>
			</ul>
		</div>
	</section>

	<section class="download" id="download">
		<div class="container download__inner">
			<h2>Bereit, deinen Kredit wirklich zu verstehen?</h2>
			<p>Kostenlos. Lokal. Ohne Haken.</p>
			<!-- TODO: replace with the real App Store link once the app is live -->
			<a href="mailto:mustafa.gercek@nicetoapp.de" class="button button--primary"
				>Jetzt im App Store laden</a
			>
		</div>
	</section>
</main>

<style>
	.hero {
		background: linear-gradient(180deg, #1e1b4b 0%, #312e81 100%);
		color: var(--color-text-on-dark);
		padding-block: 96px;
	}

	.hero__inner {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		align-items: center;
		gap: 48px;
	}

	.hero__eyebrow {
		color: var(--color-mint);
	}

	.hero h1 {
		font-size: clamp(2.2rem, 4vw, 3.4rem);
		line-height: 1.1;
		font-weight: 800;
		margin-block: 18px 20px;
		letter-spacing: -0.02em;
	}

	.hero__subtext {
		font-size: 17px;
		line-height: 1.6;
		color: var(--color-text-on-dark-muted);
		max-width: 46ch;
	}

	.hero__actions {
		display: flex;
		gap: 14px;
		margin-top: 32px;
		flex-wrap: wrap;
	}

	.hero__visual {
		display: flex;
		justify-content: center;
	}

	.section-title {
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.01em;
		max-width: 36ch;
	}

	.section-subtitle {
		margin-top: 12px;
		color: var(--color-text-muted);
		font-size: 16px;
		max-width: 56ch;
		line-height: 1.6;
	}

	.features {
		padding-block: 0 96px;
	}

	.rechner {
		padding-block: 96px;
	}

	.rechner__body {
		margin-top: 40px;
	}

	.feature-grid {
		margin-top: 48px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
	}

	.feature-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 28px;
		box-shadow: var(--shadow-card);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.feature-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-card-hover);
	}

	.feature-card__icon {
		width: 44px;
		height: 44px;
		border-radius: var(--radius-sm);
		background: #ede9fe;
		color: var(--color-ink-soft);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 18px;
	}

	.feature-card__icon--accent {
		background: var(--color-mint);
		color: #06251b;
	}

	.feature-card__plusminus {
		font-weight: 800;
		font-size: 15px;
		letter-spacing: -0.05em;
	}

	.feature-card h3 {
		font-size: 17px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.feature-card p {
		font-size: 14.5px;
		line-height: 1.55;
		color: var(--color-text-muted);
	}

	.privacy {
		background: var(--color-ink);
		color: var(--color-text-on-dark);
		padding-block: 88px;
		border-radius: var(--radius-lg);
		margin-inline: 24px;
		max-width: 1072px;
		margin-inline: auto;
	}

	.privacy__inner {
		display: grid;
		grid-template-columns: 1.3fr 0.7fr;
		gap: 48px;
		align-items: start;
	}

	.privacy__eyebrow {
		color: var(--color-mint);
	}

	.privacy h2 {
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 800;
		margin-block: 14px 16px;
		letter-spacing: -0.01em;
	}

	.privacy p {
		color: var(--color-text-on-dark-muted);
		line-height: 1.65;
		font-size: 15.5px;
		max-width: 50ch;
	}

	.privacy__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.privacy__list li {
		padding: 14px 18px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: var(--radius-sm);
		font-size: 14.5px;
		font-weight: 500;
	}

	.download {
		padding-block: 96px;
		text-align: center;
	}

	.download__inner h2 {
		font-size: clamp(1.6rem, 3vw, 2.2rem);
		font-weight: 800;
		letter-spacing: -0.01em;
	}

	.download__inner p {
		margin-top: 12px;
		color: var(--color-text-muted);
		font-size: 16px;
	}

	.download__inner .button {
		margin-top: 28px;
	}

	@media (max-width: 860px) {
		.hero__inner {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.hero__actions {
			justify-content: center;
		}

		.hero__visual {
			order: -1;
		}

		.privacy__inner {
			grid-template-columns: 1fr;
		}
	}
</style>
