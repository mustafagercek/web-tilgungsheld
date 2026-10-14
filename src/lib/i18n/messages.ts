/**
 * `de` is the canonical shape — `en` is typed against it (`satisfies Messages`), so a missing or
 * mistyped key in the English dictionary is a compile error instead of a silent fallback to
 * German at runtime.
 */
const de = {
	nav: {
		rechner: 'Tilgungsrechner',
		appLaden: 'App laden'
	},
	footer: {
		impressum: 'Impressum',
		datenschutz: 'Datenschutz',
		nutzungsbedingungen: 'Nutzungsbedingungen',
		kontakt: 'Kontakt',
		copyright: (year: number) => `© ${year} Tilgungsheld`
	},
	home: {
		metaTitle: 'Tilgungsheld – Dein Kredit, transparent im Blick',
		metaDescription:
			'Tilgungsheld verwaltet deine Immobilienkredite, Tilgungspläne und Sondertilgungen – lokal auf deinem Gerät, ohne Konto, ohne Cloud.',
		hero: {
			eyebrow: 'Baufinanzierung · Tilgung · Eigenkapital',
			titleLine1: 'Dein Kredit.',
			titleLine2: 'Transparent. Unter Kontrolle.',
			subtext:
				'Tilgungsheld zeigt dir Fortschritt, Tilgungsplan und Eigenkapital deiner Immobilienkredite auf einen Blick – und simuliert Sondertilgungen, bevor du sie wirklich machst.',
			ctaPrimary: 'Jetzt im App Store',
			ctaSecondary: 'Rechner testen'
		},
		rechnerSection: {
			title: "Probier's direkt aus",
			subtitle:
				'Feste monatliche Rate aus Zinssatz und anfänglicher Tilgungsrate – kein Download, keine Anmeldung.'
		},
		features: {
			title: 'Alles, was ein Kredit braucht – nichts, was er nicht braucht',
			subtitle:
				'Keine Werbung, kein Abo-Zwang, keine Daten, die irgendwo hochgeladen werden. Nur die Zahlen, die zu deinem Kredit gehören.',
			items: [
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
			]
		},
		privacy: {
			eyebrow: 'Privacy by design',
			title: 'Keine Server. Keine Konten. Keine Ausnahme.',
			body: 'Tilgungsheld speichert alles, was du einträgst, ausschließlich lokal auf deinem Gerät. Es gibt keine Benutzerkonten, keine Cloud-Synchronisierung und keine Analyse- oder Tracking-Dienste von Drittanbietern. Deine Kreditdaten verlassen dein Gerät nie.',
			list: [
				'Keine Registrierung erforderlich',
				'Keine Werbung, kein Tracking',
				'Volle Kontrolle – jederzeit löschbar'
			]
		},
		download: {
			title: 'Bereit, deinen Kredit wirklich zu verstehen?',
			subtitle: 'Kostenlos. Lokal. Ohne Haken.',
			cta: 'Jetzt im App Store laden'
		}
	},
	calculator: {
		principalLabel: 'Darlehenssumme',
		interestRateLabel: 'Zinssatz (% p.a.)',
		amortizationRateLabel: 'Anfängliche Tilgungsrate (% p.a.)',
		berechnen: 'Berechnen',
		decrementAria: 'Verringern',
		incrementAria: 'Erhöhen',
		monatlicheRate: 'Monatliche Rate',
		laufzeit: 'Laufzeit',
		payoffDate: 'Schuldenfrei ab',
		gesamtzinsen: 'Gesamtzinsen',
		gesamtsumme: 'Gesamtsumme',
		duration: (years: number, months: number) => {
			const yearPart = `${years} ${years === 1 ? 'Jahr' : 'Jahre'}`;
			if (months === 0) return yearPart;
			return `${yearPart}, ${months} ${months === 1 ? 'Monat' : 'Monate'}`;
		},
		rueckzahlungLabel: 'Rückzahlung',
		modeAmortizationRate: 'Tilgungsrate',
		modeDesiredDuration: 'Laufzeit',
		modeDesiredMonthlyPayment: 'Monatliche Rate',
		desiredDurationYearsLabel: 'Gewünschte Laufzeit',
		yearsUnit: 'Jahre',
		desiredMonthlyPaymentLabel: 'Gewünschte monatliche Rate'
	},
	plan: {
		zinsen: 'Zinsen',
		tilgung: 'Tilgung',
		restschuld: 'Restschuld'
	},
	charts: {
		restschuldverlaufTitle: 'Restschuldverlauf',
		zinsenTilgungTitle: 'Zinsen vs. Tilgung',
		zinsenLegend: 'Zinsen',
		tilgungLegend: 'Tilgung',
		// Split into {before, after} rather than one interpolated string, so the caller can wrap
		// just the dynamic value (a date or an amount) in its own bold <strong> tag.
		crossoverText: { before: 'Die Tilgung übersteigt die Zinsen erstmals ab ', after: '.' },
		startGapText: { before: 'Die Tilgung übersteigt die Zinsen von Anfang an um ', after: '.' }
	},
	tilgungsrechnerPage: {
		metaTitle: 'Tilgungsrechner – Tilgungsheld',
		metaDescription:
			'Berechne monatliche Rate, Laufzeit und Gesamtzinsen deines Immobilienkredits – direkt im Browser, ohne Anmeldung.',
		eyebrow: 'Testrechner',
		title: 'Tilgungsrechner',
		intro:
			'Feste monatliche Rate aus Zinssatz und anfänglicher Tilgungsrate – die Laufzeit ergibt sich daraus. Alles läuft lokal in deinem Browser.',
		auswertungTitle: 'Auswertung',
		auswertungIntro:
			'Restschuld über die Laufzeit, und der Punkt, an dem du mehr tilgst als du Zinsen zahlst.',
		planTitle: 'Tilgungsplan',
		planIntro:
			'Jahr für Jahr, aufklappbar bis auf den Monat genau — Zins- und Tilgungsanteil verschieben sich mit jeder Rate.',
		appHint: 'Gefällt dir der Rechner? Unsere App behält dauerhaft den Überblick.'
	},
	legal: {
		datenschutz: {
			metaTitle: 'Datenschutzerklärung – Tilgungsheld',
			title: 'Datenschutzerklärung',
			lastUpdated: 'Stand: Oktober 2026',
			sections: [
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
			]
		},
		nutzungsbedingungen: {
			metaTitle: 'Nutzungsbedingungen – Tilgungsheld',
			title: 'Nutzungsbedingungen',
			lastUpdated: 'Stand: Oktober 2026',
			sections: [
				{
					title: 'Geltungsbereich',
					body: 'Diese Nutzungsbedingungen gelten für die Nutzung der App Tilgungsheld („App“). Mit dem Herunterladen und der Nutzung der App stimmst du diesen Bedingungen zu.'
				},
				{
					title: 'Was Tilgungsheld ist',
					body: 'Tilgungsheld ist ein persönliches Werkzeug zur Berechnung und Verwaltung von Immobilienkrediten (z. B. Rate, Zinskosten, Tilgungsverlauf, Sondertilgungen). Die App dient Privatpersonen zur eigenen Orientierung.'
				},
				{
					title: 'Lokale Datenspeicherung',
					body: 'Alle Daten, die du in der App einträgst – etwa Kreditdaten, Sondertilgungen und Einstellungen – werden ausschließlich lokal auf deinem Gerät gespeichert. Tilgungsheld betreibt keine eigenen Server und bietet keine Benutzerkonten an. Es werden keine Daten an den Entwickler, an Dritte oder an einen Cloud-Dienst übertragen, dort gespeichert oder mit anderen geteilt.'
				},
				{
					title: 'Keine Finanz-, Steuer- oder Rechtsberatung',
					body: 'Alle berechneten Werte (z. B. monatliche Rate, Zinskosten, Restschuld) dienen ausschließlich der unverbindlichen Orientierung und ersetzen keine individuelle Beratung. Wende dich für verbindliche Entscheidungen an deine Bank oder einen unabhängigen Berater.'
				},
				{
					title: 'Haftungsausschluss',
					body: 'Die App wird „wie besehen“ ohne Mängelgewähr bereitgestellt. Tilgungsheld übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der Berechnungen und haftet, soweit gesetzlich zulässig, nicht für Schäden aus der Nutzung der App.'
				},
				{
					title: 'Eigenverantwortung für Datensicherung',
					body: 'Da deine Daten ausschließlich lokal gespeichert werden, gehen sie beim Löschen der App oder des Geräts unwiderruflich verloren, sofern sie nicht durch ein allgemeines Geräte-Backup gesichert wurden. Für die Sicherung deiner Daten bist du selbst verantwortlich.'
				},
				{
					title: 'Änderungen dieser Bedingungen',
					body: 'Diese Nutzungsbedingungen können im Rahmen der Weiterentwicklung der App angepasst werden. Die jeweils aktuelle Fassung ist in der App und auf dieser Seite einsehbar.'
				}
			]
		},
		impressum: {
			metaTitle: 'Impressum – Tilgungsheld',
			title: 'Impressum',
			lastUpdated: 'Stand: Oktober 2026',
			sections: [
				{
					title: 'Angaben gemäß § 5 DDG',
					body: 'Mustafa Gercek, App-Entwicklung, Panoramastraße 47, 73527 Schwäbisch Gmünd'
				},
				{
					title: 'Kontakt',
					body: 'E-Mail: mustafa.gercek@nicetoapp.de'
				},
				{
					title: 'Umsatzsteuer-Identifikationsnummer',
					body: 'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE342514774'
				},
				{
					title: 'EU-Streitschlichtung',
					body: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Unsere E-Mail-Adresse findest du oben in diesem Impressum.'
				},
				{
					title: 'Verbraucherstreitbeilegung',
					body: 'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
				},
				{
					title: 'Haftung für Inhalte',
					body: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'
				},
				{
					title: 'Haftung für Links',
					body: 'Unsere Website enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.'
				},
				{
					title: 'Urheberrecht',
					body: 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.'
				}
			]
		}
	}
};

