export type PassivKategorie =
  | 'Präsens'
  | 'Präteritum'
  | 'Perfekt'
  | 'Modalverben'
  | 'Zustandspassiv'
  | 'Futur / Konjunktiv II'
  | 'Nebensatz';

export interface PassivExercise {
  id: number;
  kategorie: PassivKategorie;
  typ: 'umformung' | 'luecke';
  // umformung: aktif cümle → pasif cümle
  aktiv?: string;
  // luecke: ___ ile işaretlenmiş boşluklu pasif cümle
  satz?: string;
  optionen?: string[]; // [0] = doğru cevap, geri kalanlar çeldiriciler
  passiv: string;      // tam doğru pasif cümle
  formel: string;      // kısa yapı formülü
  erklaerung: string;  // Türkçe açıklama
}

export const PASSIV_KATEGORIEN: { name: PassivKategorie; emoji: string; formel: string }[] = [
  { name: 'Präsens',              emoji: '🔵', formel: 'wird/werden + Partizip II' },
  { name: 'Präteritum',           emoji: '🟣', formel: 'wurde/wurden + Partizip II' },
  { name: 'Perfekt',              emoji: '🟢', formel: 'ist/sind + Partizip II + worden' },
  { name: 'Modalverben',          emoji: '🟠', formel: 'Modal + Partizip II + werden' },
  { name: 'Zustandspassiv',       emoji: '🔴', formel: 'sein + Partizip II (sonuç durumu)' },
  { name: 'Futur / Konjunktiv II',emoji: '🟡', formel: 'wird/würde + Partizip II + werden' },
  { name: 'Nebensatz',            emoji: '⚪', formel: '... dass ... Partizip II + wird/werden muss' },
];

