export interface MuendlichThema {
  id: number;
  kategorie: string;
  leitfrage: string;
  impulskarten: [string, string, string];
}

export const MUENDLICH_THEMATA: MuendlichThema[] = [
  {
    id: 1,
    kategorie: 'Gesellschaft',
    leitfrage: 'Sollten soziale Medien stärker reguliert werden?',
    impulskarten: ['Meinungsfreiheit', 'Falschinformationen', 'psychische Gesundheit'],
  },
  {
    id: 2,
    kategorie: 'Arbeit & Wirtschaft',
    leitfrage: 'Inwiefern verändert die Digitalisierung unsere Arbeitswelt?',
    impulskarten: ['Homeoffice', 'Automatisierung', 'neue Berufsbilder'],
  },
  {
    id: 3,
    kategorie: 'Bildung',
    leitfrage: 'Wie kann Chancengleichheit im Bildungssystem gefördert werden?',
    impulskarten: ['soziale Herkunft', 'gezielte Förderung', 'Ressourcenverteilung'],
  },
  {
    id: 4,
    kategorie: 'Umwelt',
    leitfrage: 'Welche Maßnahmen sind wirksam gegen den Klimawandel?',
    impulskarten: ['individuelle Verantwortung', 'politische Maßnahmen', 'wirtschaftliche Interessen'],
  },
  {
    id: 5,
    kategorie: 'Gesellschaft',
    leitfrage: 'Welche Rolle spielt Integration für den gesellschaftlichen Zusammenhalt?',
    impulskarten: ['Sprachkompetenz', 'Bildungszugang', 'kulturelle Vielfalt'],
  },
  {
    id: 6,
    kategorie: 'Technologie',
    leitfrage: 'Inwieweit sollte künstliche Intelligenz reguliert werden?',
    impulskarten: ['Datenschutz', 'Arbeitsmarkt', 'ethische Grenzen'],
  },
  {
    id: 7,
    kategorie: 'Bildung',
    leitfrage: 'Sollte Hochschulbildung in Deutschland kostenlos bleiben?',
    impulskarten: ['Chancengleichheit', 'Bildungsqualität', 'Finanzierungsmodelle'],
  },
  {
    id: 8,
    kategorie: 'Gesellschaft',
    leitfrage: 'Wie soll die Gesellschaft mit dem demographischen Wandel umgehen?',
    impulskarten: ['Rentenfinanzierung', 'Pflegesystem', 'Zuwanderung'],
  },
  {
    id: 9,
    kategorie: 'Umwelt',
    leitfrage: 'Wie kann eine nachhaltige Mobilität der Zukunft gestaltet werden?',
    impulskarten: ['öffentlicher Nahverkehr', 'E-Mobilität', 'Verhaltensänderung'],
  },
  {
    id: 10,
    kategorie: 'Technologie',
    leitfrage: 'Inwiefern beeinflusst der Medienkonsum unsere Meinungsbildung?',
    impulskarten: ['Filterblasen', 'kritisches Denken', 'Medienvielfalt'],
  },
  {
    id: 11,
    kategorie: 'Arbeit & Wirtschaft',
    leitfrage: 'Sollte die Arbeitszeit zugunsten von Freizeit reduziert werden?',
    impulskarten: ['Produktivität', 'persönliche Gesundheit', 'wirtschaftliche Folgen'],
  },
  {
    id: 12,
    kategorie: 'Gesellschaft',
    leitfrage: 'Wie kann eine gerechte Gesundheitsversorgung für alle sichergestellt werden?',
    impulskarten: ['Finanzierung', 'Prävention', 'Digitalisierung'],
  },
  {
    id: 13,
    kategorie: 'Politik',
    leitfrage: 'Sollte das Wahlrecht auf 16-Jährige ausgeweitet werden?',
    impulskarten: ['politisches Bewusstsein', 'Mitverantwortung', 'Urteilsvermögen'],
  },
  {
    id: 14,
    kategorie: 'Gesellschaft',
    leitfrage: 'Inwiefern ist Mehrsprachigkeit ein Vorteil in der modernen Gesellschaft?',
    impulskarten: ['berufliche Chancen', 'kognitive Vorteile', 'kulturelle Identität'],
  },
  {
    id: 15,
    kategorie: 'Gesellschaft',
    leitfrage: 'Bedroht die Globalisierung kulturelle Identitäten oder bereichert sie sie?',
    impulskarten: ['kulturelle Vielfalt', 'wirtschaftliche Verflechtung', 'lokale Traditionen'],
  },
  {
    id: 16,
    kategorie: 'Gesellschaft',
    leitfrage: 'Sollte der Staat mehr in Prävention und Gesundheitsförderung investieren?',
    impulskarten: ['Eigenverantwortung', 'Kosten-Nutzen-Abwägung', 'soziale Ungleichheit'],
  },
];

export const REDEMITTEL_GRUPPEN = [
  {
    titel: 'Einleitung',
    saetze: [
      'Ich möchte über das Thema „[X]" sprechen.',
      'Die Frage, die ich behandeln möchte, lautet: [Leitfrage]',
      'Ich werde zunächst auf [Aspekt 1] eingehen, dann [Aspekt 2] beleuchten und abschließend [Aspekt 3] ansprechen.',
    ],
  },
  {
    titel: 'Aspekt einführen',
    saetze: [
      'Ein wesentlicher Aspekt ist ...',
      'Im Hinblick auf [X] lässt sich sagen, dass ...',
      'Was [X] betrifft, so ...',
      'Zunächst möchte ich auf [X] eingehen.',
    ],
  },
  {
    titel: 'Eigene Meinung',
    saetze: [
      'Meiner Meinung nach ...',
      'Ich bin der Überzeugung, dass ...',
      'Ich halte [X] für entscheidend, weil ...',
      'Aus meiner Sicht spielt [X] eine entscheidende Rolle.',
    ],
  },
  {
    titel: 'Einschränkung / Gegenargument',
    saetze: [
      'Auf der anderen Seite muss man bedenken, dass ...',
      'Allerdings darf man nicht vergessen, dass ...',
      'Es wäre jedoch zu kurz gegriffen, wenn man nur [X] berücksichtigt.',
      'Dennoch gibt es gewichtige Gegenargumente, nämlich ...',
    ],
  },
  {
    titel: 'Schluss',
    saetze: [
      'Zusammenfassend lässt sich sagen, dass ...',
      'Abschließend möchte ich betonen, dass ...',
      'Insgesamt bin ich der Ansicht, dass ...',
      'Unter Berücksichtigung aller Aspekte komme ich zu dem Schluss, dass ...',
    ],
  },
];

export const KATEGORIE_FARBEN: Record<string, string> = {
  'Gesellschaft':     'bg-sky-100 text-sky-700',
  'Arbeit & Wirtschaft': 'bg-emerald-100 text-emerald-700',
  'Bildung':          'bg-violet-100 text-violet-700',
  'Umwelt':           'bg-green-100 text-green-700',
  'Technologie':      'bg-orange-100 text-orange-700',
  'Politik':          'bg-rose-100 text-rose-700',
};