export type Messages = typeof de;

const en = {
	nav: {
		rechner: 'Mortgage calculator',
		appLaden: 'Get the app'
	},
	footer: {
		impressum: 'Legal Notice',
		datenschutz: 'Privacy Policy',
		nutzungsbedingungen: 'Terms of Use',
		kontakt: 'Contact',
		copyright: (year: number) => `© ${year} Tilgungsheld`
	},
	home: {
		metaTitle: 'Tilgungsheld – Your mortgage, fully transparent',
		metaDescription:
			'Tilgungsheld manages your mortgages, repayment plans, and extra repayments — locally on your device, no account, no cloud.',
		hero: {
			eyebrow: 'Mortgage · Repayment · Equity',
			titleLine1: 'Your mortgage.',
			titleLine2: 'Transparent. Under control.',
			subtext:
				"Tilgungsheld shows you your mortgages' progress, repayment plan, and equity at a glance — and simulates extra repayments before you actually make them.",
			ctaPrimary: 'Get it on the App Store',
			ctaSecondary: 'Try the calculator'
		},
		rechnerSection: {
			title: 'Try it right now',
			subtitle:
				'A fixed monthly payment from the interest rate and initial amortization rate — no download, no sign-up.'
		},
		features: {
			title: 'Everything a mortgage needs — nothing it doesn’t',
			subtitle:
				"No ads, no forced subscription, no data uploaded anywhere. Just the numbers that belong to your mortgage.",
			items: [
				{
					icon: 'chart.bar',
					title: 'Progress at a glance',
					text: "See instantly how much of your mortgage you've already paid off and when the last payment is due — per mortgage and across all of them."
				},
				{
					icon: 'calendar',
					title: 'Complete repayment plan',
					text: 'Every payment, every month, every fixed-interest phase — as a searchable list, not just a total.'
				},
				{
					icon: 'banknote',
					title: 'Equity over time',
					text: 'Track how your property value minus remaining debt grows over the years — as a chart, not a table.'
				},
				{
					icon: 'plusminus',
					title: 'Plan extra repayments',
					text: 'Simulate additional payments and see the effect on term and interest cost right away — before and after, side by side.'
				}
			]
		},
		privacy: {
			eyebrow: 'Privacy by design',
			title: 'No servers. No accounts. No exceptions.',
			body: 'Tilgungsheld stores everything you enter exclusively, locally on your device. There are no user accounts, no cloud sync, and no third-party analytics or tracking services. Your mortgage data never leaves your device.',
			list: [
				'No registration required',
				'No ads, no tracking',
				'Full control — delete anytime'
			]
		},
		download: {
			title: 'Ready to truly understand your mortgage?',
			subtitle: 'Free. Local. No catch.',
			cta: 'Get it on the App Store'
		}
	},
	calculator: {
		principalLabel: 'Loan amount',
		interestRateLabel: 'Interest rate (% p.a.)',
		amortizationRateLabel: 'Initial amortization rate (% p.a.)',
		berechnen: 'Calculate',
		decrementAria: 'Decrease',
		incrementAria: 'Increase',
		monatlicheRate: 'Monthly payment',
		laufzeit: 'Term',
		payoffDate: 'Debt-free from',
		gesamtzinsen: 'Total interest',
		gesamtsumme: 'Total repayment',
		duration: (years: number, months: number) => {
			const yearPart = `${years} ${years === 1 ? 'year' : 'years'}`;
			if (months === 0) return yearPart;
			return `${yearPart}, ${months} ${months === 1 ? 'month' : 'months'}`;
		},
		rueckzahlungLabel: 'Repayment',
		modeAmortizationRate: 'Amortization rate',
		modeDesiredDuration: 'Term',
		modeDesiredMonthlyPayment: 'Monthly payment',
		desiredDurationYearsLabel: 'Desired term',
		yearsUnit: 'years',
		desiredMonthlyPaymentLabel: 'Desired monthly payment'
	},
	plan: {
		zinsen: 'Interest',
		tilgung: 'Principal',
		restschuld: 'Balance'
	},
	charts: {
		restschuldverlaufTitle: 'Remaining balance',
		zinsenTilgungTitle: 'Interest vs. principal',
		zinsenLegend: 'Interest',
		tilgungLegend: 'Principal',
		crossoverText: { before: 'Your principal payment first exceeds interest from ', after: '.' },
		startGapText: {
			before: 'Your principal payment exceeds interest from the very start, by ',
			after: '.'
		}
	},
	tilgungsrechnerPage: {
		metaTitle: 'Mortgage calculator – Tilgungsheld',
		metaDescription:
			'Calculate the monthly payment, term, and total interest of your mortgage — right in your browser, no sign-up.',
		eyebrow: 'Test calculator',
		title: 'Mortgage calculator',
		intro:
			'A fixed monthly payment from the interest rate and initial amortization rate, with the term falling out of that. Everything runs locally in your browser.',
		auswertungTitle: 'Analysis',
		auswertungIntro:
			'The remaining balance over the term, and the point where you start paying more principal than interest.',
		planTitle: 'Repayment plan',
		planIntro:
			'Year by year, expandable down to the month — the interest/principal split shifts with every payment.',
		appHint: 'Like the calculator? Our app keeps the full overview, always.'
	},
	legal: {
		datenschutz: {
			metaTitle: 'Privacy Policy – Tilgungsheld',
			title: 'Privacy Policy',
			lastUpdated: 'Last updated: October 2026',
			sections: [
				{
					title: 'Controller',
					body: 'The party responsible under data protection law is: Mustafa Gercek, App Development, Panoramastraße 47, 73527 Schwäbisch Gmünd, Germany. Contact for privacy inquiries: mustafa.gercek@nicetoapp.de'
				},
				{
					title: 'No data collection by the developer',
					body: 'Tilgungsheld has no servers of its own, no user accounts, and no internet connection for your data. Everything you enter in the app — such as mortgage data, extra repayments, and settings — stays exclusively on your device. The developer never has access to this data.'
				},
				{
					title: 'No analytics, tracking, or advertising services',
					body: 'The app does not integrate any third-party analytics, tracking, or advertising SDKs. No usage data is transmitted to third parties.'
				},
				{
					title: 'Apple App Store',
					body: "Downloading the app through the App Store is handled by Apple. Apple itself may process certain data (e.g. purchase history, device information), which the developer has no influence over. See Apple's own privacy policy for details."
				},
				{
					title: 'Storage and deletion of your data',
					body: 'Your data is stored using local storage provided by Apple, on your own device. You can delete all data at any time yourself, by removing the relevant entries in the app or uninstalling the app entirely.'
				},
				{
					title: 'Your rights',
					body: "Because Tilgungsheld does not collect, store, or process any personal data, there are generally no processing activities on the developer's side to which data subject rights (e.g. access, rectification, erasure) under the GDPR could apply. You have full control over your own, locally stored data at any time, directly in the app."
				},
				{
					title: 'Changes to this privacy policy',
					body: 'This privacy policy may be updated as the app continues to evolve. The current version is always available in the app and on this page.'
				}
			]
		},
		nutzungsbedingungen: {
			metaTitle: 'Terms of Use – Tilgungsheld',
			title: 'Terms of Use',
			lastUpdated: 'Last updated: October 2026',
			sections: [
				{
					title: 'Scope',
					body: 'These terms of use apply to your use of the Tilgungsheld app ("App"). By downloading and using the app, you agree to these terms.'
				},
				{
					title: 'What Tilgungsheld is',
					body: 'Tilgungsheld is a personal tool for calculating and managing mortgages (e.g. monthly payment, interest cost, repayment progress, extra repayments). The app is intended for private individuals for their own orientation.'
				},
				{
					title: 'Local data storage',
					body: 'All data you enter in the app — such as mortgage data, extra repayments, and settings — is stored exclusively, locally on your device. Tilgungsheld operates no servers of its own and offers no user accounts. No data is transmitted to the developer, to third parties, or to any cloud service, stored there, or shared with others.'
				},
				{
					title: 'No financial, tax, or legal advice',
					body: 'All calculated values (e.g. monthly payment, interest cost, remaining balance) are for non-binding orientation only and do not replace individual advice. For binding decisions, consult your bank or an independent advisor.'
				},
				{
					title: 'Disclaimer',
					body: 'The app is provided "as is" without warranty of any kind. Tilgungsheld makes no guarantee as to the accuracy, completeness, or currentness of its calculations and, to the extent permitted by law, is not liable for damages arising from use of the app.'
				},
				{
					title: 'Responsibility for your own backups',
					body: 'Since your data is stored exclusively locally, it is irrecoverably lost if the app or device is deleted, unless it was captured by a general device backup. You are responsible for backing up your own data.'
				},
				{
					title: 'Changes to these terms',
					body: 'These terms of use may be updated as the app continues to evolve. The current version is always available in the app and on this page.'
				}
			]
		},
		impressum: {
			metaTitle: 'Legal Notice – Tilgungsheld',
			title: 'Legal Notice',
			lastUpdated: 'Last updated: October 2026',
			sections: [
				{
					title: 'Information pursuant to § 5 DDG (German Digital Services Act)',
					body: 'Mustafa Gercek, App Development, Panoramastraße 47, 73527 Schwäbisch Gmünd, Germany'
				},
				{
					title: 'Contact',
					body: 'Email: mustafa.gercek@nicetoapp.de'
				},
				{
					title: 'VAT identification number',
					body: 'VAT identification number pursuant to § 27a of the German VAT Act (UStG): DE342514774'
				},
				{
					title: 'EU dispute resolution',
					body: 'The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. Our email address can be found above in this legal notice.'
				},
				{
					title: 'Consumer dispute resolution',
					body: 'We are not willing and not obligated to participate in dispute resolution proceedings before a consumer arbitration board.'
				},
				{
					title: 'Liability for content',
					body: 'As a service provider, we are responsible for our own content on these pages under the general laws, pursuant to § 7 para. 1 DDG. However, pursuant to §§ 8 to 10 DDG, we as a service provider are not obligated to monitor transmitted or stored third-party information, or to investigate circumstances that indicate unlawful activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this respect is only possible from the point in time at which a specific infringement becomes known. Upon becoming aware of any such infringements, we will remove this content without delay.'
				},
				{
					title: 'Liability for links',
					body: "Our website may contain links to external third-party websites over whose content we have no control. We therefore cannot accept any liability for this external content. The provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. No unlawful content was identifiable at that time. However, permanent monitoring of the content of linked pages is not reasonable without concrete evidence of an infringement. We will remove such links immediately upon becoming aware of any infringements."
				},
				{
					title: 'Copyright',
					body: 'The content and works created by the site operator on this website are subject to German copyright law. Reproduction, editing, distribution, and any form of use outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this page are only permitted for private, non-commercial use.'
				}
			]
		}
	}
} satisfies Messages;

export const messages = { de, en };
