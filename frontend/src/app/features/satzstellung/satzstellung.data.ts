export type SatzTyp = 'hauptsatz' | 'nebensatz' | 'satzklammer' | 'relativsatz' | 'modal';

export interface SatzstellungExercise {
  id: number;
  typ: SatzTyp;
  woerter: string[];   // karıştırılmış
  loesung: string;
  erklaerung: string;
}

export const TYP_LABELS: Record<SatzTyp, string> = {
  hauptsatz:   'Inversion (V2)',
  nebensatz:   'Nebensatz',
  satzklammer: 'Satzklammer',
  relativsatz: 'Relativsatz',
  modal:       'Modal + Infinitiv',
};

export const SATZSTELLUNG_DATA: SatzstellungExercise[] = [

  // ── Hauptsatz · Inversion (V2-Regel) ───────────────────────────
  {
    id: 1, typ: 'hauptsatz',
    loesung: 'Deshalb müssen wir schnell handeln.',
    woerter: ['schnell', 'Deshalb', 'wir', 'handeln.', 'müssen'],
    erklaerung: 'V2-Regel: "Deshalb" cümle başında → fiil ("müssen") ikinci konumda gelir.',
  },
  {
    id: 2, typ: 'hauptsatz',
    loesung: 'Trotzdem bleibt die Situation schwierig.',
    woerter: ['die', 'Trotzdem', 'schwierig.', 'Situation', 'bleibt'],
    erklaerung: '"Trotzdem" cümle başında → fiil ("bleibt") hemen ardından gelir (V2).',
  },
  {
    id: 3, typ: 'hauptsatz',
    loesung: 'Häufig wird dieses Problem unterschätzt.',
    woerter: ['Häufig', 'Problem', 'dieses', 'unterschätzt.', 'wird'],
    erklaerung: '"Häufig" önde → "wird" ikinci konumda; Passiv yapısı korunur.',
  },
  {
    id: 4, typ: 'hauptsatz',
    loesung: 'Nur so lässt sich das Problem lösen.',
    woerter: ['lässt', 'Problem', 'Nur', 'sich', 'so', 'das', 'lösen.'],
    erklaerung: '"Nur so" önde → "lässt" ikinci konumda; "sich lösen" = pasif ikamesi.',
  },
  {
    id: 5, typ: 'hauptsatz',
    loesung: 'Daher muss man alle Alternativen berücksichtigen.',
    woerter: ['man', 'Alternativen', 'Daher', 'alle', 'muss', 'berücksichtigen.'],
    erklaerung: '"Daher" önde → "muss" ikinci konumda; fiil sonu "berücksichtigen".',
  },
  {
    id: 6, typ: 'hauptsatz',
    loesung: 'Immer mehr Menschen nutzen digitale Technologien.',
    woerter: ['mehr', 'Technologien.', 'nutzen', 'Immer', 'digitale', 'Menschen'],
    erklaerung: '"Immer mehr Menschen" = özne öbek. Fiil ("nutzen") 2. konumda.',
  },
  {
    id: 7, typ: 'hauptsatz',
    loesung: 'In vielen Ländern gilt dies als selbstverständlich.',
    woerter: ['In', 'gilt', 'Ländern', 'als', 'selbstverständlich.', 'vielen', 'dies'],
    erklaerung: '"In vielen Ländern" zaman/yer zarfı önde → "gilt" hemen ardından (V2).',
  },
  {
    id: 8, typ: 'hauptsatz',
    loesung: 'Angesichts dieser Entwicklung sind dringende Maßnahmen notwendig.',
    woerter: ['dieser', 'Angesichts', 'notwendig.', 'Maßnahmen', 'sind', 'dringende', 'Entwicklung'],
    erklaerung: '"Angesichts + Genitiv" önde → "sind" ikinci konumda; özne sonra gelir.',
  },
  {
    id: 9, typ: 'hauptsatz',
    loesung: 'Aus diesem Grund hat die Regierung gehandelt.',
    woerter: ['hat', 'Grund', 'diesem', 'die', 'gehandelt.', 'Regierung', 'Aus'],
    erklaerung: '"Aus diesem Grund" önde → "hat" ikinci konumda; Perfekt yapısı: "hat ... gehandelt".',
  },
  {
    id: 10, typ: 'hauptsatz',
    loesung: 'Dennoch bleibt die Frage offen, wer dafür verantwortlich ist.',
    woerter: ['wer', 'Dennoch', 'offen,', 'bleibt', 'die', 'dafür', 'verantwortlich', 'Frage', 'ist.'],
    erklaerung: '"Dennoch" önde → "bleibt" ikinci konumda; Nebensatz "wer ... ist" sona gelir.',
  },

  // ── Nebensatz · Verb-letzt ──────────────────────────────────────
  {
    id: 11, typ: 'nebensatz',
    loesung: 'Es ist wichtig, dass alle Beteiligten Verantwortung übernehmen.',
    woerter: ['Es', 'ist', 'wichtig,', 'dass', 'alle', 'Beteiligten', 'Verantwortung', 'übernehmen.'],
    erklaerung: '"dass"-Satz: fiil sona gider. "übernehmen" = Satzende.',
  },
  {
    id: 12, typ: 'nebensatz',
    loesung: 'Viele Forscher glauben, dass die Digitalisierung neue Chancen schafft.',
    woerter: ['Viele', 'Forscher', 'glauben,', 'dass', 'die', 'Digitalisierung', 'neue', 'Chancen', 'schafft.'],
    erklaerung: '"dass"-Nebensatz: "schafft" cümle sonunda.',
  },
  {
    id: 13, typ: 'nebensatz',
    loesung: 'Es ist bekannt, dass regelmäßige Bewegung die Gesundheit fördert.',
    woerter: ['Es', 'ist', 'bekannt,', 'dass', 'regelmäßige', 'Bewegung', 'die', 'Gesundheit', 'fördert.'],
    erklaerung: '"dass"-Satz: fiil "fördert" en sona gider.',
  },
  {
    id: 14, typ: 'nebensatz',
    loesung: 'Die Studie zeigt, dass soziale Ungleichheit zunimmt.',
    woerter: ['zeigt,', 'Die', 'dass', 'Studie', 'soziale', 'Ungleichheit', 'zunimmt.'],
    erklaerung: '"zunimmt" ayrılabilir fiil değil, Nebensatz sonunda fiil olarak gelir.',
  },
  {
    id: 15, typ: 'nebensatz',
    loesung: 'Man hofft, dass die neuen Maßnahmen Wirkung zeigen werden.',
    woerter: ['Wirkung', 'Man', 'die', 'dass', 'neuen', 'hofft,', 'Maßnahmen', 'zeigen', 'werden.'],
    erklaerung: 'Futur I Nebensatz: "zeigen werden" sona gider (Infinitiv + werden).',
  },
  {
    id: 16, typ: 'nebensatz',
    loesung: 'Es scheint, dass sich die wirtschaftliche Lage verbessert.',
    woerter: ['Es', 'scheint,', 'die', 'sich', 'dass', 'wirtschaftliche', 'verbessert.', 'Lage'],
    erklaerung: '"sich verbessern" → Nebensatz: özne + "sich" + nesne + fiil sırası.',
  },
  {
    id: 17, typ: 'nebensatz',
    loesung: 'Obwohl die Lage schwierig war, blieben alle ruhig.',
    woerter: ['alle', 'die', 'Obwohl', 'ruhig.', 'war,', 'Lage', 'schwierig', 'blieben'],
    erklaerung: '"obwohl"-Satz → fiil sona ("war,"); Ana cümle V2 kuralına göre: "blieben" ikinci.',
  },
  {
    id: 18, typ: 'nebensatz',
    loesung: 'Weil das Projekt erfolgreich war, feierten wir gemeinsam.',
    woerter: ['wir', 'Weil', 'erfolgreich', 'das', 'war,', 'Projekt', 'feierten', 'gemeinsam.'],
    erklaerung: '"weil"-Satz → fiil sona ("war,"); Ana cümle inversiyonla başlar: "feierten wir".',
  },
  {
    id: 19, typ: 'nebensatz',
    loesung: 'Er erklärt, dass dieser Ansatz langfristig effektiver ist.',
    woerter: ['Der', 'erklärt,', 'effektiver', 'dass', 'dieser', 'Experte', 'Ansatz', 'langfristig', 'ist.'],
    erklaerung: '"dass"-Satz: "ist" cümle sonunda. Sıfatlar fiilden önce: "langfristig effektiver ist".',
  },
  {
    id: 20, typ: 'nebensatz',
    loesung: 'Damit alle profitieren können, muss das Angebot ausgebaut werden.',
    woerter: ['alle', 'Damit', 'können,', 'muss', 'profitieren', 'das', 'Angebot', 'ausgebaut', 'werden.'],
    erklaerung: '"damit"-Satz fiil sona ("können,"); ana cümle inversiyonla: "muss" 2. konumda.',
  },

  // ── Satzklammer · Trennbare Verben ─────────────────────────────
  {
    id: 21, typ: 'satzklammer',
    loesung: 'Sie ruft ihren Freund jeden Abend an.',
    woerter: ['ihren', 'Sie', 'an.', 'ruft', 'Abend', 'Freund', 'jeden'],
    erklaerung: '"anrufen" ayrılabilir fiil: "ruft" 2. konumda, "an" en sona gider (Satzklammer).',
  },
  {
    id: 22, typ: 'satzklammer',
    loesung: 'Die Regierung führt neue Gesetze ein.',
    woerter: ['ein.', 'führt', 'Regierung', 'neue', 'Die', 'Gesetze'],
    erklaerung: '"einführen": "führt" 2. konumda, "ein" sona gider.',
  },
  {
    id: 23, typ: 'satzklammer',
    loesung: 'Er gibt seinen alten Plan nicht auf.',
    woerter: ['Plan', 'Er', 'auf.', 'gibt', 'nicht', 'seinen', 'alten'],
    erklaerung: '"aufgeben": "gibt" 2. konumda, "auf" sona; "nicht" fiilden hemen önce.',
  },
  {
    id: 24, typ: 'satzklammer',
    loesung: 'Sie bringt ihre Ideen klar zum Ausdruck.',
    woerter: ['zum', 'Ideen', 'bringt', 'Sie', 'klar', 'ihre', 'Ausdruck.'],
    erklaerung: '"zum Ausdruck bringen": "bringt" 2. konumda, "zum Ausdruck" sona.',
  },
  {
    id: 25, typ: 'satzklammer',
    loesung: 'Der Zug fährt um 8 Uhr ab.',
    woerter: ['fährt', 'Der', 'Uhr', 'Zug', 'ab.', 'um', '8'],
    erklaerung: '"abfahren": "fährt" 2. konumda, "ab" sona (Satzklammer).',
  },
  {
    id: 26, typ: 'satzklammer',
    loesung: 'Die Konferenz findet nächste Woche statt.',
    woerter: ['findet', 'Konferenz', 'statt.', 'Die', 'Woche', 'nächste'],
    erklaerung: '"stattfinden": "findet" 2. konumda, "statt" sona.',
  },
  {
    id: 27, typ: 'satzklammer',
    loesung: 'Er hört mit dem Rauchen endlich auf.',
    woerter: ['Rauchen', 'Er', 'dem', 'auf.', 'hört', 'endlich', 'mit'],
    erklaerung: '"aufhören": "hört" 2. konumda, "auf" sona; "mit" + Dat. ortada.',
  },
  {
    id: 28, typ: 'satzklammer',
    loesung: 'Das Projekt kommt nach langen Verhandlungen zustande.',
    woerter: ['nach', 'Das', 'zustande.', 'kommt', 'langen', 'Projekt', 'Verhandlungen'],
    erklaerung: '"zustande kommen": "kommt" 2. konumda, "zustande" sona.',
  },
  {
    id: 29, typ: 'satzklammer',
    loesung: 'Der Vortragende stellt seine Ergebnisse kurz vor.',
    woerter: ['Der', 'stellt', 'Ergebnisse', 'vor.', 'seine', 'Vortragende', 'kurz'],
    erklaerung: '"vorstellen": "stellt" 2. konumda, "vor" sona.',
  },
  {
    id: 30, typ: 'satzklammer',
    loesung: 'Er nimmt an dem Seminar regelmäßig teil.',
    woerter: ['Er', 'dem', 'regelmäßig', 'Seminar', 'teil.', 'nimmt', 'an'],
    erklaerung: '"teilnehmen an + Dat.": "nimmt" 2. konumda, "teil" sona; "an dem" ortada.',
  },

  // ── Relativsatz ─────────────────────────────────────────────────
  {
    id: 31, typ: 'relativsatz',
    loesung: 'Ich kenne den Mann, der hier arbeitet.',
    woerter: ['hier', 'Ich', 'arbeitet.', 'Mann,', 'kenne', 'der', 'den'],
    erklaerung: 'Relativsatz: "der" = eril Nominativ; fiil "arbeitet" sona gider.',
  },
  {
    id: 32, typ: 'relativsatz',
    loesung: 'Das Buch, welches er empfohlen hat, war sehr interessant.',
    woerter: ['Das', 'er', 'Buch,', 'welches', 'hat,', 'war', 'empfohlen', 'interessant.', 'sehr'],
    erklaerung: 'Relativpronomen "welches" (nötr); Perfekt Nebensatz: "empfohlen hat" sona.',
  },
  {
    id: 33, typ: 'relativsatz',
    loesung: 'Die Studentin, deren Arbeit preisgekrönt wurde, ist bekannt.',
    woerter: ['ist', 'Arbeit', 'preisgekrönt', 'bekannt.', 'Die', 'Studentin,', 'deren', 'wurde,'],
    erklaerung: '"deren" = Genitiv dişil (kimin). Passiv Relativsatz: "preisgekrönt wurde" sona.',
  },
  {
    id: 34, typ: 'relativsatz',
    loesung: 'Das ist ein Problem, über das wir dringend sprechen müssen.',
    woerter: ['Das', 'wir', 'ein', 'sprechen', 'ist', 'Problem,', 'das', 'über', 'dringend', 'müssen.'],
    erklaerung: '"über das" = Präpositionalpronomen; Modal Nebensatz: "sprechen müssen" sona.',
  },
  {
    id: 35, typ: 'relativsatz',
    loesung: 'Die Lösung, die er vorschlägt, ist sinnvoll und realisierbar.',
    woerter: ['Die', 'er', 'Lösung,', 'die', 'vorschlägt,', 'ist', 'sinnvoll', 'und', 'realisierbar.'],
    erklaerung: '"die" = dişil Nominativ; ayrılabilir fiil "vorschlägt" sona gelir.',
  },

  // ── Modal + Infinitiv ───────────────────────────────────────────
  {
    id: 36, typ: 'modal',
    loesung: 'Er muss das Projekt bis Freitag fertigstellen.',
    woerter: ['Er', 'fertigstellen.', 'das', 'muss', 'Freitag', 'bis', 'Projekt'],
    erklaerung: 'Modal "muss" 2. konumda; Infinitiv "fertigstellen" sona gider.',
  },
  {
    id: 37, typ: 'modal',
    loesung: 'Sie kann die komplexe Aufgabe alleine lösen.',
    woerter: ['Sie', 'alleine', 'kann', 'Aufgabe', 'die', 'komplexe', 'lösen.'],
    erklaerung: 'Modal "kann" 2. konumda; Infinitiv "lösen" sona.',
  },
  {
    id: 38, typ: 'modal',
    loesung: 'Wir sollen die neuen Regeln genau befolgen.',
    woerter: ['neuen', 'die', 'genau', 'Regeln', 'Wir', 'sollen', 'befolgen.'],
    erklaerung: '"sollen" normatif görev bildirir; Infinitiv "befolgen" sona.',
  },
  {
    id: 39, typ: 'modal',
    loesung: 'Man muss alle Konsequenzen sorgfältig berücksichtigen.',
    woerter: ['sorgfältig', 'muss', 'berücksichtigen.', 'Konsequenzen', 'alle', 'Man'],
    erklaerung: '"muss" 2. konumda; Infinitiv "berücksichtigen" sona.',
  },
  {
    id: 40, typ: 'modal',
    loesung: 'Sie will ihre wissenschaftlichen Kenntnisse weiter vertiefen.',
    woerter: ['Sie', 'will', 'ihre', 'wissenschaftlichen', 'Kenntnisse', 'weiter', 'vertiefen.'],
    erklaerung: '"will" 2. konumda; Infinitiv "vertiefen" sona gider.',
  },
];

export const ALLE_TYPEN: SatzTyp[] = ['hauptsatz', 'nebensatz', 'satzklammer', 'relativsatz', 'modal'];