export const PASSIV_DATA: PassivExercise[] = [

  // ── PRÄSENS ────────────────────────────────────────────────
  {
    id: 1, kategorie: 'Präsens', typ: 'umformung',
    aktiv:  'Der Arzt untersucht den Patienten.',
    passiv: 'Der Patient wird vom Arzt untersucht.',
    formel: 'wird + Partizip II',
    erklaerung: 'Akkusativ nesne (den Patienten) Nominativ özne olur. "untersuchen" → untersucht. Fail: "vom Arzt" isteğe bağlı.',
  },
  {
    id: 2, kategorie: 'Präsens', typ: 'umformung',
    aktiv:  'Man finanziert die Schulen mit Steuergeldern.',
    passiv: 'Die Schulen werden mit Steuergeldern finanziert.',
    formel: 'werden + Partizip II',
    erklaerung: '"Man" özne olarak pasife taşınmaz — sadece atlanır. Nesne çoğul → "werden" (çoğul).',
  },
  {
    id: 3, kategorie: 'Präsens', typ: 'umformung',
    aktiv:  'Die Regierung kontrolliert die Grenzen.',
    passiv: 'Die Grenzen werden von der Regierung kontrolliert.',
    formel: 'werden + Partizip II',
    erklaerung: '"die Grenzen" çoğul → "werden". Aktif özne "die Regierung" → "von der Regierung" (Dativ).',
  },
  {
    id: 4, kategorie: 'Präsens', typ: 'umformung',
    aktiv:  'Wissenschaftler erforschen neue Behandlungsmethoden.',
    passiv: 'Neue Behandlungsmethoden werden von Wissenschaftlern erforscht.',
    formel: 'werden + Partizip II',
    erklaerung: 'Çoğul nesne → "werden". Aktif özne "Wissenschaftler" → "von Wissenschaftlern" (Dativ çoğul).',
  },
  {
    id: 5, kategorie: 'Präsens', typ: 'umformung',
    aktiv:  'Man diskutiert das Thema in allen Medien.',
    passiv: 'Das Thema wird in allen Medien diskutiert.',
    formel: 'wird + Partizip II',
    erklaerung: '"Man" atlanır. Tekil nesne → "wird". Yer zarfı (in allen Medien) olduğu yerde kalır.',
  },
  {
    id: 6, kategorie: 'Präsens', typ: 'luecke',
    satz:    'Die neuen Regeln ___ ab sofort angewendet.',
    optionen: ['werden', 'wurden', 'worden', 'ist'],
    passiv:  'Die neuen Regeln werden ab sofort angewendet.',
    formel:  'werden + Partizip II',
    erklaerung: 'Çoğul özne → "werden". Präsens Passiv.',
  },
  {
    id: 7, kategorie: 'Präsens', typ: 'luecke',
    satz:    'Das Projekt ___ von allen Seiten unterstützt.',
    optionen: ['wird', 'wurde', 'worden', 'ist'],
    passiv:  'Das Projekt wird von allen Seiten unterstützt.',
    formel:  'wird + Partizip II',
    erklaerung: 'Tekil özne → "wird". Präsens Passiv.',
  },
  {
    id: 8, kategorie: 'Präsens', typ: 'umformung',
    aktiv:  'Der Professor erklärt die Aufgabe.',
    passiv: 'Die Aufgabe wird vom Professor erklärt.',
    formel: 'wird + Partizip II',
    erklaerung: 'Tekil nesne → "wird". "erklärt" hem geniş zaman hem de Partizip II — burada pasif anlamında.',
  },
  {
    id: 9, kategorie: 'Präsens', typ: 'luecke',
    satz:    'In diesem Labor ___ täglich neue Experimente durchgeführt.',
    optionen: ['werden', 'wurden', 'wird', 'ist'],
    passiv:  'In diesem Labor werden täglich neue Experimente durchgeführt.',
    formel:  'werden + Partizip II',
    erklaerung: '"Experimente" çoğul → "werden". "durchführen" = uygulamak → Partizip II: durchgeführt.',
  },
  {
    id: 10, kategorie: 'Präsens', typ: 'umformung',
    aktiv:  'Man verwendet hier viel erneuerbare Energie.',
    passiv: 'Hier wird viel erneuerbare Energie verwendet.',
    formel: 'wird + Partizip II',
    erklaerung: '"Man" atlanır. Yer zarfı "hier" cümle başına alınır, "wird" hemen arkasından gelir (inversion).',
  },

  // ── PRÄTERITUM ─────────────────────────────────────────────
  {
    id: 11, kategorie: 'Präteritum', typ: 'umformung',
    aktiv:  'Man erfand das Telefon im Jahr 1876.',
    passiv: 'Das Telefon wurde im Jahr 1876 erfunden.',
    formel: 'wurde + Partizip II',
    erklaerung: '"Man" atlanır. "erfinden" → Partizip II: erfunden. Geçmiş zaman → "wurde".',
  },
  {
    id: 12, kategorie: 'Präteritum', typ: 'umformung',
    aktiv:  'Die Regierung verabschiedete ein neues Klimagesetz.',
    passiv: 'Ein neues Klimagesetz wurde von der Regierung verabschiedet.',
    formel: 'wurde + Partizip II',
    erklaerung: 'Tekil nesne → "wurde". Aktif özne → "von der Regierung" (Dativ). "verabschieden" → verabschiedet.',
  },
  {
    id: 13, kategorie: 'Präteritum', typ: 'umformung',
    aktiv:  'Man baute die Berliner Mauer im Jahr 1961.',
    passiv: 'Die Berliner Mauer wurde im Jahr 1961 gebaut.',
    formel: 'wurde + Partizip II',
    erklaerung: '"Man" atlanır. "bauen" → gebaut. Özgül tarih = kesin geçmiş → Präteritum Passiv.',
  },
  {
    id: 14, kategorie: 'Präteritum', typ: 'luecke',
    satz:    'Das alte Rathaus ___ in den 1990er Jahren renoviert.',
    optionen: ['wurde', 'wird', 'worden', 'ist'],
    passiv:  'Das alte Rathaus wurde in den 1990er Jahren renoviert.',
    formel:  'wurde + Partizip II',
    erklaerung: 'Geçmişte belirli bir dönem → Präteritum Passiv: "wurde".',
  },
  {
    id: 15, kategorie: 'Präteritum', typ: 'luecke',
    satz:    'Die Verträge ___ von beiden Seiten unterzeichnet.',
    optionen: ['wurden', 'werden', 'worden', 'sind'],
    passiv:  'Die Verträge wurden von beiden Seiten unterzeichnet.',
    formel:  'wurden + Partizip II',
    erklaerung: '"Verträge" çoğul → "wurden" (çoğul Präteritum).',
  },
  {
    id: 16, kategorie: 'Präteritum', typ: 'umformung',
    aktiv:  'Der Staat förderte erneuerbare Energien mit Milliarden.',
    passiv: 'Erneuerbare Energien wurden vom Staat mit Milliarden gefördert.',
    formel: 'wurden + Partizip II',
    erklaerung: 'Çoğul nesne → "wurden". "fördern" → gefördert. Aktif özne → "vom Staat" (von + dem).',
  },
  {
    id: 17, kategorie: 'Präteritum', typ: 'umformung',
    aktiv:  'Man diskutierte das Problem intensiv auf der Konferenz.',
    passiv: 'Das Problem wurde auf der Konferenz intensiv diskutiert.',
    formel: 'wurde + Partizip II',
    erklaerung: '"Man" atlanır. Zarflar (intensiv, auf der Konferenz) aynı yerde kalır.',
  },
  {
    id: 18, kategorie: 'Präteritum', typ: 'luecke',
    satz:    'Die neuen Mitarbeiter ___ sofort eingestellt.',
    optionen: ['wurden', 'werden', 'worden', 'sind'],
    passiv:  'Die neuen Mitarbeiter wurden sofort eingestellt.',
    formel:  'wurden + Partizip II',
    erklaerung: 'Çoğul → "wurden". "einstellen" ayrılabilir fiil → Partizip II: eingestellt.',
  },

  // ── PERFEKT ────────────────────────────────────────────────
  {
    id: 19, kategorie: 'Perfekt', typ: 'umformung',
    aktiv:  'Man hat das Problem gelöst.',
    passiv: 'Das Problem ist gelöst worden.',
    formel: 'ist + Partizip II + worden',
    erklaerung: 'Perfekt Passiv: "sein" (ist/sind) + Partizip II + "worden". DİKKAT: "geworden" değil, "worden"!',
  },
  {
    id: 20, kategorie: 'Perfekt', typ: 'umformung',
    aktiv:  'Die Experten haben den Bericht veröffentlicht.',
    passiv: 'Der Bericht ist von den Experten veröffentlicht worden.',
    formel: 'ist + Partizip II + worden',
    erklaerung: 'Tekil nesne → "ist". Aktif özne → "von den Experten". Sonda mutlaka "worden" gelir.',
  },
  {
    id: 21, kategorie: 'Perfekt', typ: 'umformung',
    aktiv:  'Man hat die neuen Sicherheitsregeln eingeführt.',
    passiv: 'Die neuen Sicherheitsregeln sind eingeführt worden.',
    formel: 'sind + Partizip II + worden',
    erklaerung: 'Çoğul nesne → "sind". Ayrılabilir fiil "einführen" → Partizip II: eingeführt.',
  },
  {
    id: 22, kategorie: 'Perfekt', typ: 'luecke',
    satz:    'Das alte Gebäude ___ letztes Jahr abgerissen worden.',
    optionen: ['ist', 'wird', 'wurde', 'war'],
    passiv:  'Das alte Gebäude ist letztes Jahr abgerissen worden.',
    formel:  'ist + Partizip II + worden',
    erklaerung: 'Perfekt Passiv yardımcı fiili: "ist" (tekil). "worden" zaten var → sadece "ist" eksik.',
  },
  {
    id: 23, kategorie: 'Perfekt', typ: 'luecke',
    satz:    'Alle Dokumente ___ sorgfältig geprüft worden.',
    optionen: ['sind', 'werden', 'wurden', 'waren'],
    passiv:  'Alle Dokumente sind sorgfältig geprüft worden.',
    formel:  'sind + Partizip II + worden',
    erklaerung: '"Dokumente" çoğul → "sind". Perfekt Passiv.',
  },
  {
    id: 24, kategorie: 'Perfekt', typ: 'umformung',
    aktiv:  'Man hat den Fehler rechtzeitig korrigiert.',
    passiv: 'Der Fehler ist rechtzeitig korrigiert worden.',
    formel: 'ist + Partizip II + worden',
    erklaerung: '"Man" atlanır. Tekil → "ist". Zarfı (rechtzeitig) aynı yerde tut.',
  },
  {
    id: 25, kategorie: 'Perfekt', typ: 'umformung',
    aktiv:  'Die Teilnehmer haben das Projekt erfolgreich abgeschlossen.',
    passiv: 'Das Projekt ist von den Teilnehmern erfolgreich abgeschlossen worden.',
    formel: 'ist + Partizip II + worden',
    erklaerung: 'Aktif özne → "von den Teilnehmern". "abschließen" → abgeschlossen. Sonda "worden".',
  },
  {
    id: 26, kategorie: 'Perfekt', typ: 'luecke',
    satz:    'Die Entscheidung ___ nach langer Diskussion getroffen worden.',
    optionen: ['ist', 'wird', 'wurde', 'wird sein'],
    passiv:  'Die Entscheidung ist nach langer Diskussion getroffen worden.',
    formel:  'ist + Partizip II + worden',
    erklaerung: 'Tekil → "ist". "treffen" kuvvetli fiil → Partizip II: getroffen.',
  },

  // ── MODALVERBEN ────────────────────────────────────────────
  {
    id: 27, kategorie: 'Modalverben', typ: 'umformung',
    aktiv:  'Man muss das Problem sofort lösen.',
    passiv: 'Das Problem muss sofort gelöst werden.',
    formel: 'Modalverb + Partizip II + werden',
    erklaerung: 'Modal değişmez. Aktif "lösen" → pasif "gelöst werden". "werden" infinitif olarak sona gelir.',
  },
  {
    id: 28, kategorie: 'Modalverben', typ: 'umformung',
    aktiv:  'Man kann die Kosten durch bessere Planung reduzieren.',
    passiv: 'Die Kosten können durch bessere Planung reduziert werden.',
    formel: 'können + Partizip II + werden',
    erklaerung: 'Çoğul → "können" (çoğul uyumu). "reduzieren" → reduziert. Sona "werden" eklenir.',
  },
  {
    id: 29, kategorie: 'Modalverben', typ: 'umformung',
    aktiv:  'Man sollte mehr in frühkindliche Bildung investieren.',
    passiv: 'Mehr sollte in frühkindliche Bildung investiert werden.',
    formel: 'sollte + Partizip II + werden',
    erklaerung: 'Özne yoksa "es" ya da belirsiz miktar özne olur. "sollte" Konjunktiv II + pasif → çok akademik yapı.',
  },
  {
    id: 30, kategorie: 'Modalverben', typ: 'umformung',
    aktiv:  'Man darf in diesem Bereich nicht fotografieren.',
    passiv: 'In diesem Bereich darf nicht fotografiert werden.',
    formel: 'darf nicht + Partizip II + werden',
    erklaerung: 'Yasaklar için. "man" atlanır, yer zarfı başa gelir. "fotografieren" → fotografiert.',
  },
  {
    id: 31, kategorie: 'Modalverben', typ: 'luecke',
    satz:    'Die Regeln müssen sofort geändert ___.',
    optionen: ['werden', 'worden', 'wurde', 'sein'],
    passiv:  'Die Regeln müssen sofort geändert werden.',
    formel:  'müssen + Partizip II + werden',
    erklaerung: 'Modal + Passiv → sonda "werden" (infinitiv). "worden" değil — "worden" sadece Perfekt Passiv\'de.',
  },
  {
    id: 32, kategorie: 'Modalverben', typ: 'luecke',
    satz:    'Das Dokument kann online eingereicht ___.',
    optionen: ['werden', 'worden', 'wurde', 'sein'],
    passiv:  'Das Dokument kann online eingereicht werden.',
    formel:  'kann + Partizip II + werden',
    erklaerung: 'Modal + Passiv: "können" + Partizip II + "werden". Sona "werden" (infinitiv) gelir.',
  },
  {
    id: 33, kategorie: 'Modalverben', typ: 'umformung',
    aktiv:  'Man muss die Umwelt konsequent schützen.',
    passiv: 'Die Umwelt muss konsequent geschützt werden.',
    formel: 'muss + Partizip II + werden',
    erklaerung: '"schützen" → geschützt. Zarfı (konsequent) ortada tutar. Sona "werden".',
  },
  {
    id: 34, kategorie: 'Modalverben', typ: 'luecke',
    satz:    'Der Vertrag sollte so schnell wie möglich unterzeichnet ___.',
    optionen: ['werden', 'worden', 'wurde', 'sein'],
    passiv:  'Der Vertrag sollte so schnell wie möglich unterzeichnet werden.',
    formel:  'sollte + Partizip II + werden',
    erklaerung: '"sollte" = Konjunktiv II. Modal + Passiv yapısında yine sona "werden" gelir.',
  },
  {
    id: 35, kategorie: 'Modalverben', typ: 'umformung',
    aktiv:  'Man könnte mehr Ressourcen für Forschung bereitstellen.',
    passiv: 'Mehr Ressourcen könnten für Forschung bereitgestellt werden.',
    formel: 'könnten + Partizip II + werden',
    erklaerung: '"könnten" = Konjunktiv II + çoğul. "bereitstellen" ayrılabilir → bereitgestellt. Sona "werden".',
  },
  {
    id: 36, kategorie: 'Modalverben', typ: 'luecke',
    satz:    'Das Gebäude darf aus Denkmalschutzgründen nicht abgerissen ___.',
    optionen: ['werden', 'worden', 'wurde', 'sein'],
    passiv:  'Das Gebäude darf aus Denkmalschutzgründen nicht abgerissen werden.',
    formel:  'darf nicht + Partizip II + werden',
    erklaerung: 'Yasak ifade etmek için "darf nicht ... werden". "abreißen" → abgerissen.',
  },

  // ── ZUSTANDSPASSIV ─────────────────────────────────────────
  {
    id: 37, kategorie: 'Zustandspassiv', typ: 'umformung',
    aktiv:  'Man hat das Büro für heute geschlossen. (Şu anki durum)',
    passiv: 'Das Büro ist geschlossen.',
    formel: 'sein + Partizip II (sonuç durumu)',
    erklaerung: 'Zustandspassiv: eylemin SONUCU / mevcut durum. "ist geschlossen" = şu an kapalı. Vorgangspassiv ile karşılaştır: "wurde geschlossen" = kapatıldı (eylem).',
  },
  {
    id: 38, kategorie: 'Zustandspassiv', typ: 'umformung',
    aktiv:  'Man hat die Tür geöffnet. (Şu anki durum)',
    passiv: 'Die Tür ist geöffnet.',
    formel: 'ist + Partizip II',
    erklaerung: 'Zustandspassiv: "ist geöffnet" = şu an açık durumda. Eylem değil, sonuç durumunu tarif eder.',
  },
  {
    id: 39, kategorie: 'Zustandspassiv', typ: 'luecke',
    satz:    'Der Vertrag ___ bereits unterschrieben — wir können anfangen.',
    optionen: ['ist', 'wird', 'wurde', 'worden'],
    passiv:  'Der Vertrag ist bereits unterschrieben — wir können anfangen.',
    formel:  'ist + Partizip II',
    erklaerung: '"bereits ... — wir können anfangen" = mevcut durum anlatılıyor → Zustandspassiv: "ist".',
  },
  {
    id: 40, kategorie: 'Zustandspassiv', typ: 'luecke',
    satz:    'Die Straße ___ wegen Bauarbeiten gesperrt.',
    optionen: ['ist', 'wird', 'wurde', 'worden'],
    passiv:  'Die Straße ist wegen Bauarbeiten gesperrt.',
    formel:  'ist + Partizip II',
    erklaerung: 'Şu an devam eden durum → Zustandspassiv: "ist gesperrt". Eylem ne zaman oldu değil, şu an ne durumda.',
  },
  {
    id: 41, kategorie: 'Zustandspassiv', typ: 'luecke',
    satz:    'Die Fenster ___ gestern Abend von Unbekannten eingeschlagen. (eylem)',
    optionen: ['wurden', 'sind', 'wird', 'worden'],
    passiv:  'Die Fenster wurden gestern Abend von Unbekannten eingeschlagen.',
    formel:  'wurden + Partizip II (Vorgangspassiv)',
    erklaerung: '"gestern Abend" = geçmişte gerçekleşen eylem → Vorgangspassiv (Präteritum): "wurden". Zustandspassiv "sind" değil!',
  },
  {
    id: 42, kategorie: 'Zustandspassiv', typ: 'umformung',
    aktiv:  'Man hat das Projekt abgeschlossen. (Şu anki durum)',
    passiv: 'Das Projekt ist abgeschlossen.',
    formel: 'ist + Partizip II',
    erklaerung: 'Zustandspassiv: proje şu an tamamlanmış durumda. "abschließen" → abgeschlossen.',
  },

  // ── FUTUR / KONJUNKTIV II ──────────────────────────────────
  {
    id: 43, kategorie: 'Futur / Konjunktiv II', typ: 'umformung',
    aktiv:  'Man wird das Gesetz nächstes Jahr ändern.',
    passiv: 'Das Gesetz wird nächstes Jahr geändert werden.',
    formel: 'wird + Partizip II + werden',
    erklaerung: 'Futur I Passiv: iki "werden" var! İlki zaman yardımcısı (wird), ikincisi pasif infinitivi (werden). "geändert" arasında.',
  },
  {
    id: 44, kategorie: 'Futur / Konjunktiv II', typ: 'umformung',
    aktiv:  'Man wird die Preise im nächsten Jahr erhöhen.',
    passiv: 'Die Preise werden im nächsten Jahr erhöht werden.',
    formel: 'werden + Partizip II + werden',
    erklaerung: 'Çoğul → "werden". İki "werden": birincisi "werden" (Futur), ikincisi pasif infinitif.',
  },
  {
    id: 45, kategorie: 'Futur / Konjunktiv II', typ: 'luecke',
    satz:    'Das alte Gebäude wird bald abgerissen ___.',
    optionen: ['werden', 'worden', 'wurde', 'wird'],
    passiv:  'Das alte Gebäude wird bald abgerissen werden.',
    formel:  'wird + Partizip II + werden',
    erklaerung: 'Futur Passiv sona "werden" (infinitif) ister. "worden" değil — o Perfekt Passiv\'e ait.',
  },
  {
    id: 46, kategorie: 'Futur / Konjunktiv II', typ: 'umformung',
    aktiv:  'Man würde das Problem sofort lösen. (Konjunktiv II)',
    passiv: 'Das Problem würde sofort gelöst werden.',
    formel: 'würde + Partizip II + werden',
    erklaerung: 'Konjunktiv II Passiv: "würde" + Partizip II + "werden". Varsayımsal pasif — çok akademik.',
  },
  {
    id: 47, kategorie: 'Futur / Konjunktiv II', typ: 'umformung',
    aktiv:  'Man könnte mehr Geld in die Infrastruktur investieren. (Konjunktiv II)',
    passiv: 'Mehr Geld könnte in die Infrastruktur investiert werden.',
    formel: 'könnte + Partizip II + werden',
    erklaerung: '"könnte" Konjunktiv II. Çoğulsuz "mehr Geld" (Menge) → tekil "könnte". Sona "werden".',
  },
  {
    id: 48, kategorie: 'Futur / Konjunktiv II', typ: 'luecke',
    satz:    'Die Situation würde dadurch erheblich verbessert ___.',
    optionen: ['werden', 'worden', 'wurde', 'sein'],
    passiv:  'Die Situation würde dadurch erheblich verbessert werden.',
    formel:  'würde + Partizip II + werden',
    erklaerung: 'Konjunktiv II Passiv: "würde" + Partizip II + "werden". Sona "werden".',
  },

  // ── NEBENSATZ ──────────────────────────────────────────────
  {
    id: 49, kategorie: 'Nebensatz', typ: 'umformung',
    aktiv:  'Ich weiß, dass man das Problem lösen muss.',
    passiv: 'Ich weiß, dass das Problem gelöst werden muss.',
    formel: 'dass ... Partizip II + werden + Modalverb (Satzende)',
    erklaerung: 'Nebensatz\'ta fiil sona gider: "gelöst werden muss". Sıralama: Partizip II → werden (infinitif) → Modalverb.',
  },
  {
    id: 50, kategorie: 'Nebensatz', typ: 'umformung',
    aktiv:  'Er sagt, dass man die Regeln geändert hat.',
    passiv: 'Er sagt, dass die Regeln geändert worden sind.',
    formel: 'dass ... Partizip II + worden + sind (Satzende)',
    erklaerung: 'Nebensatz Perfekt Passiv: "geändert worden sind" — Partizip II önce, "worden" sonra, "sind" en sona.',
  },
  {
    id: 51, kategorie: 'Nebensatz', typ: 'luecke',
    satz:    'Es ist wichtig, dass die Umwelt konsequent geschützt ___.',
    optionen: ['wird', 'worden', 'werden', 'wurde'],
    passiv:  'Es ist wichtig, dass die Umwelt konsequent geschützt wird.',
    formel:  'dass ... Partizip II + wird (Satzende)',
    erklaerung: 'Nebensatz Präsens Passiv: "geschützt wird" — pasif yardımcı fiil en sona gider.',
  },
  {
    id: 52, kategorie: 'Nebensatz', typ: 'umformung',
    aktiv:  'Sie glaubt, dass man das Projekt abschließen kann.',
    passiv: 'Sie glaubt, dass das Projekt abgeschlossen werden kann.',
    formel: 'dass ... Partizip II + werden + kann (Satzende)',
    erklaerung: 'Modal + Passiv nebensatz: "abgeschlossen werden kann". Sıralama: Partizip II → werden → Modal.',
  },
  {
    id: 53, kategorie: 'Nebensatz', typ: 'luecke',
    satz:    'Es war bekannt, dass das Gebäude renoviert werden ___.',
    optionen: ['musste', 'worden', 'wurde', 'muss'],
    passiv:  'Es war bekannt, dass das Gebäude renoviert werden musste.',
    formel:  'dass ... Partizip II + werden + musste (Satzende)',
    erklaerung: 'Geçmiş zaman Nebensatz: "werden musste" — Modal geçmişte "musste". Sıra: Partizip II → werden → musste.',
  },
  {
    id: 54, kategorie: 'Nebensatz', typ: 'umformung',
    aktiv:  'Man weiß, dass die Experten das Ergebnis überprüft haben.',
    passiv: 'Man weiß, dass das Ergebnis von den Experten überprüft worden ist.',
    formel: 'dass ... Partizip II + worden + ist (Satzende)',
    erklaerung: 'Perfekt Passiv nebensatz: "überprüft worden ist" — Partizip II → worden → ist (en sona).',
  },
];

export const PASSIV_KATEGORIEN_LISTE = PASSIV_KATEGORIEN.map(k => ({
  ...k,
  count: PASSIV_DATA.filter(e => e.kategorie === k.name).length,
}));

export function shuffleExercises(arr: PassivExercise[]): PassivExercise[] {
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
