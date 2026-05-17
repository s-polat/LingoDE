export interface Redemittel {
  id: number;
  kategorie: string;
  situation: string;
  ausdrucke: string[];
  beispiel: string;
  hinweis: string;
  beispiele: string[];
}

export const REDEMITTEL_KATEGORIEN: { name: string; emoji: string }[] = [
  { name: 'Einleitung', emoji: '📝' },
  { name: 'Meinung äußern', emoji: '💬' },
  { name: 'Argumentieren — Pro', emoji: '⚡' },
  { name: 'Einschränkung / Kontra', emoji: '🔄' },
  { name: 'Beispiele nennen', emoji: '📌' },
  { name: 'Kausalität', emoji: '🔗' },
  { name: 'Gegenüberstellung', emoji: '⚖️' },
  { name: 'Textstrukturierung', emoji: '🗂️' },
  { name: 'Schluss / Fazit', emoji: '🎯' },
  { name: 'Bezug nehmen', emoji: '🔍' },
  { name: 'Formeller Brief', emoji: '✉️' },
];

export const REDEMITTEL_DATA: Redemittel[] = [
  // ── EINLEITUNG ─────────────────────────────────────────────
  {
    id: 1, kategorie: 'Einleitung', situation: 'Konuyu tanıtmak',
    ausdrucke: ['In diesem Text geht es um ...', 'Der vorliegende Text befasst sich mit ...', 'Thema dieses Textes ist ...'],
    beispiel: 'In diesem Text geht es um die Auswirkungen der Digitalisierung auf den Arbeitsmarkt.',
    hinweis: 'Üç ifade de birbirinin yerine geçer. "In diesem Text geht es um ..." en doğal; "Der vorliegende Text befasst sich mit ..." daha akademik. Hepsinden sonra konu (Nominativ veya um+Akkusativ) gelir.',
    beispiele: [
      'In diesem Text geht es um die Auswirkungen der Digitalisierung auf den Arbeitsmarkt.',
      'Der vorliegende Text befasst sich mit den Herausforderungen des modernen Bildungssystems.',
      'Thema dieses Textes ist die wachsende Ungleichheit in städtischen Gesellschaften.',
    ],
  },
  {
    id: 2, kategorie: 'Einleitung', situation: 'Konunun önemini vurgulamak',
    ausdrucke: ['Das Thema ... gewinnt zunehmend an Bedeutung.', '... spielt in der heutigen Gesellschaft eine immer größere Rolle.'],
    beispiel: 'Das Thema Nachhaltigkeit gewinnt in der heutigen Gesellschaft zunehmend an Bedeutung.',
    hinweis: '"gewinnt an Bedeutung" = önem kazanıyor. "spielt eine Rolle" = rol oynuyor. Her ikisinde de konu özne (Nominativ) olarak gelir. "zunehmend" = giderek artan şekilde.',
    beispiele: [
      'Das Thema Nachhaltigkeit gewinnt in der heutigen Gesellschaft zunehmend an Bedeutung.',
      'Psychische Gesundheit spielt in der modernen Arbeitswelt eine immer größere Rolle.',
      'Die Frage nach fairer Entlohnung gewinnt angesichts steigender Lebenshaltungskosten an Bedeutung.',
    ],
  },
  {
    id: 3, kategorie: 'Einleitung', situation: 'Güncel durumdan söze girmek',
    ausdrucke: ['In der heutigen Zeit ...', 'Angesichts der aktuellen Entwicklungen ...', 'Nicht erst seit ... wird ... diskutiert.'],
    beispiel: 'Angesichts der aktuellen Entwicklungen im Bereich der KI stellen sich viele ethische Fragen.',
    hinweis: '"Angesichts + Genitiv" = göz önünde bulundurulduğunda. "Nicht erst seit ..." = sadece son zamanlarda değil, daha uzun süredir. Cümleye dinamik bir giriş yaratır.',
    beispiele: [
      'Angesichts der aktuellen Entwicklungen im Bereich der KI stellen sich viele ethische Fragen.',
      'In der heutigen Zeit ist es kaum noch möglich, ohne digitale Geräte zu arbeiten.',
      'Nicht erst seit der Pandemie wird die Frage nach Homeoffice-Regelungen intensiv diskutiert.',
    ],
  },
  {
    id: 4, kategorie: 'Einleitung', situation: 'Tartışmalı bir konuyu sunmak',
    ausdrucke: ['Kaum ein Thema wird so kontrovers diskutiert wie ...', 'Die Frage, ob ..., ist seit Langem umstritten.'],
    beispiel: 'Kaum ein Thema wird so kontrovers diskutiert wie die Regulierung sozialer Medien.',
    hinweis: '"Kaum ein Thema ... wie + Nominativ" – güçlü bir giriş kalıbı. "Die Frage, ob ..." + Nebensatz ile tartışmalı bir soruyu sunar. Okuyucunun dikkatini hemen çeker.',
    beispiele: [
      'Kaum ein Thema wird so kontrovers diskutiert wie die Regulierung sozialer Medien.',
      'Die Frage, ob ein bedingungsloses Grundeinkommen sinnvoll ist, ist seit Langem umstritten.',
      'Kaum ein Bereich wird so heiß debattiert wie die Reform des deutschen Schulsystems.',
    ],
  },
  {
    id: 5, kategorie: 'Einleitung', situation: 'Ana tezi / iddiayı belirtmek',
    ausdrucke: ['In diesem Text möchte ich darlegen, dass ...', 'Im Folgenden werde ich zeigen, dass ...', 'Diese Abhandlung vertritt die These, dass ...'],
    beispiel: 'Im Folgenden werde ich zeigen, dass nachhaltige Wirtschaft nicht auf Wachstum verzichten muss.',
    hinweis: 'Hepsi "dass"-Satz ile biter. "Im Folgenden" = aşağıda/bundan sonra. "Diese Abhandlung vertritt die These" çok akademik, makale için uygundur. Giriş paragrafının en sonuna koy.',
    beispiele: [
      'Im Folgenden werde ich zeigen, dass nachhaltige Wirtschaft nicht auf Wachstum verzichten muss.',
      'In diesem Text möchte ich darlegen, dass frühkindliche Bildung der Schlüssel zur Chancengleichheit ist.',
      'Diese Abhandlung vertritt die These, dass Urbanisierung sowohl Chance als auch Herausforderung darstellt.',
    ],
  },

  // ── MEİNUNG ÄUSSERN ────────────────────────────────────────
  {
    id: 6, kategorie: 'Meinung äußern', situation: 'Görüşü güçlü biçimde ifade etmek',
    ausdrucke: ['Ich bin der festen Überzeugung, dass ...', 'Ich vertrete die Auffassung, dass ...', 'Es steht für mich außer Frage, dass ...'],
    beispiel: 'Ich bin der festen Überzeugung, dass frühkindliche Bildung der Schlüssel zur sozialen Gerechtigkeit ist.',
    hinweis: 'Hepsi "dass"-Satz ile kullanılır. "festen Überzeugung" en güçlü ifade. "Es steht außer Frage" = tartışma götürmez. Sınavda aşırı kullanmaktan kaçın — bir kez güçlü bir yerde kullan.',
    beispiele: [
      'Ich bin der festen Überzeugung, dass frühkindliche Bildung der Schlüssel zur sozialen Gerechtigkeit ist.',
      'Es steht für mich außer Frage, dass eine Reform des Gesundheitssystems dringend notwendig ist.',
      'Ich vertrete die Auffassung, dass globale Probleme nur durch internationale Zusammenarbeit lösbar sind.',
    ],
  },
  {
    id: 7, kategorie: 'Meinung äußern', situation: 'Görüşü ihtiyatlı biçimde ifade etmek',
    ausdrucke: ['Meiner Ansicht/Meinung nach ...', 'Meines Erachtens ...', 'Ich neige zu der Ansicht, dass ...'],
    beispiel: 'Meiner Ansicht nach bietet die Digitalisierung mehr Chancen als Risiken.',
    hinweis: '"Meiner Ansicht nach" + Hauptsatz (dass YOK!). "Meines Erachtens" kısaltması = m.E. Bunlar kibar, akademik görüş ifadeleridir; güçlü iddia değil, dengeli değerlendirme izlenimi verir.',
    beispiele: [
      'Meiner Ansicht nach bietet die Digitalisierung mehr Chancen als Risiken.',
      'Meines Erachtens sollte der Fokus auf präventive Gesundheitsmaßnahmen gelegt werden.',
      'Ich neige zu der Ansicht, dass strenge Regulierung langfristig mehr schadet als nützt.',
    ],
  },
  {
    id: 8, kategorie: 'Meinung äußern', situation: 'Bir görüşe katılmak',
    ausdrucke: ['Ich teile die Auffassung, dass ...', 'Dem stimme ich vollkommen zu.', 'Diese Position halte ich für berechtigt, weil ...'],
    beispiel: 'Ich teile die Auffassung, dass Unternehmen mehr Verantwortung für den Klimaschutz übernehmen sollten.',
    hinweis: '"Ich teile die Auffassung" = o görüşü paylaşıyorum. "Dem stimme ich zu" = Dativ (dem = o görüşe). Birisinin argümanına yanıt verirken kullanılır; ardından kendi gerekçeni ekle.',
    beispiele: [
      'Ich teile die Auffassung, dass Unternehmen mehr Verantwortung für den Klimaschutz übernehmen sollten.',
      'Diese Position halte ich für berechtigt, weil die Datenlage eindeutig ist.',
      'Dem stimme ich vollkommen zu, denn die Forschungsergebnisse unterstützen diese Einschätzung.',
    ],
  },
  {
    id: 9, kategorie: 'Meinung äußern', situation: 'Bir görüşe katılmamak',
    ausdrucke: ['Dieser Ansicht kann ich nicht zustimmen.', 'Ich halte diese Position für problematisch, weil ...', 'Dem muss ich widersprechen, denn ...'],
    beispiel: 'Dieser Ansicht kann ich nicht zustimmen, da sie wichtige soziale Aspekte außer Acht lässt.',
    hinweis: 'Sadece itiraz etmek nazik olmaz — mutlaka "weil/denn/da ..." ile gerekçe ekle. "Dem muss ich widersprechen" = buna itiraz etmem gerekiyor (Dativ yapısı: dem = o görüşe).',
    beispiele: [
      'Dieser Ansicht kann ich nicht zustimmen, da sie wichtige soziale Aspekte außer Acht lässt.',
      'Ich halte diese Position für problematisch, weil sie das Thema zu stark vereinfacht.',
      'Dem muss ich widersprechen, denn die historischen Belege zeigen ein anderes Bild.',
    ],
  },
  {
    id: 10, kategorie: 'Meinung äußern', situation: 'Yaygın bir kanıya atıfta bulunmak',
    ausdrucke: ['Viele sind der Meinung, dass ...', 'Weitverbreitet ist die Ansicht, dass ...', 'Es wird häufig argumentiert, dass ...'],
    beispiel: 'Weitverbreitet ist die Ansicht, dass technischer Fortschritt automatisch zu mehr Wohlstand führt.',
    hinweis: 'Kendi görüşünü değil, yaygın kanaati aktarırsın. Arkasından "Jedoch ..." ile kendi görüşünü ekleyebilirsin. "Es wird argumentiert" pasif yapısı belirsiz özne için akademik.',
    beispiele: [
      'Weitverbreitet ist die Ansicht, dass technischer Fortschritt automatisch zu mehr Wohlstand führt.',
      'Viele sind der Meinung, dass ein bedingungsloses Grundeinkommen die Armut reduzieren würde.',
      'Es wird häufig argumentiert, dass Globalisierung die Ungleichheit zwischen den Ländern verringert.',
    ],
  },
  {
    id: 11, kategorie: 'Meinung äußern', situation: 'Nüanslı / dengeli tutum almak',
    ausdrucke: ['Die Wahrheit liegt wohl irgendwo in der Mitte.', 'Man muss zwischen ... und ... differenzieren.', 'Eine differenzierte Betrachtung zeigt, dass ...'],
    beispiel: 'Eine differenzierte Betrachtung zeigt, dass weder vollständige Regulierung noch völlige Freiheit optimal ist.',
    hinweis: '"Man muss differenzieren" = ayrım yapmak gerekiyor. Akademik yazılarda tek taraflı olmaktan kaçınmak için ideal. "Die Wahrheit liegt in der Mitte" daha gündelik, diğerleri daha akademik.',
    beispiele: [
      'Eine differenzierte Betrachtung zeigt, dass weder vollständige Regulierung noch völlige Freiheit optimal ist.',
      'Man muss zwischen kurz- und langfristigen Auswirkungen dieser Maßnahmen differenzieren.',
      'Die Wahrheit liegt wohl irgendwo in der Mitte zwischen völliger Ablehnung und unkritischer Akzeptanz.',
    ],
  },

  // ── ARGUMENTİEREN — PRO ────────────────────────────────────
  {
    id: 12, kategorie: 'Argumentieren — Pro', situation: 'İlk argümanı sunmak',
    ausdrucke: ['Zunächst ist festzuhalten, dass ...', 'Ein wesentlicher Aspekt ist ...', 'Erstens lässt sich sagen, dass ...'],
    beispiel: 'Zunächst ist festzuhalten, dass erneuerbare Energien langfristig günstiger als fossile Brennstoffe sind.',
    hinweis: '"ist festzuhalten" = tespit edilmeli (pasif, akademik). "Ein wesentlicher Aspekt ist" + Nominativ ya da dass-Satz. Argüman sıralamasında ilkini bunlarla sun.',
    beispiele: [
      'Zunächst ist festzuhalten, dass erneuerbare Energien langfristig günstiger als fossile Brennstoffe sind.',
      'Ein wesentlicher Aspekt ist, dass Bildungsinvestitionen den höchsten gesellschaftlichen Return haben.',
      'Erstens lässt sich sagen, dass Prävention effektiver und günstiger als Behandlung ist.',
    ],
  },
  {
    id: 13, kategorie: 'Argumentieren — Pro', situation: 'Ek bir argüman eklemek',
    ausdrucke: ['Darüber hinaus ...', 'Hinzu kommt, dass ...', 'Ein weiteres Argument ist ...', 'Außerdem ...'],
    beispiel: 'Darüber hinaus schafft die Energiewende neue Arbeitsplätze in zukunftsfähigen Branchen.',
    hinweis: 'Bunlar bağlaçtır; cümle başına gelince fiil 2. pozisyona geçer. "Darüber hinaus" ve "Hinzu kommt, dass" en akademik olanlar. "Außerdem" daha gündelik.',
    beispiele: [
      'Darüber hinaus schafft die Energiewende neue Arbeitsplätze in zukunftsfähigen Branchen.',
      'Hinzu kommt, dass digitale Bildung die soziale Mobilität deutlich erhöhen kann.',
      'Ein weiteres Argument ist, dass öffentliche Verkehrsmittel den CO₂-Ausstoß erheblich reduzieren.',
    ],
  },
  {
    id: 14, kategorie: 'Argumentieren — Pro', situation: 'Argümanı güçlendirmek / desteklemek',
    ausdrucke: ['Dies zeigt sich besonders darin, dass ...', 'Besonders deutlich wird dies am Beispiel von ...', 'Nicht zuletzt ...'],
    beispiel: 'Dies zeigt sich besonders darin, dass Länder mit mehr erneuerbaren Energien geringere Emissionen aufweisen.',
    hinweis: '"zeigt sich darin, dass" = bu şurada görülür ki. "Besonders deutlich wird dies am Beispiel von + Dativ" = özellikle X örneğinde belirginleşir. "Nicht zuletzt" = son olarak değil ama önemli bir şey olarak.',
    beispiele: [
      'Dies zeigt sich besonders darin, dass Länder mit mehr erneuerbaren Energien geringere Emissionen aufweisen.',
      'Besonders deutlich wird dies am Beispiel von Finnland, das trotz Wohlstands niedrige Ungleichheit aufweist.',
      'Nicht zuletzt belegen steigende Teilnehmerzahlen, dass das Interesse an nachhaltigen Lebensstilen wächst.',
    ],
  },
  {
    id: 15, kategorie: 'Argumentieren — Pro', situation: 'Sonuç / etki vurgulamak',
    ausdrucke: ['Dies hätte zur Folge, dass ...', 'Langfristig würde dies bedeuten, dass ...', 'Die Auswirkungen wären erheblich: ...'],
    beispiel: 'Langfristig würde dies bedeuten, dass wir unabhängiger von Energieimporten werden.',
    hinweis: '"zur Folge haben" = sonucu olmak. "Langfristig würde ... bedeuten" = Konjunktiv II (varsayımsal). Gelecekteki olası etkileri tartışırken bu kalıpları kullan.',
    beispiele: [
      'Langfristig würde dies bedeuten, dass wir unabhängiger von Energieimporten werden.',
      'Dies hätte zur Folge, dass der Wohnungsmarkt erheblich entlastet werden könnte.',
      'Die Auswirkungen wären erheblich: Millionen Menschen könnten die Armutsgrenze überwinden.',
    ],
  },
  {
    id: 16, kategorie: 'Argumentieren — Pro', situation: 'Kanıta dayalı argüman sunmak',
    ausdrucke: ['Studien belegen, dass ...', 'Laut einer aktuellen Untersuchung ...', 'Forschungsergebnisse zeigen, dass ...'],
    beispiel: 'Studien belegen, dass bilingualer Unterricht die kognitiven Fähigkeiten signifikant verbessert.',
    hinweis: '"belegen" = kanıtlamak, ispat etmek. "Laut + Dativ" (laut einer Untersuchung) — virgül gelmez. Akademik yazılarda kaynak göstermek güvenilirliği artırır.',
    beispiele: [
      'Studien belegen, dass bilingualer Unterricht die kognitiven Fähigkeiten signifikant verbessert.',
      'Laut einer aktuellen Untersuchung sinkt die psychische Belastung mit mehr Aufenthalt in der Natur.',
      'Forschungsergebnisse zeigen, dass regelmäßige Bewegung das Risiko chronischer Krankheiten halbiert.',
    ],
  },

  // ── EİNSCHRÄNKUNG / KONTRA ────────────────────────────────
  {
    id: 17, kategorie: 'Einschränkung / Kontra', situation: 'Karşı argüman sunmak',
    ausdrucke: ['Andererseits muss man bedenken, dass ...', 'Dem steht jedoch entgegen, dass ...', 'Auf der anderen Seite ...'],
    beispiel: 'Andererseits muss man bedenken, dass ein zu schneller Wandel soziale Ungleichheiten verstärken kann.',
    hinweis: '"Andererseits" = öte yandan. "Dem steht entgegen" = buna karşın (Dativ: dem). Karşı argümanı sunarken kaba olmaktan kaçın — "jedoch/allerdings" ile yumuşat.',
    beispiele: [
      'Andererseits muss man bedenken, dass ein zu schneller Wandel soziale Ungleichheiten verstärken kann.',
      'Dem steht jedoch entgegen, dass viele Familien sich Bio-Produkte schlicht nicht leisten können.',
      'Auf der anderen Seite birgt zu starke Regulierung die Gefahr, Innovationen zu hemmen.',
    ],
  },
  {
    id: 18, kategorie: 'Einschränkung / Kontra', situation: 'Kısmen kabul edip itiraz etmek (zwar…aber)',
    ausdrucke: ['Zwar ..., aber ...', 'Auch wenn ..., so darf man nicht vergessen, dass ...', 'Einerseits ..., andererseits ...'],
    beispiel: 'Zwar bietet die Digitalisierung enorme Chancen, aber die Datenschutzrisiken sollten nicht unterschätzt werden.',
    hinweis: '"Zwar ... aber" = her iki cümlede de normal sözcük dizisi. "Einerseits ... andererseits" iki ayrı cümlede. Ön kabul + itiraz yapısı dengeli bir argüman izlenimi yaratır.',
    beispiele: [
      'Zwar bietet die Digitalisierung enorme Chancen, aber die Datenschutzrisiken sollten nicht unterschätzt werden.',
      'Auch wenn das Programm kostspielig ist, so darf man nicht vergessen, dass es langfristig Kosten spart.',
      'Einerseits schafft Tourismus Arbeitsplätze, andererseits belastet er die lokale Infrastruktur erheblich.',
    ],
  },
  {
    id: 19, kategorie: 'Einschränkung / Kontra', situation: 'Bir endişeyi / itirazı dile getirmek',
    ausdrucke: ['Bedenken bereitet mir ...', 'Problematisch erscheint mir ...', 'Kritisch zu betrachten ist ...'],
    beispiel: 'Kritisch zu betrachten ist die zunehmende Abhängigkeit von einzelnen Technologiekonzernen.',
    hinweis: '"Bedenken bereitet mir + Nominativ" = beni endişelendiren şu. "Problematisch erscheint mir" = bana sorunlu görünüyor. "Kritisch zu betrachten ist" daha nesnel ve akademik.',
    beispiele: [
      'Kritisch zu betrachten ist die zunehmende Abhängigkeit von einzelnen Technologiekonzernen.',
      'Bedenken bereitet mir der mangelnde Datenschutz bei der Nutzung sozialer Medien durch Kinder.',
      'Problematisch erscheint mir, dass die Kosten dieser Reform die ärmsten Haushalte am stärksten treffen.',
    ],
  },
  {
    id: 20, kategorie: 'Einschränkung / Kontra', situation: 'Argümanın sınırlılığını göstermek',
    ausdrucke: ['Dies gilt allerdings nur unter der Bedingung, dass ...', 'Dabei ist zu berücksichtigen, dass ...', 'Einschränkend muss jedoch gesagt werden, dass ...'],
    beispiel: 'Einschränkend muss jedoch gesagt werden, dass diese Lösung nur kurzfristig wirksam ist.',
    hinweis: '"Einschränkend muss gesagt werden" = pasif, akademik, çok etkili. "Dabei ist zu berücksichtigen" = dikkate alınmalı. Argümanını sınırlandırarak güvenilirliğini artırırsın.',
    beispiele: [
      'Einschränkend muss jedoch gesagt werden, dass diese Lösung nur kurzfristig wirksam ist.',
      'Dabei ist zu berücksichtigen, dass nicht alle Bevölkerungsgruppen gleichermaßen profitieren.',
      'Dies gilt allerdings nur unter der Bedingung, dass die nötigen Ressourcen bereitgestellt werden.',
    ],
  },
  {
    id: 21, kategorie: 'Einschränkung / Kontra', situation: 'Beklenmedik / paradoks bir duruma dikkat çekmek',
    ausdrucke: ['Paradoxerweise ...', 'Es mag überraschen, dass ...', 'Entgegen der allgemeinen Erwartung ...'],
    beispiel: 'Paradoxerweise führt mehr Auswahl nicht immer zu größerer Zufriedenheit.',
    hinweis: '"Paradoxerweise" cümle başına gelir, fiil hemen arkasından. Şaşırtıcı bir gerçeği sunmak için güçlü bir araç. Okuyucunun dikkatini çeker.',
    beispiele: [
      'Paradoxerweise führt mehr Auswahl nicht immer zu größerer Zufriedenheit.',
      'Es mag überraschen, dass ärmere Länder oft eine höhere Lebenszufriedenheit berichten.',
      'Entgegen der allgemeinen Erwartung sank die Kriminalitätsrate trotz wirtschaftlicher Krise.',
    ],
  },

  // ── BEİSPİELE NENNEN ──────────────────────────────────────
  {
    id: 22, kategorie: 'Beispiele nennen', situation: 'Örnek vermek',
    ausdrucke: ['Zum Beispiel ...', 'Als Beispiel lässt sich ... anführen.', 'Ein typisches Beispiel hierfür ist ...'],
    beispiel: 'Als Beispiel lässt sich der Erfolg skandinavischer Bildungssysteme anführen.',
    hinweis: '"Als Beispiel lässt sich ... anführen" en akademik. "Zum Beispiel" konuşmada da kullanılır. "Ein typisches Beispiel hierfür ist" + Nominativ. Örnekten sonra mutlaka neden örnek olduğunu açıkla.',
    beispiele: [
      'Als Beispiel lässt sich der Erfolg skandinavischer Bildungssysteme anführen.',
      'Ein typisches Beispiel hierfür ist der gut ausgebaute öffentliche Nahverkehr in Wien und Zürich.',
      'Zum Beispiel hat Japan trotz hoher Bevölkerungsdichte einen vergleichsweise niedrigen CO₂-Ausstoß pro Kopf.',
    ],
  },
  {
    id: 23, kategorie: 'Beispiele nennen', situation: 'Somut bir duruma atıfta bulunmak',
    ausdrucke: ['Konkret bedeutet das: ...', 'In der Praxis zeigt sich dies daran, dass ...', 'Am konkreten Fall von ... lässt sich erkennen, dass ...'],
    beispiel: 'In der Praxis zeigt sich dies daran, dass viele Unternehmen trotz guter Absichten am Greenwashing scheitern.',
    hinweis: '"Konkret bedeutet das: ..." iki nokta üst üste ile devam eder — somut bir rakam ya da durum ekle. "In der Praxis zeigt sich dies daran, dass" = pratikte bu şurada görülür.',
    beispiele: [
      'In der Praxis zeigt sich dies daran, dass viele Unternehmen trotz guter Absichten am Greenwashing scheitern.',
      'Konkret bedeutet das: Jedes dritte Kind in Deutschland wächst in relativer Armut auf.',
      'Am konkreten Fall von Deutschland lässt sich erkennen, dass ein Industrieland die Energiewende schaffen kann.',
    ],
  },
  {
    id: 24, kategorie: 'Beispiele nennen', situation: 'Kendi deneyiminden örnek vermek',
    ausdrucke: ['Ich selbst habe die Erfahrung gemacht, dass ...', 'Aus eigener Erfahrung kann ich berichten, dass ...'],
    beispiel: 'Aus eigener Erfahrung kann ich berichten, dass regelmäßiges Lesen den Wortschatz erheblich erweitert.',
    hinweis: 'Yazılı sınavlarda kişisel deneyim örnek olarak kullanılabilir — ama ikinci paragrafta, asla giriş cümlesi olarak değil. Ardından genel bir genelleme ekle.',
    beispiele: [
      'Aus eigener Erfahrung kann ich berichten, dass regelmäßiges Lesen den Wortschatz erheblich erweitert.',
      'Ich selbst habe die Erfahrung gemacht, dass Sport nicht nur körperlich, sondern auch mental entlastet.',
      'Aus eigener Erfahrung weiß ich, dass ein Auslandsaufenthalt den Horizont enorm erweitert.',
    ],
  },
  {
    id: 25, kategorie: 'Beispiele nennen', situation: 'İstatistik / sayısal veri sunmak',
    ausdrucke: ['Laut Statistik ...', 'Den Zahlen zufolge ...', 'Einer Studie zufolge ...'],
    beispiel: 'Laut Statistik verbringen Jugendliche im Durchschnitt über fünf Stunden täglich online.',
    hinweis: '"Laut + Dativ" — virgül gelmez, hemen cümle devam eder. "Den Zahlen zufolge" = sayılara göre. Rakam vermek argümanını güçlendirir; yaklaşık rakamlar da kullanılabilir.',
    beispiele: [
      'Laut Statistik verbringen Jugendliche im Durchschnitt über fünf Stunden täglich online.',
      'Den Zahlen zufolge ist die Armutsquote unter Rentnern in den letzten zehn Jahren gestiegen.',
      'Einer Studie zufolge verbessert sich die Lernleistung deutlich bei ausreichend Schlaf.',
    ],
  },
  {
    id: 26, kategorie: 'Beispiele nennen', situation: 'Bir kanıt göstermek',
    ausdrucke: ['Dies belegt die Tatsache, dass ...', 'Ein Beleg dafür ist ...', 'Das verdeutlicht ...'],
    beispiel: 'Dies belegt die Tatsache, dass Länder mit höherer Bildungsquote eine niedrigere Armutsrate aufweisen.',
    hinweis: '"Dies belegt die Tatsache, dass" = bu gerçeği kanıtlar. "Ein Beleg dafür ist" + Nominativ ya da dass-Satz. "Das verdeutlicht" + Akkusativ ya da dass-Satz.',
    beispiele: [
      'Dies belegt die Tatsache, dass Länder mit höherer Bildungsquote eine niedrigere Armutsrate aufweisen.',
      'Ein Beleg dafür ist, dass Städte mit gutem ÖPNV deutlich weniger Pkw-Nutzung verzeichnen.',
      'Das verdeutlicht, warum Investitionen in Prävention langfristig kostengünstiger sind.',
    ],
  },

  // ── KAUSALITÄT ────────────────────────────────────────────
  {
    id: 27, kategorie: 'Kausalität', situation: 'Neden / sebep göstermek',
    ausdrucke: ['Dies liegt daran, dass ...', 'Der Grund dafür ist ...', 'Ursache hierfür ist ...'],
    beispiel: 'Dies liegt daran, dass Investitionen in Bildung erst langfristig Wirkung zeigen.',
    hinweis: '"Dies liegt daran, dass" = bunun nedeni şu ki. "Der Grund dafür ist" + Nominativ ya da dass-Satz. "Ursache hierfür ist" + Nominativ — en akademik.',
    beispiele: [
      'Dies liegt daran, dass Investitionen in Bildung erst langfristig Wirkung zeigen.',
      'Der Grund dafür ist, dass viele Menschen sich keine gesunde Ernährung leisten können.',
      'Ursache hierfür ist der jahrzehntelange Rückgang öffentlicher Investitionen in die Infrastruktur.',
    ],
  },
  {
    id: 28, kategorie: 'Kausalität', situation: 'Sonuç belirtmek',
    ausdrucke: ['Infolgedessen ...', 'Daher / Deshalb ...', 'Dies führt dazu, dass ...', 'Folglich ...'],
    beispiel: 'Infolgedessen steigt die Nachfrage nach Fachkräften im IT-Bereich stetig an.',
    hinweis: '"Infolgedessen" ve "Folglich" cümle başına gelir, fiil 2. pozisyonda. "Dies führt dazu, dass" + Nebensatz. Bunlar sonuç bağlacıdır — neden-sonuç zinciri kurarken kullan.',
    beispiele: [
      'Infolgedessen steigt die Nachfrage nach Fachkräften im IT-Bereich stetig an.',
      'Folglich sind viele junge Menschen gezwungen, ihre Heimatregion zu verlassen.',
      'Dies führt dazu, dass immer mehr Menschen im Alter von Altersarmut betroffen sind.',
    ],
  },
  {
    id: 29, kategorie: 'Kausalität', situation: 'Amaç belirtmek',
    ausdrucke: ['Damit ... , muss ...', 'Mit dem Ziel, ... zu ...', 'Um ... zu erreichen, ...'],
    beispiel: 'Um eine nachhaltige Entwicklung zu erreichen, müssen Wirtschaft und Umweltschutz Hand in Hand gehen.',
    hinweis: '"Um ... zu + Infinitiv" — özne ana cümleyle aynı olmalı! "Damit ..." ise farklı özne için. "Mit dem Ziel, ... zu ..." daha akademik ve resmi.',
    beispiele: [
      'Um eine nachhaltige Entwicklung zu erreichen, müssen Wirtschaft und Umweltschutz Hand in Hand gehen.',
      'Mit dem Ziel, die Armutsquote zu senken, wurden neue Sozialprogramme entwickelt.',
      'Damit alle Schüler gleiche Chancen haben, muss das Bildungssystem grundlegend reformiert werden.',
    ],
  },
  {
    id: 30, kategorie: 'Kausalität', situation: 'Koşullu ilişki kurmak',
    ausdrucke: ['Unter der Voraussetzung, dass ...', 'Sofern ..., wäre es möglich, ...', 'Wenn ..., dann ...'],
    beispiel: 'Unter der Voraussetzung, dass ausreichend Mittel bereitgestellt werden, könnte das Projekt gelingen.',
    hinweis: '"Unter der Voraussetzung, dass" = şartıyla ki (akademik). "Sofern" = eğer (resmi yazı dili). Ardından genellikle Konjunktiv II (könnte, würde, wäre) gelir.',
    beispiele: [
      'Unter der Voraussetzung, dass ausreichend Mittel bereitgestellt werden, könnte das Projekt gelingen.',
      'Sofern die Politik konsequent handelt, wäre CO₂-Neutralität bis 2045 durchaus erreichbar.',
      'Wenn alle Beteiligten kooperieren, dann sind die gesteckten Ziele realistisch.',
    ],
  },
  {
    id: 31, kategorie: 'Kausalität', situation: 'Zincirleme sonuçlar belirtmek',
    ausdrucke: ['Dies wiederum hat zur Folge, dass ...', 'In der Konsequenz ...', 'Was letztendlich dazu führt, dass ...'],
    beispiel: 'Dies wiederum hat zur Folge, dass immer mehr Menschen in die Städte ziehen.',
    hinweis: '"wiederum" = ve bu da, sırasıyla. Domino etkisini anlatırken kullan. "In der Konsequenz" cümle başına gelir, fiil 2. pozisyonda. Zincirleme etkileri göstermek akademik metinlerde çok güçlüdür.',
    beispiele: [
      'Dies wiederum hat zur Folge, dass immer mehr Menschen in die Städte ziehen.',
      'In der Konsequenz steigt der Druck auf den Wohnungsmarkt und die städtische Infrastruktur.',
      'Was letztendlich dazu führt, dass strukturschwache Regionen weiter an Attraktivität verlieren.',
    ],
  },

  // ── GEGENÜBERSTELlUNG ────────────────────────────────────
  {
    id: 32, kategorie: 'Gegenüberstellung', situation: 'İki şeyi karşılaştırmak',
    ausdrucke: ['Im Vergleich zu ...', 'Im Gegensatz zu ...', 'Während ... , hingegen ...'],
    beispiel: 'Im Vergleich zu früheren Generationen haben heutige Jugendliche deutlich mehr Bildungsmöglichkeiten.',
    hinweis: '"Im Vergleich zu + Dativ" ve "Im Gegensatz zu + Dativ" — her ikisi de Dativ alır! "Während ... , hingegen ..." paralel yapı kurar ve iki zıt durumu aynı cümlede verir.',
    beispiele: [
      'Im Vergleich zu früheren Generationen haben heutige Jugendliche deutlich mehr Bildungsmöglichkeiten.',
      'Im Gegensatz zu Großstädten haben ländliche Regionen oft mit Abwanderung zu kämpfen.',
      'Während skandinavische Länder stark in Sozialpolitik investieren, setzt die USA hingegen auf individuelle Verantwortung.',
    ],
  },
  {
    id: 33, kategorie: 'Gegenüberstellung', situation: 'Zıtlık kurmak',
    ausdrucke: ['Im Gegensatz dazu ...', 'Dem gegenüber steht ...', 'Anders verhält es sich bei ...'],
    beispiel: 'Im Gegensatz dazu zeigen nordeuropäische Länder, dass hohe Steuern und Wachstum vereinbar sind.',
    hinweis: '"Im Gegensatz dazu" = buna karşın (önceden bahsedilen şeyle zıt). "Anders verhält es sich bei + Dativ" = X\'te durum farklı. Bir önceki cümleyle bağlantılı zıtlık kurar.',
    beispiele: [
      'Im Gegensatz dazu zeigen nordeuropäische Länder, dass hohe Steuern und Wachstum vereinbar sind.',
      'Dem gegenüber steht die Realität vieler Familien, die sich Bio-Produkte nicht leisten können.',
      'Anders verhält es sich bei Ländern mit starken Gewerkschaften, wo die Lohnungleichheit geringer ist.',
    ],
  },
  {
    id: 34, kategorie: 'Gegenüberstellung', situation: 'Benzerlik kurmak',
    ausdrucke: ['Ähnlich wie ...', 'Genauso wie ...', 'Entsprechend ...'],
    beispiel: 'Ähnlich wie beim Klimawandel erfordert auch die Digitalisierung internationale Zusammenarbeit.',
    hinweis: '"Ähnlich wie + Nominativ" ya da "Ähnlich wie bei + Dativ". "Genauso wie" hem kişilere hem durumlara uygulanır. Farklı alanlardaki paralel sorunları bağlamak için çok yararlı.',
    beispiele: [
      'Ähnlich wie beim Klimawandel erfordert auch die Digitalisierung internationale Zusammenarbeit.',
      'Genauso wie im Bildungsbereich sind auch im Gesundheitssystem strukturelle Reformen überfällig.',
      'Entsprechend der Entwicklungen in anderen Industrieländern zeichnet sich auch hier ein demografischer Wandel ab.',
    ],
  },
  {
    id: 35, kategorie: 'Gegenüberstellung', situation: 'Tercih / öncelik belirtmek',
    ausdrucke: ['... ist ... vorzuziehen.', '... bietet gegenüber ... den Vorteil, dass ...', 'Gegenüber ... erscheint ... vorteilhafter.'],
    beispiel: 'Präventionsmaßnahmen sind teuren Behandlungen im Gesundheitswesen vorzuziehen.',
    hinweis: '"A ist B vorzuziehen" = A, B\'ye tercih edilmeli (B Dativ alır!). "A bietet gegenüber B den Vorteil" yapısında B Dativ alır. Karşılaştırmalı öneri yaparken kullan.',
    beispiele: [
      'Präventionsmaßnahmen sind teuren Behandlungen im Gesundheitswesen vorzuziehen.',
      'Erneuerbare Energien bieten gegenüber fossilen Brennstoffen den Vorteil, dass sie keine CO₂ freisetzen.',
      'Gegenüber kurzfristigen Sparmaßnahmen erscheinen Investitionen in Bildung langfristig vorteilhafter.',
    ],
  },

  // ── TEXTSTRUKTURIERUNG ────────────────────────────────────
  {
    id: 36, kategorie: 'Textstrukturierung', situation: 'Başlamak / sıralamak',
    ausdrucke: ['Zunächst ...', 'Im Folgenden ...', 'Zu Beginn ...', 'Erstens ...'],
    beispiel: 'Zunächst möchte ich die wirtschaftlichen Aspekte des Themas beleuchten.',
    hinweis: 'Cümle başına gelince fiil 2. pozisyona geçer (Inversion). "Im Folgenden werde ich ..." = bundan sonra yapacaklarını duyurur. "Zunächst" en doğal; "Erstens" sıralama yaparken.',
    beispiele: [
      'Zunächst möchte ich die wirtschaftlichen Aspekte des Themas beleuchten.',
      'Im Folgenden werde ich drei Hauptargumente für diese Position vorstellen.',
      'Zu Beginn ist es wichtig, den Begriff Nachhaltigkeit klar zu definieren.',
    ],
  },
  {
    id: 37, kategorie: 'Textstrukturierung', situation: 'Yeni bir konuya geçiş yapmak',
    ausdrucke: ['Kommen wir nun zu ...', 'Nun zur Frage ...', 'Im Weiteren ...'],
    beispiel: 'Kommen wir nun zu den sozialen Konsequenzen dieser Entwicklung.',
    hinweis: '"Kommen wir nun zu + Dativ" = şimdi şuna geçelim. Hem yazıda hem konuşmada kullanılır. Önceki konuyu bitirip yenisine geçerken — bir köprü cümlesi gibi.',
    beispiele: [
      'Kommen wir nun zu den sozialen Konsequenzen dieser Entwicklung.',
      'Nun zur Frage, wie eine gerechte Verteilung von Ressourcen aussehen könnte.',
      'Im Weiteren soll untersucht werden, welche Rolle die Politik dabei spielen kann.',
    ],
  },
  {
    id: 38, kategorie: 'Textstrukturierung', situation: 'Ek bilgi eklemek',
    ausdrucke: ['Darüber hinaus ...', 'Des Weiteren ...', 'Außerdem ...', 'Zusätzlich ...'],
    beispiel: 'Des Weiteren ist zu berücksichtigen, dass kulturelle Unterschiede eine wichtige Rolle spielen.',
    hinweis: '"Des Weiteren" en akademik. "Außerdem" daha gündelik. Cümle başına gelince fiil 2. pozisyona geçer. Aynı bağlacı art arda iki kez kullanmaktan kaçın.',
    beispiele: [
      'Des Weiteren ist zu berücksichtigen, dass kulturelle Unterschiede eine wichtige Rolle spielen.',
      'Darüber hinaus zeigen neuere Studien, dass Stress die Immunabwehr erheblich schwächt.',
      'Zusätzlich muss bedacht werden, dass nicht alle Länder die gleichen Ausgangsbedingungen haben.',
    ],
  },
  {
    id: 39, kategorie: 'Textstrukturierung', situation: 'Önceki noktaya geri dönmek',
    ausdrucke: ['Wie bereits erwähnt ...', 'Wie oben dargelegt ...', 'Zurückkommend auf ...'],
    beispiel: 'Wie bereits erwähnt, ist die Finanzierung des Projekts noch nicht gesichert.',
    hinweis: '"Wie bereits erwähnt" + virgül + açıklama. Kendinizi tekrar etmeden kısa bir atıf yapmak için. Uzun bir yazıda kırmızı ip çeker. "Zurückkommend auf + Akkusativ" daha akademik.',
    beispiele: [
      'Wie bereits erwähnt, ist die Finanzierung des Projekts noch nicht gesichert.',
      'Wie oben dargelegt, hängen wirtschaftliche und ökologische Ziele eng zusammen.',
      'Zurückkommend auf das Eingangszitat lässt sich feststellen, dass seine Bedeutung heute noch größer ist.',
    ],
  },
  {
    id: 40, kategorie: 'Textstrukturierung', situation: 'Bir noktayı özellikle vurgulamak',
    ausdrucke: ['Besonders hervorzuheben ist ...', 'Es sei ausdrücklich darauf hingewiesen, dass ...', 'An dieser Stelle ist wichtig, dass ...'],
    beispiel: 'Besonders hervorzuheben ist, dass nachhaltige Lösungen nur durch internationale Kooperation möglich sind.',
    hinweis: '"Besonders hervorzuheben ist" = özellikle belirtilmeli. "Es sei darauf hingewiesen" = Konjunktiv I (sei) — çok akademik, bildiri/uyarı tonu. Okuyucunun dikkatini bir noktaya çekmek için.',
    beispiele: [
      'Besonders hervorzuheben ist, dass nachhaltige Lösungen nur durch internationale Kooperation möglich sind.',
      'Es sei ausdrücklich darauf hingewiesen, dass diese Maßnahmen die Grundrechte nicht einschränken dürfen.',
      'An dieser Stelle ist wichtig, dass Quantität nicht mit Qualität gleichgesetzt werden darf.',
    ],
  },
  {
    id: 41, kategorie: 'Textstrukturierung', situation: 'Ara özet sunmak',
    ausdrucke: ['Zusammenfassend lässt sich bisher festhalten, dass ...', 'Bis hierhin wurde deutlich, dass ...'],
    beispiel: 'Zusammenfassend lässt sich bisher festhalten, dass wirtschaftliche und ökologische Ziele vereinbar sind.',
    hinweis: '"bisher" kelimesi çok önemli — ara özet olduğunu gösterir, final sonuç değil. Uzun bir yazının ortasında okuyucunun yolunu kaybetmemesi için kullanılır.',
    beispiele: [
      'Zusammenfassend lässt sich bisher festhalten, dass wirtschaftliche und ökologische Ziele vereinbar sind.',
      'Bis hierhin wurde deutlich, dass alle drei Aspekte eng miteinander verknüpft sind.',
      'Zusammenfassend lässt sich bisher sagen, dass die Probleme bekannt, die Lösungen aber umstritten sind.',
    ],
  },

  // ── SCHLUSS / FAZİT ───────────────────────────────────────
  {
    id: 42, kategorie: 'Schluss / Fazit', situation: 'Sonucu özetlemek',
    ausdrucke: ['Zusammenfassend lässt sich sagen, dass ...', 'Abschließend lässt sich festhalten, dass ...', 'Resümierend kann man sagen, dass ...'],
    beispiel: 'Zusammenfassend lässt sich sagen, dass eine nachhaltige Zukunft nur durch das Zusammenwirken aller möglich ist.',
    hinweis: '"Zusammenfassend lässt sich sagen" en yaygın sonuç kalıbı. "Resümierend" = özetleyerek, çok akademik. "Abschließend" = son olarak. Hepsi "dass"-Satz ile biter.',
    beispiele: [
      'Zusammenfassend lässt sich sagen, dass eine nachhaltige Zukunft nur durch das Zusammenwirken aller möglich ist.',
      'Abschließend lässt sich festhalten, dass sowohl wirtschaftliche als auch soziale Aspekte berücksichtigt werden müssen.',
      'Resümierend kann man sagen, dass die Herausforderungen groß, aber lösbar sind.',
    ],
  },
  {
    id: 43, kategorie: 'Schluss / Fazit', situation: 'Kendi son görüşünü belirtmek',
    ausdrucke: ['Ich komme daher zu dem Schluss, dass ...', 'Mein Fazit lautet: ...', 'Alles in allem bin ich der Meinung, dass ...'],
    beispiel: 'Ich komme daher zu dem Schluss, dass mehr Investitionen in frühkindliche Bildung unerlässlich sind.',
    hinweis: '"Ich komme zu dem Schluss" = sonuca varıyorum. "Mein Fazit lautet: ..." iki nokta üst üste ile devam eder — net, özlü bir sonuç için. "Alles in allem" daha gündelik.',
    beispiele: [
      'Ich komme daher zu dem Schluss, dass mehr Investitionen in frühkindliche Bildung unerlässlich sind.',
      'Mein Fazit lautet: Ohne ein grundlegendes Umdenken in der Klimapolitik sind die Ziele nicht erreichbar.',
      'Alles in allem bin ich der Meinung, dass beide Positionen berechtigte Punkte enthalten.',
    ],
  },
  {
    id: 44, kategorie: 'Schluss / Fazit', situation: 'Bir çağrıda bulunmak / öneri yapmak',
    ausdrucke: ['Es ist daher dringend notwendig, dass ...', 'Die Gesellschaft ist aufgefordert, ...', 'Es bleibt zu hoffen, dass ...'],
    beispiel: 'Es ist daher dringend notwendig, dass Politik und Wirtschaft gemeinsam handeln.',
    hinweis: '"Es ist dringend notwendig" = acilen gerekli. "Die Gesellschaft ist aufgefordert + zu-Infinitiv" = toplum davet ediliyor. "Es bleibt zu hoffen" daha yumuşak, umut ifadesi.',
    beispiele: [
      'Es ist daher dringend notwendig, dass Politik und Wirtschaft gemeinsam handeln.',
      'Die Gesellschaft ist aufgefordert, mehr Verantwortung für kommende Generationen zu übernehmen.',
      'Es bleibt zu hoffen, dass die internationalen Verhandlungen zu konkreten Ergebnissen führen.',
    ],
  },
  {
    id: 45, kategorie: 'Schluss / Fazit', situation: 'Geleceğe bakmak',
    ausdrucke: ['Die Zukunft wird zeigen, ob ...', 'Es bleibt abzuwarten, wie ...', 'Langfristig gesehen ...'],
    beispiel: 'Die Zukunft wird zeigen, ob die getroffenen Maßnahmen ausreichend sind, um den Klimawandel zu begrenzen.',
    hinweis: '"Die Zukunft wird zeigen, ob ..." = gelecek gösterecek. "Es bleibt abzuwarten" = bekleyip görmek gerekiyor. Belirsizliği kabul eden kibar ve dengeli bir kapanış.',
    beispiele: [
      'Die Zukunft wird zeigen, ob die getroffenen Maßnahmen ausreichend sind, um den Klimawandel zu begrenzen.',
      'Es bleibt abzuwarten, wie sich die künstliche Intelligenz auf den Arbeitsmarkt auswirken wird.',
      'Langfristig gesehen wird Bildung der entscheidende Faktor für gesellschaftlichen Zusammenhalt sein.',
    ],
  },
  {
    id: 46, kategorie: 'Schluss / Fazit', situation: 'Dengeli / açık uçlu bir son yapmak',
    ausdrucke: ['Eine einfache Antwort gibt es nicht, aber ...', 'So eindeutig die Probleme auch sein mögen, so vielfältig sind die Lösungsansätze.'],
    beispiel: 'Eine einfache Antwort gibt es nicht, aber klar ist: ohne konsequentes Handeln wird sich nichts verändern.',
    hinweis: 'Kolay cevap olmadığını kabul eden realist bir kapanış. "So ... auch sein mögen, so ..." paralel yapı — şiirsel ve etkili. Dengeli bir yazı izlenimi bırakır.',
    beispiele: [
      'Eine einfache Antwort gibt es nicht, aber klar ist: ohne konsequentes Handeln wird sich nichts verändern.',
      'So eindeutig die Probleme auch sein mögen, so vielfältig sind die möglichen Lösungsansätze.',
      'Eine einfache Antwort gibt es nicht — doch eines ist sicher: Untätigkeit ist keine Option.',
    ],
  },

  // ── BEZUG NEHMEN ──────────────────────────────────────────
  {
    id: 47, kategorie: 'Bezug nehmen', situation: 'Bir metne / kaynağa atıfta bulunmak',
    ausdrucke: ['Wie im Text erwähnt wird ...', 'Laut dem Text ...', 'Der Autor weist darauf hin, dass ...'],
    beispiel: 'Wie im Text erwähnt wird, ist die Jugendarbeitslosigkeit in einigen Ländern auf über 30% gestiegen.',
    hinweis: '"Wie im Text erwähnt wird" + virgül + açıklama. "Laut dem Text" virgülsüz devam eder. "Der Autor weist darauf hin, dass" = yazar dikkat çekiyor. Grafik/metin yorumunda kullan.',
    beispiele: [
      'Wie im Text erwähnt wird, ist die Jugendarbeitslosigkeit in einigen Ländern auf über 30% gestiegen.',
      'Laut dem Text sind es vor allem strukturelle Faktoren, die die Ungleichheit aufrechterhalten.',
      'Der Autor weist darauf hin, dass einfache Lösungen für dieses komplexe Problem gefährlich sein können.',
    ],
  },
  {
    id: 48, kategorie: 'Bezug nehmen', situation: 'Bir görüşü dolaylı aktarmak',
    ausdrucke: ['Der Autor vertritt die These, dass ...', 'Laut ... sei ...', 'Experten zufolge ...'],
    beispiel: 'Der Autor vertritt die These, dass wirtschaftliches Wachstum und Nachhaltigkeit vereinbar seien.',
    hinweis: 'DİKKAT: Dolaylı anlatımda Konjunktiv I kullan! "seien" (sein), "habe" (haben), "könne" (können). "sei" yerine "ist" kullanmak akademik yazıda hata sayılır.',
    beispiele: [
      'Der Autor vertritt die These, dass wirtschaftliches Wachstum und Nachhaltigkeit vereinbar seien.',
      'Laut Experten sei die Lage dringender als bisher von der Politik angenommen.',
      'Experten zufolge liege die Ursache des Problems in strukturellen Ungleichheiten des Bildungssystems.',
    ],
  },
  {
    id: 49, kategorie: 'Bezug nehmen', situation: 'Bir araştırmaya / istatistiğe atıfta bulunmak',
    ausdrucke: ['Einer Studie zufolge ...', 'Laut einer aktuellen Umfrage ...', 'Den Ergebnissen der Forschung zufolge ...'],
    beispiel: 'Laut einer aktuellen Umfrage befürworten 68% der Deutschen eine strengere Klimapolitik.',
    hinweis: '"Laut + Dativ" — virgül gelmez. "Einer Studie zufolge" + Konjunktiv I kullanılabilir. Rakam verirken yaklaşık da olsa gerçekçi ol; sınavda uydurma veriler sorun yaratmaz ama abartı kötü izlenim bırakır.',
    beispiele: [
      'Laut einer aktuellen Umfrage befürworten 68% der Deutschen eine strengere Klimapolitik.',
      'Einer Studie zufolge sinkt die Lesekompetenz von Kindern im Zeitalter digitaler Medien.',
      'Den Ergebnissen der Forschung zufolge ist frühkindliche Förderung der wichtigste Faktor für Schulerfolg.',
    ],
  },
  {
    id: 50, kategorie: 'Bezug nehmen', situation: 'Grafiği / veriyi tanımlamak',
    ausdrucke: ['Die Grafik zeigt, dass ...', 'Aus der Darstellung geht hervor, dass ...', 'Auffällig ist, dass ...'],
    beispiel: 'Aus der Darstellung geht hervor, dass die Nutzung erneuerbarer Energien zwischen 2010 und 2023 stark gestiegen ist.',
    hinweis: '"Aus der Darstellung geht hervor" = gösterimden anlaşılıyor. "Auffällig ist, dass" = dikkat çekici olan şu ki. Grafik açıklarken mutlaka en belirgin eğilimi ve bir rakamı zikret.',
    beispiele: [
      'Aus der Darstellung geht hervor, dass die Nutzung erneuerbarer Energien zwischen 2010 und 2023 stark gestiegen ist.',
      'Die Grafik zeigt, dass der Anteil der Studierenden aus einkommensschwachen Familien konstant gering ist.',
      'Auffällig ist, dass trotz wirtschaftlichen Wachstums die Schere zwischen Arm und Reich größer wird.',
    ],
  },

  // ── FORMELLER BRIEF ───────────────────────────────────────
  {
    id: 51, kategorie: 'Formeller Brief', situation: 'Mektup açılışı — kişiyi biliyorsun',
    ausdrucke: ['Sehr geehrte Frau [Name],', 'Sehr geehrter Herr [Name],'],
    beispiel: 'Sehr geehrte Frau Müller,',
    hinweis: '"geehrte" kadın için, "geehrter" erkek için. Virgülle biter, bir satır boşluk bırakılır ve sonraki satır KÜÇÜK harfle başlar. İsim biliniyorsa mutlaka kullan — "Damen und Herren" den daha kişisel.',
    beispiele: [
      'Sehr geehrte Frau Müller,\nvielen Dank für Ihr Schreiben vom 10. Mai.',
      'Sehr geehrter Herr Schmidt,\nich wende mich an Sie bezüglich unserer Zusammenarbeit.',
      'Sehr geehrte Frau Dr. Weber,\nanbei übersende ich Ihnen meine vollständigen Unterlagen.',
    ],
  },
  {
    id: 52, kategorie: 'Formeller Brief', situation: 'Mektup açılışı — kişiyi bilmiyorsun',
    ausdrucke: ['Sehr geehrte Damen und Herren,'],
    beispiel: 'Sehr geehrte Damen und Herren,',
    hinweis: 'Tek kalıp, alternatif yok. Virgülle biter, sonraki satır küçük harfle başlar. Kurum veya şirkete yazarken — kişi adı bilinmiyorsa bu tek seçenek.',
    beispiele: [
      'Sehr geehrte Damen und Herren,\nich möchte mich hiermit für die ausgeschriebene Stelle bewerben.',
      'Sehr geehrte Damen und Herren,\nich wende mich an Sie mit einer dringenden Anfrage bezüglich meiner Bestellung.',
      'Sehr geehrte Damen und Herren,\nhiermit möchte ich meine Unzufriedenheit mit dem erhaltenen Service äußern.',
    ],
  },
  {
    id: 53, kategorie: 'Formeller Brief', situation: 'Yazma nedenini belirtmek',
    ausdrucke: ['Ich wende mich an Sie, um ...', 'Der Grund meines Schreibens ist ...', 'Mit diesem Brief möchte ich ...'],
    beispiel: 'Ich wende mich an Sie, um meine Bedenken bezüglich des geplanten Bauprojekts zu äußern.',
    hinweis: '"Ich wende mich an Sie, um + Infinitiv" — neden yazdığını ilk paragrafta belirt. "Der Grund meines Schreibens ist + Nominativ" daha resmi. Bu bilgi olmadan mektup eksik sayılır.',
    beispiele: [
      'Ich wende mich an Sie, um meine Bedenken bezüglich des geplanten Bauprojekts zu äußern.',
      'Der Grund meines Schreibens ist eine fehlerhafte Rechnung, die ich letzte Woche erhalten habe.',
      'Mit diesem Brief möchte ich mich für die ausgeschriebene Stelle als Projektmanagerin bewerben.',
    ],
  },
  {
    id: 54, kategorie: 'Formeller Brief', situation: 'Rica etmek / talep etmek',
    ausdrucke: ['Ich würde mich freuen, wenn Sie ...', 'Ich bitte Sie, ...', 'Könnten Sie bitte ...'],
    beispiel: 'Ich bitte Sie, mir bis zum 30. des Monats eine schriftliche Bestätigung zukommen zu lassen.',
    hinweis: '"Ich würde mich freuen, wenn Sie" + Konjunktiv II (könnten, würden) = kibar ve dolaylı rica. "Ich bitte Sie, + Infinitiv" = daha doğrudan ama hâlâ kibar. Rica ederken somut bir son tarih ver.',
    beispiele: [
      'Ich bitte Sie, mir bis zum 30. des Monats eine schriftliche Bestätigung zukommen zu lassen.',
      'Ich würde mich freuen, wenn Sie mir weitere Informationen zu Ihrem Angebot zusenden könnten.',
      'Könnten Sie bitte bis Ende der Woche eine Rückmeldung zu meiner Anfrage geben?',
    ],
  },
  {
    id: 55, kategorie: 'Formeller Brief', situation: 'Şikayette bulunmak',
    ausdrucke: ['Ich möchte mich über ... beschweren.', 'Leider muss ich Ihnen mitteilen, dass ...', 'Ich bin mit ... äußerst unzufrieden.'],
    beispiel: 'Leider muss ich Ihnen mitteilen, dass die bestellten Waren trotz mehrfacher Nachfrage noch nicht angekommen sind.',
    hinweis: '"Leider muss ich mitteilen" nazik ama ciddi açılış. Şikayette somut ol: ne, ne zaman, sipariş numarası. "äußerst unzufrieden" güçlü ifade, gerçekten kötü deneyim için sakla.',
    beispiele: [
      'Leider muss ich Ihnen mitteilen, dass die bestellten Waren trotz mehrfacher Nachfrage noch nicht angekommen sind.',
      'Ich möchte mich über die mangelhafte Qualität des am 5. Mai gelieferten Produkts beschweren.',
      'Ich bin mit der erhaltenen Dienstleistung äußerst unzufrieden und erwarte eine schnelle Lösung.',
    ],
  },
  {
    id: 56, kategorie: 'Formeller Brief', situation: 'Çözüm önermek',
    ausdrucke: ['Ich schlage vor, dass ...', 'Als Lösung bietet sich an, ...', 'Ich würde es begrüßen, wenn ...'],
    beispiel: 'Ich schlage vor, dass ein gemeinsames Treffen organisiert wird, um das Problem zu besprechen.',
    hinweis: '"Ich schlage vor, dass" + Konjunktiv I ya da Passiv. "Ich würde es begrüßen, wenn" + Konjunktiv II = kibar öneri. Çözüm önerirken yapıcı ve somut ol.',
    beispiele: [
      'Ich schlage vor, dass ein gemeinsames Treffen organisiert wird, um das Problem zu besprechen.',
      'Als Lösung bietet sich an, den Liefertermin auf Ende des Monats zu verschieben.',
      'Ich würde es begrüßen, wenn Sie mir eine Entschädigung für die entstandenen Unannehmlichkeiten anbieten würden.',
    ],
  },
  {
    id: 57, kategorie: 'Formeller Brief', situation: 'Mektup kapanışı',
    ausdrucke: ['Mit freundlichen Grüßen,', 'Hochachtungsvoll,', 'Mit freundlichen Grüßen und der Bitte um baldige Antwort,'],
    beispiel: 'Mit freundlichen Grüßen,',
    hinweis: '"Mit freundlichen Grüßen" standart kapanış — virgülsüz de yazılabilir! "Hochachtungsvoll" çok resmi, nadiren kullanılır. Ardından bir satır boşluk ve imza. Kapanışı unutma!',
    beispiele: [
      'Mit freundlichen Grüßen,\nSiddik Polat',
      'Hochachtungsvoll,\nSiddik Polat',
      'Mit freundlichen Grüßen und der Bitte um baldige Antwort,\nSiddik Polat',
    ],
  },
  {
    id: 58, kategorie: 'Formeller Brief', situation: 'Ek belgelere değinmek',
    ausdrucke: ['Anbei übersende ich Ihnen ...', 'In der Anlage finden Sie ...', 'Beiliegend erhalten Sie ...'],
    beispiel: 'Anbei übersende ich Ihnen meine Bewerbungsunterlagen sowie ein aktuelles Foto.',
    hinweis: '"Anbei" ve "beiliegend" ek ile birlikte gönderiyorsun anlamına gelir. "In der Anlage finden Sie" = ekte bulacaksınız. Mektup sonunda, kapanıştan önce kullanılır.',
    beispiele: [
      'Anbei übersende ich Ihnen meine Bewerbungsunterlagen sowie ein aktuelles Lichtbild.',
      'In der Anlage finden Sie alle relevanten Dokumente sowie eine Kopie meines Personalausweises.',
      'Beiliegend erhalten Sie den ausgefüllten Antrag und die erforderlichen Nachweise.',
    ],
  },
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
