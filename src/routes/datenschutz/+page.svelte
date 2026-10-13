<script lang="ts">
	import LegalPage from '#lib/components/LegalPage.svelte';

	const sections = [
		{
			title: 'Verantwortlicher',
			body: 'Verantwortlich im Sinne der Datenschutzgesetze ist: Mustafa Gercek, App-Entwicklung, Panoramastraße 47, 73527 Schwäbisch Gmünd. Kontakt für Datenschutzanfragen: mustafa.gercek@nicetoapp.de'
		},
		{
			title: 'Keine Datenerhebung durch den Entwickler',
			body: 'Tilgungsheld verfügt über keine eigenen Server, keine Benutzerkonten und keine Internetanbindung für deine Daten. Alle Angaben, die du in der App machst – etwa Kreditdaten, Sondertilgungen und Einstellungen – verbleiben ausschließlich auf deinem Gerät. Der Entwickler hat zu keinem Zeitpunkt Zugriff auf diese Daten.'
		},
		{
			title: 'Keine Analyse-, Tracking- oder Werbedienste',
			body: 'Die App bindet keine Analyse-, Tracking- oder Werbe-SDKs von Drittanbietern ein. Es werden keine Nutzungsdaten an Dritte übermittelt.'
		},
		{
			title: 'Apple App Store',
			body: 'Der Download der App über den App Store erfolgt über Apple. Dabei können von Apple selbst Daten verarbeitet werden (z. B. Kaufhistorie, Geräteinformationen), worauf der Entwickler keinen Einfluss hat. Informationen dazu findest du in der Datenschutzerklärung von Apple.'
		},
		{
			title: 'Speicherung und Löschung deiner Daten',
			body: 'Deine Daten werden mit dem von Apple bereitgestellten lokalen Speicher auf deinem Gerät gesichert. Du kannst alle Daten jederzeit selbst löschen, indem du die entsprechenden Einträge in der App entfernst oder die App vollständig deinstallierst.'
		},
		{
			title: 'Deine Rechte',
			body: 'Da Tilgungsheld keine personenbezogenen Daten erhebt, speichert oder verarbeitet, bestehen auf Seiten des Entwicklers grundsätzlich keine Verarbeitungsvorgänge, auf die sich Betroffenenrechte (z. B. Auskunft, Berichtigung, Löschung) nach der Datenschutz-Grundverordnung (DSGVO) beziehen könnten. Über deine eigenen, lokal gespeicherten Daten hast du jederzeit volle Kontrolle direkt in der App.'
		},
		{
			title: 'Änderungen dieser Datenschutzerklärung',
			body: 'Diese Datenschutzerklärung kann im Rahmen der Weiterentwicklung der App angepasst werden. Die jeweils aktuelle Fassung ist in der App und auf dieser Seite einsehbar.'
		}
	];
</script>

<svelte:head>
	<title>Datenschutzerklärung – Tilgungsheld</title>
</svelte:head>

<LegalPage title="Datenschutzerklärung" lastUpdated="Stand: Oktober 2026" {sections} />
