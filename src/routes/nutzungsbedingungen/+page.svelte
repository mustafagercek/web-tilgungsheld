<script lang="ts">
	import LegalPage from '#lib/components/LegalPage.svelte';

	const sections = [
		{
			title: 'Geltungsbereich',
			body: 'Diese Nutzungsbedingungen gelten für die Nutzung der App Tilgungsfreund („App“). Mit dem Herunterladen und der Nutzung der App stimmst du diesen Bedingungen zu.'
		},
		{
			title: 'Was Tilgungsfreund ist',
			body: 'Tilgungsfreund ist ein persönliches Werkzeug zur Berechnung und Verwaltung von Immobilienkrediten (z. B. Rate, Zinskosten, Tilgungsverlauf, Sondertilgungen). Die App dient Privatpersonen zur eigenen Orientierung.'
		},
		{
			title: 'Lokale Datenspeicherung',
			body: 'Alle Daten, die du in der App einträgst – etwa Kreditdaten, Sondertilgungen und Einstellungen – werden ausschließlich lokal auf deinem Gerät gespeichert. Tilgungsfreund betreibt keine eigenen Server und bietet keine Benutzerkonten an. Es werden keine Daten an den Entwickler, an Dritte oder an einen Cloud-Dienst übertragen, dort gespeichert oder mit anderen geteilt.'
		},
		{
			title: 'Keine Finanz-, Steuer- oder Rechtsberatung',
			body: 'Alle berechneten Werte (z. B. monatliche Rate, Zinskosten, Restschuld) dienen ausschließlich der unverbindlichen Orientierung und ersetzen keine individuelle Beratung. Wende dich für verbindliche Entscheidungen an deine Bank oder einen unabhängigen Berater.'
		},
		{
			title: 'Haftungsausschluss',
			body: 'Die App wird „wie besehen“ ohne Mängelgewähr bereitgestellt. Tilgungsfreund übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der Berechnungen und haftet, soweit gesetzlich zulässig, nicht für Schäden aus der Nutzung der App.'
		},
		{
			title: 'Eigenverantwortung für Datensicherung',
			body: 'Da deine Daten ausschließlich lokal gespeichert werden, gehen sie beim Löschen der App oder des Geräts unwiderruflich verloren, sofern sie nicht durch ein allgemeines Geräte-Backup gesichert wurden. Für die Sicherung deiner Daten bist du selbst verantwortlich.'
		},
		{
			title: 'Änderungen dieser Bedingungen',
			body: 'Diese Nutzungsbedingungen können im Rahmen der Weiterentwicklung der App angepasst werden. Die jeweils aktuelle Fassung ist in der App und auf dieser Seite einsehbar.'
		}
	];
</script>

<svelte:head>
	<title>Nutzungsbedingungen – Tilgungsfreund</title>
</svelte:head>

<LegalPage title="Nutzungsbedingungen" lastUpdated="Stand: Oktober 2026" {sections} />
