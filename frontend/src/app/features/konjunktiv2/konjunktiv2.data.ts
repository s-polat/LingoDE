export type K2Kategorie =
  | 'würde + Infinitiv'
  | 'hätte / wäre'
  | 'Konjunktiv II Perfekt'
  | 'Modalverben'
  | 'Höfliche Bitten'
  | 'Irreale Konditionalsätze'
  | 'Ratschläge & Empfehlungen';

export interface K2Exercise {
  id: number;
  kategorie: K2Kategorie;
  typ: 'umformung' | 'luecke';
  // umformung: İndikatif cümle → Konjunktiv II cümle
  indikativ?: string;
  // luecke: ___ ile işaretlenmiş boşluklu cümle
  satz?: string;
  optionen?: string[]; // [0] = doğru cevap, geri kalanlar çeldiriciler
  konjunktiv: string;  // tam doğru Konjunktiv II cümle
  formel: string;      // kısa yapı formülü
  erklaerung: string;  // Türkçe açıklama
}

export const K2_KATEGORIEN: { name: K2Kategorie; emoji: string; formel: string }[] = [
  { name: 'würde + Infinitiv',         emoji: '🔵', formel: 'würde/würden + Infinitiv' },
  { name: 'hätte / wäre',              emoji: '🟣', formel: 'hätte / wäre (düzensiz formlar)' },
  { name: 'Konjunktiv II Perfekt',     emoji: '🟢', formel: 'hätte/wäre + Partizip II' },
  { name: 'Modalverben',               emoji: '🟠', formel: 'könnte / müsste / sollte / dürfte' },
  { name: 'Höfliche Bitten',           emoji: '🔴', formel: 'Könnten Sie...? / Würden Sie...?' },
  { name: 'Irreale Konditionalsätze',  emoji: '🟡', formel: 'wenn + Konj. II … würde/hätte/wäre' },
  { name: 'Ratschläge & Empfehlungen', emoji: '⚪', formel: 'An deiner Stelle würde ich... / solltest' },
];

