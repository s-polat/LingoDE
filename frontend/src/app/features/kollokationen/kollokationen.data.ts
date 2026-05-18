export interface Kollokation {
  id: number;
  kategorie: string;
  satz: string;        // boşluk: ___
  optionen: [string, string, string, string]; // [0] = doğru
  erklaerung: string;
  kollokation: string; // tam ifade
}

export const KATEGORIEN = ['Alle', 'Politik & Gesellschaft', 'Arbeit & Wirtschaft', 'Bildung & Wissenschaft', 'Umwelt & Gesundheit', 'Allgemein C1'] as const;

export const KOLLOKATIONEN_DATA: Kollokation[] = [

  // ── Politik & Gesellschaft ──────────────────────────────────────
  { id: 1,  kategorie: 'Politik & Gesellschaft', kollokation: 'Maßnahmen ergreifen',
    satz: 'Die Regierung hat beschlossen, drastische Maßnahmen zu ___.',
    optionen: ['ergreifen', 'nehmen', 'machen', 'treffen'],
    erklaerung: '"Maßnahmen ergreifen" = kalıp ifade. "treffen" → Entscheidungen treffen; "nehmen" → Einfluss nehmen.' },

  { id: 2,  kategorie: 'Politik & Gesellschaft', kollokation: 'eine Entscheidung treffen',
    satz: 'Das Parlament hat nach langer Debatte eine wichtige Entscheidung ___.',
    optionen: ['getroffen', 'gemacht', 'genommen', 'ergriffen'],
    erklaerung: '"eine Entscheidung treffen" = karar almak. "machen" İngilizceden çeviri hatası; Almancada kullanılmaz.' },

  { id: 3,  kategorie: 'Politik & Gesellschaft', kollokation: 'Kritik üben',
    satz: 'Die Opposition ___ scharfe Kritik an dem neuen Gesetz.',
    optionen: ['übt', 'macht', 'nimmt', 'hat'],
    erklaerung: '"Kritik üben" = eleştiri yöneltmek. "Kritik machen" Almancada geçersizdir.' },

  { id: 4,  kategorie: 'Politik & Gesellschaft', kollokation: 'Kompromisse schließen',
    satz: 'Beide Parteien mussten ___ schließen, um das Gesetz durchzusetzen.',
    optionen: ['Kompromisse', 'Einigungen', 'Verträge', 'Abmachungen'],
    erklaerung: '"Kompromisse schließen" = uzlaşı sağlamak. "Verträge schließen" de doğru ama bu bağlamda "Kompromisse" gerekir.' },

  { id: 5,  kategorie: 'Politik & Gesellschaft', kollokation: 'Rücksicht nehmen',
    satz: 'Der Politiker hat ___ auf die Bedenken der Bevölkerung genommen.',
    optionen: ['Rücksicht', 'Einfluss', 'Bezug', 'Acht'],
    erklaerung: '"Rücksicht nehmen auf" = dikkate almak. "Acht nehmen" = dikkatli olmak (farklı anlam).' },

  { id: 6,  kategorie: 'Politik & Gesellschaft', kollokation: 'Einfluss nehmen',
    satz: 'Bürger können durch Petitionen ___ auf politische Entscheidungen nehmen.',
    optionen: ['Einfluss', 'Anteil', 'Bezug', 'Rücksicht'],
    erklaerung: '"Einfluss nehmen auf" = etki etmek. "Einfluss haben" = (süregelen) etkisi olmak — anlam farkı var.' },

  { id: 7,  kategorie: 'Politik & Gesellschaft', kollokation: 'Rechenschaft ablegen',
    satz: 'Er musste ___ für seine Handlungen ablegen.',
    optionen: ['Rechenschaft', 'Verantwortung', 'Auskunft', 'Bericht'],
    erklaerung: '"Rechenschaft ablegen" = hesap vermek. "Auskunft geben" = bilgi vermek (farklı eylem).' },

  { id: 8,  kategorie: 'Politik & Gesellschaft', kollokation: 'auf Widerstand stoßen',
    satz: 'Der neue Sparplan stieß in der Bevölkerung auf heftigen ___.',
    optionen: ['Widerstand', 'Widerspruch', 'Einwand', 'Protest'],
    erklaerung: '"auf Widerstand stoßen" = dirençle karşılaşmak. "stoßen" bu bağlamda kalıp fiil; "Widerstand" değişmez.' },

  { id: 9,  kategorie: 'Politik & Gesellschaft', kollokation: 'Konsequenzen ziehen',
    satz: 'Die Ministerin zog aus dem Skandal politische ___.',
    optionen: ['Konsequenzen', 'Schlüsse', 'Folgen', 'Lehren'],
    erklaerung: '"Konsequenzen ziehen" = sonuçlarını çıkarmak / gereğini yapmak. "Schlüsse ziehen" = fikir çıkarmak (farklı).' },

  { id: 10, kategorie: 'Politik & Gesellschaft', kollokation: 'in der Pflicht stehen',
    satz: 'Die Gesellschaft ___ in der Pflicht, benachteiligte Gruppen zu unterstützen.',
    optionen: ['steht', 'ist', 'liegt', 'befindet sich'],
    erklaerung: '"in der Pflicht stehen" = yükümlülük sahibi olmak. Kalıp ifade; "steht" değişmez.' },

  { id: 11, kategorie: 'Politik & Gesellschaft', kollokation: 'eine Debatte führen',
    satz: 'Über dieses Thema wurde eine intensive öffentliche Debatte ___.',
    optionen: ['geführt', 'gemacht', 'gehalten', 'veranstaltet'],
    erklaerung: '"eine Debatte führen" = tartışma yürütmek. "halten" → Rede halten (konuşma yapmak) farklı bağlam.' },

  { id: 12, kategorie: 'Politik & Gesellschaft', kollokation: 'unter Druck stehen',
    satz: 'Die Regierung ___ unter erheblichem Druck, schnell zu handeln.',
    optionen: ['stand', 'war', 'befand sich', 'lag'],
    erklaerung: '"unter Druck stehen" = baskı altında olmak. "befand sich" de olası ama "stand" standart kalıp.' },

  // ── Arbeit & Wirtschaft ─────────────────────────────────────────
  { id: 13, kategorie: 'Arbeit & Wirtschaft', kollokation: 'Gewinne erzielen',
    satz: 'Das Unternehmen hat trotz der Krise erhebliche Gewinne ___.',
    optionen: ['erzielt', 'gemacht', 'bekommen', 'erreicht'],
    erklaerung: '"Gewinne erzielen" = kâr elde etmek. "machen" günlük dil; "erzielen" yazılı C1 düzeyinde standart.' },

  { id: 14, kategorie: 'Arbeit & Wirtschaft', kollokation: 'Einbußen hinnehmen',
    satz: 'Die Firma musste aufgrund der Krise erhebliche finanzielle Einbußen ___.',
    optionen: ['hinnehmen', 'erleiden', 'machen', 'akzeptieren'],
    erklaerung: '"Einbußen hinnehmen" = kayıpları kabullenmek. "erleiden" de doğru ama "hinnehmen" isteksiz kabullenmek vurgusunu taşır.' },

  { id: 15, kategorie: 'Arbeit & Wirtschaft', kollokation: 'Kosten senken',
    satz: 'Um wettbewerbsfähig zu bleiben, musste das Unternehmen die Kosten deutlich ___.',
    optionen: ['senken', 'reduzieren', 'verringern', 'minimieren'],
    erklaerung: '"Kosten senken" = en yaygın kollokasyon. Diğerleri dilbilgisi açısından doğru ama "senken" standart iş dili ifadesi.' },

  { id: 16, kategorie: 'Arbeit & Wirtschaft', kollokation: 'einen Vertrag abschließen',
    satz: 'Nach langen Verhandlungen haben beide Seiten einen Vertrag ___.',
    optionen: ['abgeschlossen', 'gemacht', 'getroffen', 'vereinbart'],
    erklaerung: '"einen Vertrag abschließen" = sözleşme akdetmek/imzalamak. "treffen" → Abkommen/Vereinbarungen treffen.' },

  { id: 17, kategorie: 'Arbeit & Wirtschaft', kollokation: 'Anforderungen erfüllen',
    satz: 'Die Bewerber müssen alle fachlichen Anforderungen der Stelle ___.',
    optionen: ['erfüllen', 'erreichen', 'leisten', 'erbringen'],
    erklaerung: '"Anforderungen erfüllen" = gereksinimleri karşılamak. "leisten" → Arbeit leisten; "erbringen" → Leistungen erbringen.' },

  { id: 18, kategorie: 'Arbeit & Wirtschaft', kollokation: 'Fortschritte erzielen',
    satz: 'Das Startup hat in kurzer Zeit beachtliche Fortschritte ___.',
    optionen: ['erzielt', 'gemacht', 'erreicht', 'erlangt'],
    erklaerung: '"Fortschritte erzielen" = ilerleme kaydetmek. "machen" günlük dil; "erzielen" yazılı metinde tercih edilir.' },

  { id: 19, kategorie: 'Arbeit & Wirtschaft', kollokation: 'einen Beitrag leisten',
    satz: 'Der neue Leiter hat einen wichtigen Beitrag zur Unternehmensentwicklung ___.',
    optionen: ['geleistet', 'gemacht', 'gegeben', 'erbracht'],
    erklaerung: '"einen Beitrag leisten" = katkıda bulunmak. "geben" → "ein Beispiel geben" farklı kalıp.' },

  { id: 20, kategorie: 'Arbeit & Wirtschaft', kollokation: 'eine Lösung finden',
    satz: 'Nach zähen Verhandlungen wurde schließlich eine einvernehmliche Lösung ___.',
    optionen: ['gefunden', 'erreicht', 'getroffen', 'geschlossen'],
    erklaerung: '"eine Lösung finden" = çözüm bulmak. "treffen" → Entscheidung/Abkommen treffen.' },

  { id: 21, kategorie: 'Arbeit & Wirtschaft', kollokation: 'eine Rolle spielen',
    satz: 'Im internationalen Wettbewerb ___ Deutschland eine führende Rolle.',
    optionen: ['spielt', 'nimmt', 'hat', 'übernimmt'],
    erklaerung: '"eine Rolle spielen" = rol oynamak. "hat eine Rolle" Almancada kullanılmaz.' },

  { id: 22, kategorie: 'Arbeit & Wirtschaft', kollokation: 'ein Risiko eingehen',
    satz: 'Der Investor ___ mit dieser Entscheidung ein erhebliches finanzielles Risiko ein.',
    optionen: ['geht', 'nimmt', 'macht', 'wagt'],
    erklaerung: '"ein Risiko eingehen" = risk almak. Ayrılabilir fiil: "geht ... ein". "wagen" ayrı fiil olarak kullanılır.' },

  { id: 23, kategorie: 'Arbeit & Wirtschaft', kollokation: 'in Anspruch nehmen',
    satz: 'Das Unternehmen ___ staatliche Fördergelder in Anspruch.',
    optionen: ['nimmt', 'braucht', 'fordert', 'nutzt'],
    erklaerung: '"in Anspruch nehmen" = yararlanmak, talep etmek. Sabit kalıp; "nimmt" değişmez.' },

  { id: 24, kategorie: 'Arbeit & Wirtschaft', kollokation: 'in Kauf nehmen',
    satz: 'Die Investoren haben die finanziellen Risiken bewusst in ___ genommen.',
    optionen: ['Kauf', 'Acht', 'Betracht', 'Anspruch'],
    erklaerung: '"in Kauf nehmen" = göze almak, kabullenmek. "in Acht nehmen" = dikkat etmek; "in Betracht ziehen" = hesaba katmak.' },

  // ── Bildung & Wissenschaft ──────────────────────────────────────
  { id: 25, kategorie: 'Bildung & Wissenschaft', kollokation: 'Erkenntnisse gewinnen',
    satz: 'Die Forscherin hat durch ihre Experimente bahnbrechende Erkenntnisse ___.',
    optionen: ['gewonnen', 'gefunden', 'erzielt', 'erhalten'],
    erklaerung: '"Erkenntnisse gewinnen" = bilgi/bulgu elde etmek. "erzielen" → Ergebnisse erzielen (farklı kollokasyon).' },

  { id: 26, kategorie: 'Bildung & Wissenschaft', kollokation: 'Schlussfolgerungen ziehen',
    satz: 'Aus den vorliegenden Daten lassen sich wichtige Schlussfolgerungen ___.',
    optionen: ['ziehen', 'machen', 'ableiten', 'nehmen'],
    erklaerung: '"Schlussfolgerungen ziehen" = sonuç çıkarmak. "ableiten" de doğru ama "ziehen" standart kalıp kollokasyonu.' },

  { id: 27, kategorie: 'Bildung & Wissenschaft', kollokation: 'eine Hypothese aufstellen',
    satz: 'Die Wissenschaftlerin hat auf Basis ihrer Beobachtungen eine neue Hypothese ___.',
    optionen: ['aufgestellt', 'gemacht', 'vorgeschlagen', 'entwickelt'],
    erklaerung: '"eine Hypothese aufstellen" = hipotez ortaya atmak. "entwickeln" → Konzept/Modell entwickeln.' },

  { id: 28, kategorie: 'Bildung & Wissenschaft', kollokation: 'eine Studie durchführen',
    satz: 'Das Forschungsteam hat eine umfangreiche Längsschnittstudie ___.',
    optionen: ['durchgeführt', 'gemacht', 'erledigt', 'vollzogen'],
    erklaerung: '"eine Studie durchführen" = çalışma yürütmek. "vollziehen" resmi/hukuki işlemler için; "erledigen" günlük görevler için.' },

  { id: 29, kategorie: 'Bildung & Wissenschaft', kollokation: 'Wissen vermitteln',
    satz: 'Der Professor hat das komplexe Thema klar und verständlich ___.',
    optionen: ['vermittelt', 'erklärt', 'übertragen', 'gelehrt'],
    erklaerung: '"Wissen vermitteln" = bilgi aktarmak. "erklären" = açıklamak (genel anlam); "vermitteln" pedagojik bağlamda tercih edilir.' },

  { id: 30, kategorie: 'Bildung & Wissenschaft', kollokation: 'Kenntnisse vertiefen',
    satz: 'Die Studentin hat ihre linguistischen Kenntnisse durch das Auslandssemester ___.',
    optionen: ['vertieft', 'erweitert', 'verbessert', 'ausgebaut'],
    erklaerung: '"Kenntnisse vertiefen" = bilgiyi derinleştirmek. "erweitern" = genişletmek (farklı yön). "vertiefen" = aynı alanda ilerleme.' },

  { id: 31, kategorie: 'Bildung & Wissenschaft', kollokation: 'einen Fehler begehen',
    satz: 'Der Forscher hat bei der Veröffentlichung einen schwerwiegenden Fehler ___.',
    optionen: ['begangen', 'gemacht', 'getan', 'verursacht'],
    erklaerung: '"einen Fehler begehen" = (ağır) hata yapmak. "machen" günlük dil; "begehen" yazılı/resmi bağlamda standart.' },

  { id: 32, kategorie: 'Bildung & Wissenschaft', kollokation: 'zur Verfügung stellen',
    satz: 'Die Universität ___ erhebliche finanzielle Mittel für das Projekt zur Verfügung.',
    optionen: ['stellt', 'gibt', 'bietet', 'liefert'],
    erklaerung: '"zur Verfügung stellen" = sağlamak, sunmak. Sabit kalıp; "stellt ... zur Verfügung" bölünemez.' },

  { id: 33, kategorie: 'Bildung & Wissenschaft', kollokation: 'eine Rolle spielen',
    satz: 'Dieses Phänomen ___ in der aktuellen Forschungsdebatte eine zentrale Rolle.',
    optionen: ['spielt', 'hat', 'nimmt', 'übernimmt'],
    erklaerung: '"eine Rolle spielen" = rol oynamak. "hat eine Rolle" Almancada kullanılmaz.' },

  { id: 34, kategorie: 'Bildung & Wissenschaft', kollokation: 'Erkenntnisse vorlegen',
    satz: 'Die Forscher haben ihre neuen Erkenntnisse der wissenschaftlichen Gemeinschaft ___.',
    optionen: ['vorgelegt', 'präsentiert', 'gezeigt', 'vorgestellt'],
    erklaerung: '"Erkenntnisse vorlegen" = bulguları sunmak/ibraz etmek. Akademik bağlamda "vorlegen" resmi ve standart.' },

  { id: 35, kategorie: 'Bildung & Wissenschaft', kollokation: 'beitragen zu',
    satz: 'Die Wissenschaft kann maßgeblich dazu ___, gesellschaftliche Probleme zu lösen.',
    optionen: ['beitragen', 'helfen', 'leisten', 'fördern'],
    erklaerung: '"beitragen zu + Dativ" = katkıda bulunmak. "dazu beitragen, etw. zu tun" sabit yapı.' },

  { id: 36, kategorie: 'Bildung & Wissenschaft', kollokation: 'Forschung betreiben',
    satz: 'Die Forschungsgruppe ___ intensiv Grundlagenforschung auf dem Gebiet der KI.',
    optionen: ['betreibt', 'macht', 'führt', 'treibt'],
    erklaerung: '"Forschung betreiben" = araştırma yürütmek/sürdürmek. "führen" → ein Gespräch führen; "betreiben" sistematik faaliyet.' },

  // ── Umwelt & Gesundheit ─────────────────────────────────────────
  { id: 37, kategorie: 'Umwelt & Gesundheit', kollokation: 'Schaden anrichten',
    satz: 'Die Industrieabfälle haben erheblichen Schaden an der Umwelt ___.',
    optionen: ['angerichtet', 'verursacht', 'zugefügt', 'gemacht'],
    erklaerung: '"Schaden anrichten" = zarar vermek/tahribat oluşturmak. "verursachen" de doğru ama "anrichten" kasıtsız, büyük çaplı hasar için özeldir.' },

  { id: 38, kategorie: 'Umwelt & Gesundheit', kollokation: 'Auswirkungen haben',
    satz: 'Der Klimawandel ___ weitreichende Auswirkungen auf die Artenvielfalt.',
    optionen: ['hat', 'nimmt', 'zeigt', 'bringt'],
    erklaerung: '"Auswirkungen haben auf" = etkileri olmak. "hat ... Auswirkungen" kalıp ifade. "zeigen" → "Wirkung zeigen" farklı.' },

  { id: 39, kategorie: 'Umwelt & Gesundheit', kollokation: 'einen Beitrag leisten',
    satz: 'Jeder Einzelne kann einen wichtigen Beitrag zum Umweltschutz ___.',
    optionen: ['leisten', 'machen', 'geben', 'tun'],
    erklaerung: '"einen Beitrag leisten" = katkıda bulunmak. "machen/geben/tun" bu bağlamda Almancada kullanılmaz.' },

  { id: 40, kategorie: 'Umwelt & Gesundheit', kollokation: 'in Kauf nehmen',
    satz: 'Bei der Energiewende müssen gewisse wirtschaftliche Einbußen in ___ genommen werden.',
    optionen: ['Kauf', 'Acht', 'Betracht', 'Anspruch'],
    erklaerung: '"in Kauf nehmen" = göze almak, katlanmak. "in Acht nehmen" = dikkat etmek; "in Betracht ziehen" = hesaba katmak.' },

  { id: 41, kategorie: 'Umwelt & Gesundheit', kollokation: 'einen Rückgang verzeichnen',
    satz: 'Wissenschaftler ___ weltweit einen alarmierenden Rückgang der Artenvielfalt.',
    optionen: ['verzeichnen', 'beobachten', 'messen', 'registrieren'],
    erklaerung: '"einen Rückgang verzeichnen" = bir düşüş kaydetmek. Bilimsel/istatistiksel bağlamda "verzeichnen" standart.' },

  { id: 42, kategorie: 'Umwelt & Gesundheit', kollokation: 'Anstrengungen unternehmen',
    satz: 'Um den Klimawandel einzudämmen, müssen alle Staaten gemeinsam Anstrengungen ___.',
    optionen: ['unternehmen', 'machen', 'leisten', 'aufwenden'],
    erklaerung: '"Anstrengungen unternehmen" = çaba göstermek, gayret etmek. "unternehmen" burada kalıp fiil.' },

  { id: 43, kategorie: 'Umwelt & Gesundheit', kollokation: 'in Betracht ziehen',
    satz: 'Diese Risiken muss man bei der Planung unbedingt ___ Betracht ziehen.',
    optionen: ['in', 'außer', 'unter', 'aus'],
    erklaerung: '"in Betracht ziehen" = göz önünde bulundurmak. "außer Betracht lassen" = göz ardı etmek (farklı fiil).' },

  { id: 44, kategorie: 'Umwelt & Gesundheit', kollokation: 'beitragen zu',
    satz: 'Gesunde Ernährung ___ maßgeblich zur Vorbeugung chronischer Erkrankungen bei.',
    optionen: ['trägt', 'hilft', 'leistet', 'bringt'],
    erklaerung: '"beitragen zu + Dativ" = katkıda bulunmak. "trägt ... bei" ayrılabilir fiil yapısı.' },

  { id: 45, kategorie: 'Umwelt & Gesundheit', kollokation: 'Ziele verfolgen',
    satz: 'Die Umweltschutzorganisation ___ klare Ziele im Kampf gegen den Klimawandel.',
    optionen: ['verfolgt', 'hat', 'setzt', 'erreicht'],
    erklaerung: '"Ziele verfolgen" = hedeflere ulaşmaya çalışmak. "setzen" → "Ziele setzen" = hedef koymak (farklı anlam).' },

  { id: 46, kategorie: 'Umwelt & Gesundheit', kollokation: 'auf etwas verzichten',
    satz: 'Der Arzt empfiehlt seinen Patienten, auf Nikotin und Alkohol zu ___.',
    optionen: ['verzichten', 'vermeiden', 'aufgeben', 'ablassen'],
    erklaerung: '"auf etw. verzichten" = feragat etmek. "vermeiden" yapıyı değiştirir ("etw. vermeiden"). "verzichten auf" sabit edat.' },

  { id: 47, kategorie: 'Umwelt & Gesundheit', kollokation: 'Vorkehrungen treffen',
    satz: 'Die Gesundheitsbehörde hat rechtzeitig Vorkehrungen gegen die Ausbreitung ___.',
    optionen: ['getroffen', 'gemacht', 'ergriffen', 'genommen'],
    erklaerung: '"Vorkehrungen treffen" = önlem almak. "ergreifen" → "Maßnahmen ergreifen" farklı kollokasyon.' },

  { id: 48, kategorie: 'Umwelt & Gesundheit', kollokation: 'Folgen bewältigen',
    satz: 'Die Folgen des Klimawandels sind ohne internationale Zusammenarbeit kaum zu ___.',
    optionen: ['bewältigen', 'lösen', 'beherrschen', 'meistern'],
    erklaerung: '"Folgen bewältigen" = sonuçlarla başa çıkmak. "meistern" olumlu anlam taşır; "bewältigen" zorlu durumlar için standart.' },

  // ── Allgemein C1 ────────────────────────────────────────────────
  { id: 49, kategorie: 'Allgemein C1', kollokation: 'auf den Punkt bringen',
    satz: 'Der Redner hat die Kernaussage präzise auf den Punkt ___.',
    optionen: ['gebracht', 'gestellt', 'gesetzt', 'gelegt'],
    erklaerung: '"auf den Punkt bringen" = öz bir şekilde ifade etmek. Sabit kalıp ifade; "gebracht" değişmez.' },

  { id: 50, kategorie: 'Allgemein C1', kollokation: 'in Betracht ziehen',
    satz: 'Für eine fundierte Entscheidung muss man alle Alternativen ___ Betracht ziehen.',
    optionen: ['in', 'außer', 'unter', 'aus'],
    erklaerung: '"in Betracht ziehen" = göz önünde bulundurmak, hesaba katmak.' },

  { id: 51, kategorie: 'Allgemein C1', kollokation: 'Einwände erheben',
    satz: 'Der Abgeordnete ___ keine Einwände gegen den Gesetzesentwurf.',
    optionen: ['erhob', 'machte', 'hatte', 'äußerte'],
    erklaerung: '"Einwände erheben" = itiraz etmek. "äußern" de olası ama "erheben" resmi bağlamda standart.' },

  { id: 52, kategorie: 'Allgemein C1', kollokation: 'zur Verfügung stellen',
    satz: 'Das Unternehmen stellt alle nötigen Ressourcen zur ___.',
    optionen: ['Verfügung', 'Nutzung', 'Verwendung', 'Ausleihe'],
    erklaerung: '"zur Verfügung stellen" = sağlamak, sunmak. "Verfügung" değişmez; diğerleri bu kalıpla kullanılmaz.' },

  { id: 53, kategorie: 'Allgemein C1', kollokation: 'auf etwas beruhen',
    satz: 'Diese Argumentation ___ auf einer falschen Grundannahme.',
    optionen: ['beruht', 'liegt', 'baut', 'steht'],
    erklaerung: '"auf etw. beruhen" = ... dayanmak. "beruht auf" sabit fiil-edat ilişkisi.' },

  { id: 54, kategorie: 'Allgemein C1', kollokation: 'an Bedeutung gewinnen',
    satz: 'Digitale Kompetenzen ___ in der modernen Arbeitswelt zunehmend an Bedeutung.',
    optionen: ['gewinnen', 'nehmen', 'steigen', 'wachsen'],
    erklaerung: '"an Bedeutung gewinnen" = önem kazanmak. "gewinnen an Bedeutung" sabit kalıp. "zunehmen" → "nimmt zu" ayrı yapı.' },

  { id: 55, kategorie: 'Allgemein C1', kollokation: 'zustande kommen',
    satz: 'Nach langem Streit ___ der Kompromiss endlich zustande.',
    optionen: ['kam', 'wurde', 'ist', 'hat'],
    erklaerung: '"zustande kommen" = gerçekleşmek. "kam ... zustande" ayrılabilir fiil; "wurde" Passiv gerektirir.' },

  { id: 56, kategorie: 'Allgemein C1', kollokation: 'zusammenfassen',
    satz: 'Der Bericht ___ die wichtigsten Ergebnisse der Studie zusammen.',
    optionen: ['fasst', 'bringt', 'stellt', 'gibt'],
    erklaerung: '"zusammenfassen" = özetlemek. Ayrılabilir fiil: "fasst ... zusammen".' },

  { id: 57, kategorie: 'Allgemein C1', kollokation: 'Verantwortung übernehmen',
    satz: 'Jeder muss Verantwortung für die Konsequenzen seines Handelns ___.',
    optionen: ['übernehmen', 'tragen', 'nehmen', 'leisten'],
    erklaerung: '"Verantwortung übernehmen" = sorumluluk üstlenmek (aktif). "tragen" = (var olan sorumluluğu) taşımak.' },

  { id: 58, kategorie: 'Allgemein C1', kollokation: 'mit sich bringen',
    satz: 'Diese Entwicklung ___ erhebliche Risiken für die Stabilität mit sich.',
    optionen: ['bringt', 'hat', 'trägt', 'macht'],
    erklaerung: '"mit sich bringen" = beraberinde getirmek, gerektirmek. Sabit kalıp; "bringt ... mit sich".' },

  { id: 59, kategorie: 'Allgemein C1', kollokation: 'in Frage stellen',
    satz: 'Dieses Ergebnis ___ die bisherige Theorie grundlegend in Frage.',
    optionen: ['stellt', 'bringt', 'setzt', 'legt'],
    erklaerung: '"in Frage stellen" = sorgulamak. Ayrılabilir fiil: "stellt ... in Frage". "in Frage bringen" Almancada yoktur.' },

  { id: 60, kategorie: 'Allgemein C1', kollokation: 'zum Ausdruck bringen',
    satz: 'Mit diesem Kunstwerk ___ der Künstler sein Unbehagen deutlich zum Ausdruck.',
    optionen: ['bringt', 'stellt', 'setzt', 'legt'],
    erklaerung: '"zum Ausdruck bringen" = dile getirmek, ifade etmek. Sabit kalıp; "bringt ... zum Ausdruck".' },
];

export function shuffleOptions(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