export const K2_DATA: K2Exercise[] = [

  // ── WÜRDE + İNFİNİTİV ─────────────────────────────────────────
  {
    id: 1, kategorie: 'würde + Infinitiv', typ: 'umformung',
    indikativ:  'Ich kaufe ein neues Auto.',
    konjunktiv: 'Ich würde ein neues Auto kaufen.',
    formel: 'würde + Infinitiv',
    erklaerung: "'würde', 'werden' fiilinin Konjunktiv II formudur. Düzenli fiiller için 'würde + Infinitiv' kullanılır.",
  },
  {
    id: 2, kategorie: 'würde + Infinitiv', typ: 'umformung',
    indikativ:  'Er hilft mir bei der Hausarbeit.',
    konjunktiv: 'Er würde mir bei der Hausarbeit helfen.',
    formel: 'würde + Infinitiv',
    erklaerung: "'helfen' → 'würde helfen'. Fiil cümle sonuna gider, çekimsiz (Infinitiv) kalır.",
  },
  {
    id: 3, kategorie: 'würde + Infinitiv', typ: 'umformung',
    indikativ:  'Sie lernt jeden Tag eine Stunde.',
    konjunktiv: 'Sie würde jeden Tag eine Stunde lernen.',
    formel: 'würde + Infinitiv',
    erklaerung: "'würde' özneye göre çekimlenir: ich würde, du würdest, er/sie/es würde, wir würden...",
  },
  {
    id: 4, kategorie: 'würde + Infinitiv', typ: 'umformung',
    indikativ:  'Wir fahren ans Meer.',
    konjunktiv: 'Wir würden ans Meer fahren.',
    formel: 'würden + Infinitiv',
    erklaerung: "Çoğul 1. şahıs: 'würden'. Fiil (fahren) sonda kalır.",
  },
  {
    id: 5, kategorie: 'würde + Infinitiv', typ: 'luecke',
    satz:       'Er _____ gern mehr reisen, aber er hat keine Zeit.',
    optionen:   ['würde', 'wird', 'wäre', 'hätte'],
    konjunktiv: 'Er würde gern mehr reisen, aber er hat keine Zeit.',
    formel: 'würde + Infinitiv',
    erklaerung: "Gerçekleşmeyen istek → 'würde + Infinitiv'. 'wird' gerçek gelecek zaman olur.",
  },
  {
    id: 6, kategorie: 'würde + Infinitiv', typ: 'luecke',
    satz:       'Ich _____ dir helfen, wenn ich Zeit hätte.',
    optionen:   ['würde', 'werde', 'wäre', 'könnte'],
    konjunktiv: 'Ich würde dir helfen, wenn ich Zeit hätte.',
    formel: 'würde + Infinitiv',
    erklaerung: "Koşullu cümlelerde ana cümlede 'würde + Infinitiv' kullanılır.",
  },
  {
    id: 7, kategorie: 'würde + Infinitiv', typ: 'luecke',
    satz:       'Das _____ viel besser klingen.',
    optionen:   ['würde', 'wird', 'wäre', 'hat'],
    konjunktiv: 'Das würde viel besser klingen.',
    formel: 'würde + Infinitiv',
    erklaerung: "'klingen' fiiliyle 'würde klingen' — gerçekleşmemiş, varsayımsal durum.",
  },
  {
    id: 8, kategorie: 'würde + Infinitiv', typ: 'luecke',
    satz:       'Wir _____ gern länger bleiben.',
    optionen:   ['würden', 'werden', 'wären', 'hätten'],
    konjunktiv: 'Wir würden gern länger bleiben.',
    formel: 'würden + Infinitiv',
    erklaerung: "Çoğul 1. şahıs için 'würden'. 'werden' düz geniş/gelecek zaman olur.",
  },

  // ── HÄTTE / WÄRE ──────────────────────────────────────────────
  {
    id: 9, kategorie: 'hätte / wäre', typ: 'umformung',
    indikativ:  'Ich habe mehr Zeit.',
    konjunktiv: 'Ich hätte mehr Zeit.',
    formel: 'hätte (haben → Konj. II)',
    erklaerung: "'haben' Konjunktiv II = 'hätte'. 'würde haben' değil, doğrudan 'hätte' kullanılır.",
  },
  {
    id: 10, kategorie: 'hätte / wäre', typ: 'umformung',
    indikativ:  'Er ist zu Hause.',
    konjunktiv: 'Er wäre zu Hause.',
    formel: 'wäre (sein → Konj. II)',
    erklaerung: "'sein' Konjunktiv II = 'wäre'. 'würde sein' yerine doğrudan 'wäre' tercih edilir.",
  },
  {
    id: 11, kategorie: 'hätte / wäre', typ: 'umformung',
    indikativ:  'Sie haben viel Freizeit.',
    konjunktiv: 'Sie hätten viel Freizeit.',
    formel: 'hätten (haben → Konj. II Plural)',
    erklaerung: "Çoğul 3. şahıs: 'hätten'. haben → ich hätte, du hättest, er hätte, wir hätten...",
  },
  {
    id: 12, kategorie: 'hätte / wäre', typ: 'umformung',
    indikativ:  'Wir sind alle dabei.',
    konjunktiv: 'Wir wären alle dabei.',
    formel: 'wären (sein → Konj. II Plural)',
    erklaerung: "sein → ich wäre, du wärst, er wäre, wir wären, ihr wärt, sie wären.",
  },
  {
    id: 13, kategorie: 'hätte / wäre', typ: 'luecke',
    satz:       'Wenn ich reich _____, würde ich viel reisen.',
    optionen:   ['wäre', 'war', 'bin', 'würde sein'],
    konjunktiv: 'Wenn ich reich wäre, würde ich viel reisen.',
    formel: 'wäre',
    erklaerung: "'sein' için 'wäre' kullan. 'würde sein' yerine 'wäre' tercih edilir.",
  },
  {
    id: 14, kategorie: 'hätte / wäre', typ: 'luecke',
    satz:       'Ich _____ dankbar, wenn du mir helfen könntest.',
    optionen:   ['wäre', 'bin', 'war', 'würde sein'],
    konjunktiv: 'Ich wäre dankbar, wenn du mir helfen könntest.',
    formel: 'wäre',
    erklaerung: "'wäre' dankbar/froh/glücklich gibi sıfatlarla çok kullanılır.",
  },
  {
    id: 15, kategorie: 'hätte / wäre', typ: 'luecke',
    satz:       'Das _____ schön.',
    optionen:   ['wäre', 'war', 'ist', 'würde sein'],
    konjunktiv: 'Das wäre schön.',
    formel: 'wäre',
    erklaerung: "Çok yaygın kısa form: 'Das wäre schön / gut / toll / möglich.'",
  },
  {
    id: 16, kategorie: 'hätte / wäre', typ: 'luecke',
    satz:       'Er _____ gern Arzt, aber er hat Medizin nicht studiert.',
    optionen:   ['wäre', 'war', 'ist', 'würde sein'],
    konjunktiv: 'Er wäre gern Arzt, aber er hat Medizin nicht studiert.',
    formel: 'wäre gern + Beruf',
    erklaerung: "'wäre gern + meslek' = gerçekleşmeyen meslek isteği. Çok kullanılan kalıp.",
  },

  // ── KONJUNKTIV II PERFEKT ──────────────────────────────────────
  {
    id: 17, kategorie: 'Konjunktiv II Perfekt', typ: 'umformung',
    indikativ:  'Ich habe das Buch gelesen. (aber nicht getan)',
    konjunktiv: 'Ich hätte das Buch gelesen.',
    formel: 'hätte + Partizip II',
    erklaerung: "Geçmişte gerçekleşmeyen eylem → Konj. II Perfekt: hätte/wäre + Partizip II.",
  },
  {
    id: 18, kategorie: 'Konjunktiv II Perfekt', typ: 'umformung',
    indikativ:  'Er ist pünktlich angekommen. (aber nicht passiert)',
    konjunktiv: 'Er wäre pünktlich angekommen.',
    formel: 'wäre + Partizip II',
    erklaerung: "Hareket fiilleri (ankommen, fahren, gehen...) 'wäre' ile kullanılır.",
  },
  {
    id: 19, kategorie: 'Konjunktiv II Perfekt', typ: 'umformung',
    indikativ:  'Sie hat ihm geholfen. (aber nicht getan)',
    konjunktiv: 'Sie hätte ihm geholfen.',
    formel: 'hätte + Partizip II',
    erklaerung: "'helfen' geçişli/etkin fiil → 'hätte'. Yalnızca hareket/durum değişimi fiilleri 'wäre' alır.",
  },
  {
    id: 20, kategorie: 'Konjunktiv II Perfekt', typ: 'umformung',
    indikativ:  'Wir sind früher losgefahren. (aber nicht passiert)',
    konjunktiv: 'Wir wären früher losgefahren.',
    formel: 'wären + Partizip II',
    erklaerung: "'losfahren' (ayrılmak) → hareket fiili → 'wären losgefahren'. Çoğul: wären.",
  },
  {
    id: 21, kategorie: 'Konjunktiv II Perfekt', typ: 'luecke',
    satz:       'Wenn ich früher aufgestanden _____, hätte ich den Zug nicht verpasst.',
    optionen:   ['wäre', 'hätte', 'war', 'würde sein'],
    konjunktiv: 'Wenn ich früher aufgestanden wäre, hätte ich den Zug nicht verpasst.',
    formel: 'wäre + Partizip II',
    erklaerung: "'aufstehen' → hareket/durum değişikliği → 'wäre aufgestanden'.",
  },
  {
    id: 22, kategorie: 'Konjunktiv II Perfekt', typ: 'luecke',
    satz:       'Sie _____ die Prüfung bestanden, wenn sie mehr gelernt hätte.',
    optionen:   ['hätte', 'wäre', 'hatte', 'würde'],
    konjunktiv: 'Sie hätte die Prüfung bestanden, wenn sie mehr gelernt hätte.',
    formel: 'hätte + Partizip II',
    erklaerung: "'bestehen' (geçmek) → geçişli eylem → 'hätte bestanden'.",
  },
  {
    id: 23, kategorie: 'Konjunktiv II Perfekt', typ: 'luecke',
    satz:       'Ich _____ das nie gesagt, wenn ich die Konsequenzen gewusst hätte.',
    optionen:   ['hätte', 'wäre', 'habe', 'würde'],
    konjunktiv: 'Ich hätte das nie gesagt, wenn ich die Konsequenzen gewusst hätte.',
    formel: 'hätte + Partizip II',
    erklaerung: "'sagen' → 'hätte gesagt'. Pişmanlık veya gerçekleşmeyen söz için.",
  },
  {
    id: 24, kategorie: 'Konjunktiv II Perfekt', typ: 'luecke',
    satz:       'Wenn du früher gekommen _____, hätten wir das Problem gelöst.',
    optionen:   ['wärst', 'hättest', 'warst', 'würdest'],
    konjunktiv: 'Wenn du früher gekommen wärst, hätten wir das Problem gelöst.',
    formel: 'wärst + Partizip II',
    erklaerung: "'kommen' → hareket fiili → 'wärst gekommen'. 2. tekil şahıs: 'wärst'.",
  },

  // ── MODALVERBEN ────────────────────────────────────────────────
  {
    id: 25, kategorie: 'Modalverben', typ: 'umformung',
    indikativ:  'Er kann das alleine schaffen.',
    konjunktiv: 'Er könnte das alleine schaffen.',
    formel: 'können → könnte',
    erklaerung: "Modal fiillerin Konj. II: können→könnte, müssen→müsste, sollen→sollte, dürfen→dürfte, wollen→wollte.",
  },
  {
    id: 26, kategorie: 'Modalverben', typ: 'umformung',
    indikativ:  'Du musst früher aufstehen.',
    konjunktiv: 'Du müsstest früher aufstehen.',
    formel: 'müssen → müsstest',
    erklaerung: "'müsstest' = zorunluluğu daha nazik veya hipotetik ifade eder.",
  },
  {
    id: 27, kategorie: 'Modalverben', typ: 'umformung',
    indikativ:  'Ich soll das erklären.',
    konjunktiv: 'Ich sollte das erklären.',
    formel: 'sollen → sollte',
    erklaerung: "'sollte' = beklenti/öneri. 'soll' gerçek yükümlülük, 'sollte' Konj. II öneri.",
  },
  {
    id: 28, kategorie: 'Modalverben', typ: 'umformung',
    indikativ:  'Sie darf hier parken.',
    konjunktiv: 'Sie dürfte hier parken.',
    formel: 'dürfen → dürfte',
    erklaerung: "'dürfte' = ihtimal ('wahrscheinlich') veya izin (nazik). İki anlamı var!",
  },
  {
    id: 29, kategorie: 'Modalverben', typ: 'luecke',
    satz:       'Du _____ mehr Wasser trinken.',
    optionen:   ['solltest', 'sollst', 'müsstest', 'würdest sollen'],
    konjunktiv: 'Du solltest mehr Wasser trinken.',
    formel: 'sollte (Empfehlung)',
    erklaerung: "'solltest' = öneri, tavsiye. Doktor veya arkadaş tavsiyesi için çok kullanılır.",
  },
  {
    id: 30, kategorie: 'Modalverben', typ: 'luecke',
    satz:       'Wir _____ das Problem gemeinsam angehen.',
    optionen:   ['könnten', 'können', 'konnten', 'würden können'],
    konjunktiv: 'Wir könnten das Problem gemeinsam angehen.',
    formel: 'könnte (Möglichkeit)',
    erklaerung: "'könnten' = olası çözüm önerisi. 'können' yerine daha nazik/hipotetik.",
  },
  {
    id: 31, kategorie: 'Modalverben', typ: 'luecke',
    satz:       'Das _____ die Lösung sein.',
    optionen:   ['könnte', 'kann', 'konnte', 'würde können'],
    konjunktiv: 'Das könnte die Lösung sein.',
    formel: 'könnte (Vermutung)',
    erklaerung: "'könnte' = ihtimal/tahmin. Yazılı Almancada çok yaygın kullanım.",
  },
  {
    id: 32, kategorie: 'Modalverben', typ: 'luecke',
    satz:       'Du _____ eigentlich früher kommen.',
    optionen:   ['müsstest', 'musst', 'musstest', 'würdest müssen'],
    konjunktiv: 'Du müsstest eigentlich früher kommen.',
    formel: 'müsstest (Erwartung)',
    erklaerung: "'müsstest' + 'eigentlich' = karşılanmamış beklenti, hafif kınama.",
  },

  // ── HÖFLİCHE BİTTEN ───────────────────────────────────────────
  {
    id: 33, kategorie: 'Höfliche Bitten', typ: 'umformung',
    indikativ:  'Können Sie mir helfen?',
    konjunktiv: 'Könnten Sie mir helfen?',
    formel: 'Konjunktiv II → höfliche Bitte',
    erklaerung: "Konjunktiv II soruları çok daha naziktir: 'Können' → 'Könnten', 'Haben' → 'Hätten'.",
  },
  {
    id: 34, kategorie: 'Höfliche Bitten', typ: 'umformung',
    indikativ:  'Haben Sie einen Moment Zeit?',
    konjunktiv: 'Hätten Sie einen Moment Zeit?',
    formel: 'hätten für höfliche Anfragen',
    erklaerung: "'Hätten Sie' = çok nazik. Resmi ortamlarda 'Haben Sie' yerine kullan.",
  },
  {
    id: 35, kategorie: 'Höfliche Bitten', typ: 'umformung',
    indikativ:  'Helfen Sie mir bitte!',
    konjunktiv: 'Könnten Sie mir bitte helfen?',
    formel: 'Imperativ → höfliche Bitte mit Konjunktiv II',
    erklaerung: "Emir cümleleri ('Helfen Sie!') Konjunktiv II ile çok daha kibar olur.",
  },
  {
    id: 36, kategorie: 'Höfliche Bitten', typ: 'umformung',
    indikativ:  'Öffnen Sie das Fenster!',
    konjunktiv: 'Würden Sie bitte das Fenster öffnen?',
    formel: 'würden für höfliche Bitten',
    erklaerung: "'Würden Sie bitte...' = en nazik rica formu, ofis/resmi ortamlar için ideal.",
  },
  {
    id: 37, kategorie: 'Höfliche Bitten', typ: 'luecke',
    satz:       '_____ Sie mir bitte das Formular erklären?',
    optionen:   ['Könnten', 'Können', 'Konnten', 'Würden'],
    konjunktiv: 'Könnten Sie mir bitte das Formular erklären?',
    formel: 'könnten (höfliche Frage)',
    erklaerung: "'Könnten Sie' = 'Können Sie' yerine çok daha nazik. Sınav yazılarında kullan.",
  },
  {
    id: 38, kategorie: 'Höfliche Bitten', typ: 'luecke',
    satz:       '_____ es möglich sein, den Termin zu verschieben?',
    optionen:   ['Wäre', 'War', 'Ist', 'Würde'],
    konjunktiv: 'Wäre es möglich, den Termin zu verschieben?',
    formel: 'Wäre es möglich...',
    erklaerung: "'Wäre es möglich...' = standart nazik talep formu, resmi yazışmalar için.",
  },
  {
    id: 39, kategorie: 'Höfliche Bitten', typ: 'luecke',
    satz:       'Ich _____ gern einen Tisch für zwei Personen reservieren.',
    optionen:   ['würde', 'werde', 'wäre', 'hätte'],
    konjunktiv: 'Ich würde gern einen Tisch für zwei Personen reservieren.',
    formel: 'würde gern...',
    erklaerung: "'würde gern' = 'möchte' yerine daha resmi talep. Telefon/e-postada yaygın.",
  },
  {
    id: 40, kategorie: 'Höfliche Bitten', typ: 'luecke',
    satz:       '_____ Sie mir Ihre Telefonnummer geben?',
    optionen:   ['Würden', 'Werden', 'Wären', 'Hätten'],
    konjunktiv: 'Würden Sie mir Ihre Telefonnummer geben?',
    formel: 'würden (höfliche Bitte)',
    erklaerung: "'Würden Sie' + Infinitiv = 'Bitte' olmadan bile çok kibar.",
  },

  // ── İRREALE KONDİTİONALSÄTZE ──────────────────────────────────
  {
    id: 41, kategorie: 'Irreale Konditionalsätze', typ: 'umformung',
    indikativ:  'Wenn ich mehr Zeit habe, helfe ich dir.',
    konjunktiv: 'Wenn ich mehr Zeit hätte, würde ich dir helfen.',
    formel: 'wenn + Konj. II … würde',
    erklaerung: "Gerçekleşmeyen koşul: Nebensatz'da Konj. II (hätte/wäre), Hauptsatz'da 'würde + Inf.'.",
  },
  {
    id: 42, kategorie: 'Irreale Konditionalsätze', typ: 'umformung',
    indikativ:  'Wenn er fleißiger ist, besteht er die Prüfung.',
    konjunktiv: 'Wenn er fleißiger wäre, würde er die Prüfung bestehen.',
    formel: 'wenn + wäre … würde',
    erklaerung: "'ist' → 'wäre'. 'besteht' → 'würde bestehen'. Her iki cümlede Konj. II.",
  },
  {
    id: 43, kategorie: 'Irreale Konditionalsätze', typ: 'umformung',
    indikativ:  'Wenn wir früher losfahren, kommen wir pünktlich an.',
    konjunktiv: 'Wenn wir früher losfahren würden, würden wir pünktlich ankommen.',
    formel: 'wenn + würde … würde + Infinitiv',
    erklaerung: "Her iki cümlede de 'würde + Infinitiv' mümkün.",
  },
  {
    id: 44, kategorie: 'Irreale Konditionalsätze', typ: 'umformung',
    indikativ:  'Wenn sie mehr schläft, fühlt sie sich besser.',
    konjunktiv: 'Wenn sie mehr schlafen würde, würde sie sich besser fühlen.',
    formel: 'wenn + würde … würde + Infinitiv',
    erklaerung: "'würde + schlafen' ve 'würde + fühlen'. Konj. II Präs. gerçekleşmeyen şimdiki durum.",
  },
  {
    id: 45, kategorie: 'Irreale Konditionalsätze', typ: 'luecke',
    satz:       'Wenn es nicht so kalt _____, würden wir spazieren gehen.',
    optionen:   ['wäre', 'ist', 'war', 'würde sein'],
    konjunktiv: 'Wenn es nicht so kalt wäre, würden wir spazieren gehen.',
    formel: 'wäre',
    erklaerung: "'sein' → 'wäre'. Nebensatz'ta 'würde sein' deme, direkt 'wäre' kullan.",
  },
  {
    id: 46, kategorie: 'Irreale Konditionalsätze', typ: 'luecke',
    satz:       'Wenn ich du _____, würde ich das Angebot annehmen.',
    optionen:   ['wäre', 'bin', 'war', 'würde sein'],
    konjunktiv: 'Wenn ich du wäre, würde ich das Angebot annehmen.',
    formel: 'wäre',
    erklaerung: "'Wenn ich du/er/sie wäre...' = çok kullanılan tavsiye formu.",
  },
  {
    id: 47, kategorie: 'Irreale Konditionalsätze', typ: 'luecke',
    satz:       'Wenn ich das gewusst _____, hätte ich anders gehandelt.',
    optionen:   ['hätte', 'habe', 'hatte', 'würde'],
    konjunktiv: 'Wenn ich das gewusst hätte, hätte ich anders gehandelt.',
    formel: 'hätte + Partizip II',
    erklaerung: "Geçmişe ait irreal koşul: 'gewusst hätte'. Her iki cümlede 'hätte + Partizip II'.",
  },
  {
    id: 48, kategorie: 'Irreale Konditionalsätze', typ: 'luecke',
    satz:       '_____ ich mehr Geld, würde ich eine Weltreise machen.',
    optionen:   ['Hätte', 'Habe', 'Hatte', 'Würde haben'],
    konjunktiv: 'Hätte ich mehr Geld, würde ich eine Weltreise machen.',
    formel: 'Hätte ich... (ohne wenn)',
    erklaerung: "'wenn' olmadan Konj. II: 'Wenn ich mehr Geld hätte' = 'Hätte ich mehr Geld' (fiil öne geçer).",
  },

  // ── RATSCHLÄGE & EMPFEHLUNGEn ─────────────────────────────────
  {
    id: 49, kategorie: 'Ratschläge & Empfehlungen', typ: 'umformung',
    indikativ:  'An deiner Stelle lerne ich mehr.',
    konjunktiv: 'An deiner Stelle würde ich mehr lernen.',
    formel: 'An deiner Stelle würde ich...',
    erklaerung: "'An deiner/Ihrer Stelle' + 'würde + Infinitiv' = standart tavsiye formu.",
  },
  {
    id: 50, kategorie: 'Ratschläge & Empfehlungen', typ: 'umformung',
    indikativ:  'Es ist besser, früh anzurufen.',
    konjunktiv: 'Es wäre besser, früh anzurufen.',
    formel: 'Es wäre besser...',
    erklaerung: "'Es wäre besser/sinnvoller/ratsam...' → nazik öneri. 'ist' yerine 'wäre' daha nazik.",
  },
  {
    id: 51, kategorie: 'Ratschläge & Empfehlungen', typ: 'umformung',
    indikativ:  'Ich empfehle dir, zum Arzt zu gehen.',
    konjunktiv: 'Ich würde dir empfehlen, zum Arzt zu gehen.',
    formel: 'würde empfehlen...',
    erklaerung: "'Ich würde dir empfehlen' = 'Ich empfehle dir' yerine çok daha nazik ve kibar.",
  },
  {
    id: 52, kategorie: 'Ratschläge & Empfehlungen', typ: 'umformung',
    indikativ:  'Du kannst auch eine andere Lösung wählen.',
    konjunktiv: 'Du könntest auch eine andere Lösung wählen.',
    formel: 'könntest (sanfte Empfehlung)',
    erklaerung: "'könntest' = 'kannst' yerine daha yumuşak öneri. Baskı hissettirmez.",
  },
  {
    id: 53, kategorie: 'Ratschläge & Empfehlungen', typ: 'luecke',
    satz:       'An Ihrer Stelle _____ ich das Angebot ablehnen.',
    optionen:   ['würde', 'werde', 'wäre', 'könnte'],
    konjunktiv: 'An Ihrer Stelle würde ich das Angebot ablehnen.',
    formel: 'An Ihrer Stelle würde ich...',
    erklaerung: "'An Ihrer Stelle' (resmi) / 'An deiner Stelle' (samimi) + 'würde ich + Infinitiv'.",
  },
  {
    id: 54, kategorie: 'Ratschläge & Empfehlungen', typ: 'luecke',
    satz:       'Es _____ sinnvoller, früher mit dem Lernen anzufangen.',
    optionen:   ['wäre', 'war', 'ist', 'würde sein'],
    konjunktiv: 'Es wäre sinnvoller, früher mit dem Lernen anzufangen.',
    formel: 'Es wäre + Adj.',
    erklaerung: "'Es wäre sinnvoller/besser/ratsam' → öneri cümlesi. Sınav yazılarında çok kullanılır.",
  },
  {
    id: 55, kategorie: 'Ratschläge & Empfehlungen', typ: 'luecke',
    satz:       'Du _____ vielleicht mit einem Lehrer sprechen.',
    optionen:   ['könntest', 'kannst', 'konntest', 'würdest'],
    konjunktiv: 'Du könntest vielleicht mit einem Lehrer sprechen.',
    formel: 'könntest + vielleicht',
    erklaerung: "'könntest vielleicht' = çok yumuşak öneri. 'vielleicht' eklemek tonu daha da hafifletir.",
  },
  {
    id: 56, kategorie: 'Ratschläge & Empfehlungen', typ: 'luecke',
    satz:       'Du _____ mehr Pausen machen.',
    optionen:   ['solltest', 'sollst', 'müsstest', 'würdest'],
    konjunktiv: 'Du solltest mehr Pausen machen.',
    formel: 'solltest (Empfehlung)',
    erklaerung: "'solltest' = doktor/uzman tavsiyesi gibi öneri. 'sollst' şimdiki gerçek yükümlülük olurdu.",
  },
];

export const K2_KATEGORIEN_LISTE = K2_KATEGORIEN.map(k => ({
  ...k,
  count: K2_DATA.filter(e => e.kategorie === k.name).length,
}));

export function shuffleK2(arr: K2Exercise[]): K2Exercise[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function shuffleStrings(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
