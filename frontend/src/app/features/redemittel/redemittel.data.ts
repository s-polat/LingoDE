export interface Redemittel {
  id: number;
  kategorie: string;
  situation: string;
  ausdrucke: string[];
  beispiel: string;
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
  { id: 1, kategorie: 'Einleitung', situation: 'Konuyu tanıtmak', ausdrucke: ['In diesem Text geht es um ...', 'Der vorliegende Text befasst sich mit ...', 'Thema dieses Textes ist ...'], beispiel: 'In diesem Text geht es um die Auswirkungen der Digitalisierung auf den Arbeitsmarkt.' },
  { id: 2, kategorie: 'Einleitung', situation: 'Konunun önemini vurgulamak', ausdrucke: ['Das Thema ... gewinnt zunehmend an Bedeutung.', '... spielt in der heutigen Gesellschaft eine immer größere Rolle.'], beispiel: 'Das Thema Nachhaltigkeit gewinnt in der heutigen Gesellschaft zunehmend an Bedeutung.' },
  { id: 3, kategorie: 'Einleitung', situation: 'Güncel durumdan söze girmek', ausdrucke: ['In der heutigen Zeit ...', 'Angesichts der aktuellen Entwicklungen ...', 'Nicht erst seit ... wird ... diskutiert.'], beispiel: 'Angesichts der aktuellen Entwicklungen im Bereich der KI stellen sich viele ethische Fragen.' },
  { id: 4, kategorie: 'Einleitung', situation: 'Tartışmalı bir konuyu sunmak', ausdrucke: ['Kaum ein Thema wird so kontrovers diskutiert wie ...', 'Die Frage, ob ..., ist seit Langem umstritten.'], beispiel: 'Kaum ein Thema wird so kontrovers diskutiert wie die Regulierung sozialer Medien.' },
  { id: 5, kategorie: 'Einleitung', situation: 'Ana tezi / iddiayı belirtmek', ausdrucke: ['In diesem Text möchte ich darlegen, dass ...', 'Im Folgenden werde ich zeigen, dass ...', 'Diese Abhandlung vertritt die These, dass ...'], beispiel: 'Im Folgenden werde ich zeigen, dass nachhaltige Wirtschaft nicht auf Wachstum verzichten muss.' },

  // ── MEİNUNG ÄUSSERN ────────────────────────────────────────
  { id: 6, kategorie: 'Meinung äußern', situation: 'Görüşü güçlü biçimde ifade etmek', ausdrucke: ['Ich bin der festen Überzeugung, dass ...', 'Ich vertrete die Auffassung, dass ...', 'Es steht für mich außer Frage, dass ...'], beispiel: 'Ich bin der festen Überzeugung, dass frühkindliche Bildung der Schlüssel zur sozialen Gerechtigkeit ist.' },
  { id: 7, kategorie: 'Meinung äußern', situation: 'Görüşü ihtiyatlı biçimde ifade etmek', ausdrucke: ['Meiner Ansicht/Meinung nach ...', 'Meines Erachtens ...', 'Ich neige zu der Ansicht, dass ...'], beispiel: 'Meiner Ansicht nach bietet die Digitalisierung mehr Chancen als Risiken.' },
  { id: 8, kategorie: 'Meinung äußern', situation: 'Bir görüşe katılmak', ausdrucke: ['Ich teile die Auffassung, dass ...', 'Dem stimme ich vollkommen zu.', 'Diese Position halte ich für berechtigt, weil ...'], beispiel: 'Ich teile die Auffassung, dass Unternehmen mehr Verantwortung für den Klimaschutz übernehmen sollten.' },
  { id: 9, kategorie: 'Meinung äußern', situation: 'Bir görüşe katılmamak', ausdrucke: ['Dieser Ansicht kann ich nicht zustimmen.', 'Ich halte diese Position für problematisch, weil ...', 'Dem muss ich widersprechen, denn ...'], beispiel: 'Dieser Ansicht kann ich nicht zustimmen, da sie wichtige soziale Aspekte außer Acht lässt.' },
  { id: 10, kategorie: 'Meinung äußern', situation: 'Yaygın bir kanıya atıfta bulunmak', ausdrucke: ['Viele sind der Meinung, dass ...', 'Weitverbreitet ist die Ansicht, dass ...', 'Es wird häufig argumentiert, dass ...'], beispiel: 'Weitverbreitet ist die Ansicht, dass technischer Fortschritt automatisch zu mehr Wohlstand führt.' },
  { id: 11, kategorie: 'Meinung äußern', situation: 'Nüanslı / dengeli tutum almak', ausdrucke: ['Die Wahrheit liegt wohl irgendwo in der Mitte.', 'Man muss zwischen ... und ... differenzieren.', 'Eine differenzierte Betrachtung zeigt, dass ...'], beispiel: 'Eine differenzierte Betrachtung zeigt, dass weder vollständige Regulierung noch völlige Freiheit optimal ist.' },

  // ── ARGUMENTİEREN — PRO ────────────────────────────────────
  { id: 12, kategorie: 'Argumentieren — Pro', situation: 'İlk argümanı sunmak', ausdrucke: ['Zunächst ist festzuhalten, dass ...', 'Ein wesentlicher Aspekt ist ...', 'Erstens lässt sich sagen, dass ...'], beispiel: 'Zunächst ist festzuhalten, dass erneuerbare Energien langfristig günstiger als fossile Brennstoffe sind.' },
  { id: 13, kategorie: 'Argumentieren — Pro', situation: 'Ek bir argüman eklemek', ausdrucke: ['Darüber hinaus ...', 'Hinzu kommt, dass ...', 'Ein weiteres Argument ist ...', 'Außerdem ...'], beispiel: 'Darüber hinaus schafft die Energiewende neue Arbeitsplätze in zukunftsfähigen Branchen.' },
  { id: 14, kategorie: 'Argumentieren — Pro', situation: 'Argümanı güçlendirmek / desteklemek', ausdrucke: ['Dies zeigt sich besonders darin, dass ...', 'Besonders deutlich wird dies am Beispiel von ...', 'Nicht zuletzt ...'], beispiel: 'Dies zeigt sich besonders darin, dass Länder mit mehr erneuerbaren Energien geringere Emissionen aufweisen.' },
  { id: 15, kategorie: 'Argumentieren — Pro', situation: 'Sonuç / etki vurgulamak', ausdrucke: ['Dies hätte zur Folge, dass ...', 'Langfristig würde dies bedeuten, dass ...', 'Die Auswirkungen wären erheblich: ...'], beispiel: 'Langfristig würde dies bedeuten, dass wir unabhängiger von Energieimporten werden.' },
  { id: 16, kategorie: 'Argumentieren — Pro', situation: 'Kanıta dayalı argüman sunmak', ausdrucke: ['Studien belegen, dass ...', 'Laut einer aktuellen Untersuchung ...', 'Forschungsergebnisse zeigen, dass ...'], beispiel: 'Studien belegen, dass bilingualer Unterricht die kognitiven Fähigkeiten signifikant verbessert.' },

  // ── EİNSCHRÄNKUNG / KONTRA ────────────────────────────────
  { id: 17, kategorie: 'Einschränkung / Kontra', situation: 'Karşı argüman sunmak', ausdrucke: ['Andererseits muss man bedenken, dass ...', 'Dem steht jedoch entgegen, dass ...', 'Auf der anderen Seite ...'], beispiel: 'Andererseits muss man bedenken, dass ein zu schneller Wandel soziale Ungleichheiten verstärken kann.' },
  { id: 18, kategorie: 'Einschränkung / Kontra', situation: 'Kısmen kabul edip itiraz etmek (zwar...aber)', ausdrucke: ['Zwar ..., aber ...', 'Auch wenn ..., so darf man nicht vergessen, dass ...', 'Einerseits ..., andererseits ...'], beispiel: 'Zwar bietet die Digitalisierung enorme Chancen, aber die Datenschutzrisiken sollten nicht unterschätzt werden.' },
  { id: 19, kategorie: 'Einschränkung / Kontra', situation: 'Bir endişeyi / itirazı dile getirmek', ausdrucke: ['Bedenken bereitet mir ...', 'Problematisch erscheint mir ...', 'Kritisch zu betrachten ist ...'], beispiel: 'Kritisch zu betrachten ist die zunehmende Abhängigkeit von einzelnen Technologiekonzernen.' },
  { id: 20, kategorie: 'Einschränkung / Kontra', situation: 'Argümanın sınırlılığını göstermek', ausdrucke: ['Dies gilt allerdings nur unter der Bedingung, dass ...', 'Dabei ist zu berücksichtigen, dass ...', 'Einschränkend muss jedoch gesagt werden, dass ...'], beispiel: 'Einschränkend muss jedoch gesagt werden, dass diese Lösung nur kurzfristig wirksam ist.' },
  { id: 21, kategorie: 'Einschränkung / Kontra', situation: 'Beklenmedik / paradoks bir duruma dikkat çekmek', ausdrucke: ['Paradoxerweise ...', 'Es mag überraschen, dass ...', 'Entgegen der allgemeinen Erwartung ...'], beispiel: 'Paradoxerweise führt mehr Auswahl nicht immer zu größerer Zufriedenheit.' },

  // ── BEİSPİELE NENNEN ──────────────────────────────────────
  { id: 22, kategorie: 'Beispiele nennen', situation: 'Örnek vermek', ausdrucke: ['Zum Beispiel ...', 'Als Beispiel lässt sich ... anführen.', 'Ein typisches Beispiel hierfür ist ...'], beispiel: 'Als Beispiel lässt sich der Erfolg skandinavischer Bildungssysteme anführen.' },
  { id: 23, kategorie: 'Beispiele nennen', situation: 'Somut bir duruma atıfta bulunmak', ausdrucke: ['Konkret bedeutet das: ...', 'In der Praxis zeigt sich dies daran, dass ...', 'Am konkreten Fall von ... lässt sich erkennen, dass ...'], beispiel: 'In der Praxis zeigt sich dies daran, dass viele Unternehmen trotz guter Absichten am Greenwashing scheitern.' },
  { id: 24, kategorie: 'Beispiele nennen', situation: 'Kendi deneyiminden örnek vermek', ausdrucke: ['Ich selbst habe die Erfahrung gemacht, dass ...', 'Aus eigener Erfahrung kann ich berichten, dass ...'], beispiel: 'Aus eigener Erfahrung kann ich berichten, dass regelmäßiges Lesen den Wortschatz erheblich erweitert.' },
  { id: 25, kategorie: 'Beispiele nennen', situation: 'İstatistik / sayısal veri sunmak', ausdrucke: ['Laut Statistik ...', 'Den Zahlen zufolge ...', 'Einer Studie zufolge ...'], beispiel: 'Laut Statistik verbringen Jugendliche im Durchschnitt über fünf Stunden täglich online.' },
  { id: 26, kategorie: 'Beispiele nennen', situation: 'Bir kanıt göstermek', ausdrucke: ['Dies belegt die Tatsache, dass ...', 'Ein Beleg dafür ist ...', 'Das verdeutlicht ...'], beispiel: 'Dies belegt die Tatsache, dass Länder mit höherer Bildungsquote eine niedrigere Armutsrate aufweisen.' },

  // ── KAUSALITÄT ────────────────────────────────────────────
  { id: 27, kategorie: 'Kausalität', situation: 'Neden / sebep göstermek', ausdrucke: ['Dies liegt daran, dass ...', 'Der Grund dafür ist ...', 'Ursache hierfür ist ...'], beispiel: 'Dies liegt daran, dass Investitionen in Bildung erst langfristig Wirkung zeigen.' },
  { id: 28, kategorie: 'Kausalität', situation: 'Sonuç belirtmek', ausdrucke: ['Infolgedessen ...', 'Daher / Deshalb ...', 'Dies führt dazu, dass ...', 'Folglich ...'], beispiel: 'Infolgedessen steigt die Nachfrage nach Fachkräften im IT-Bereich stetig an.' },
  { id: 29, kategorie: 'Kausalität', situation: 'Amaç belirtmek', ausdrucke: ['Damit ... , muss ...', 'Mit dem Ziel, ... zu ...', 'Um ... zu erreichen, ...'], beispiel: 'Um eine nachhaltige Entwicklung zu erreichen, müssen Wirtschaft und Umweltschutz Hand in Hand gehen.' },
  { id: 30, kategorie: 'Kausalität', situation: 'Koşullu ilişki kurmak', ausdrucke: ['Unter der Voraussetzung, dass ...', 'Sofern ..., wäre es möglich, ...', 'Wenn ..., dann ...'], beispiel: 'Unter der Voraussetzung, dass ausreichend Mittel bereitgestellt werden, könnte das Projekt gelingen.' },
  { id: 31, kategorie: 'Kausalität', situation: 'Zincirleme sonuçlar belirtmek', ausdrucke: ['Dies wiederum hat zur Folge, dass ...', 'In der Konsequenz ...', 'Was letztendlich dazu führt, dass ...'], beispiel: 'Dies wiederum hat zur Folge, dass immer mehr Menschen in die Städte ziehen.' },

  // ── GEGENÜBERSTELlUNG ────────────────────────────────────
  { id: 32, kategorie: 'Gegenüberstellung', situation: 'İki şeyi karşılaştırmak', ausdrucke: ['Im Vergleich zu ...', 'Im Gegensatz zu ...', 'Während ... , hingegen ...'], beispiel: 'Im Vergleich zu früheren Generationen haben heutige Jugendliche deutlich mehr Bildungsmöglichkeiten.' },
  { id: 33, kategorie: 'Gegenüberstellung', situation: 'Zıtlık kurmak', ausdrucke: ['Im Gegensatz dazu ...', 'Dem gegenüber steht ...', 'Anders verhält es sich bei ...'], beispiel: 'Im Gegensatz dazu zeigen nordeuropäische Länder, dass hohe Steuern und Wachstum vereinbar sind.' },
  { id: 34, kategorie: 'Gegenüberstellung', situation: 'Benzerlik kurmak', ausdrucke: ['Ähnlich wie ...', 'Genauso wie ...', 'Entsprechend ...'], beispiel: 'Ähnlich wie beim Klimawandel erfordert auch die Digitalisierung internationale Zusammenarbeit.' },
  { id: 35, kategorie: 'Gegenüberstellung', situation: 'Tercih / öncelik belirtmek', ausdrucke: ['... ist ... vorzuziehen.', '... bietet gegenüber ... den Vorteil, dass ...', 'Gegenüber ... erscheint ... vorteilhafter.'], beispiel: 'Präventionsmaßnahmen sind teuren Behandlungen im Gesundheitswesen vorzuziehen.' },

  // ── TEXTSTRUKTURIERUNG ────────────────────────────────────
  { id: 36, kategorie: 'Textstrukturierung', situation: 'Başlamak / sıralamak', ausdrucke: ['Zunächst ...', 'Im Folgenden ...', 'Zu Beginn ...', 'Erstens ...'], beispiel: 'Zunächst möchte ich die wirtschaftlichen Aspekte des Themas beleuchten.' },
  { id: 37, kategorie: 'Textstrukturierung', situation: 'Yeni bir konuya geçiş yapmak', ausdrucke: ['Kommen wir nun zu ...', 'Nun zur Frage ...', 'Im Weiteren ...'], beispiel: 'Kommen wir nun zu den sozialen Konsequenzen dieser Entwicklung.' },
  { id: 38, kategorie: 'Textstrukturierung', situation: 'Ek bilgi eklemek', ausdrucke: ['Darüber hinaus ...', 'Des Weiteren ...', 'Außerdem ...', 'Zusätzlich ...'], beispiel: 'Des Weiteren ist zu berücksichtigen, dass kulturelle Unterschiede eine wichtige Rolle spielen.' },
  { id: 39, kategorie: 'Textstrukturierung', situation: 'Önceki noktaya geri dönmek', ausdrucke: ['Wie bereits erwähnt ...', 'Wie oben dargelegt ...', 'Zurückkommend auf ...'], beispiel: 'Wie bereits erwähnt, ist die Finanzierung des Projekts noch nicht gesichert.' },
  { id: 40, kategorie: 'Textstrukturierung', situation: 'Bir noktayı özellikle vurgulamak', ausdrucke: ['Besonders hervorzuheben ist ...', 'Es sei ausdrücklich darauf hingewiesen, dass ...', 'An dieser Stelle ist wichtig, dass ...'], beispiel: 'Besonders hervorzuheben ist, dass nachhaltige Lösungen nur durch internationale Kooperation möglich sind.' },
  { id: 41, kategorie: 'Textstrukturierung', situation: 'Ara özet sunmak', ausdrucke: ['Zusammenfassend lässt sich bisher festhalten, dass ...', 'Bis hierhin wurde deutlich, dass ...'], beispiel: 'Zusammenfassend lässt sich bisher festhalten, dass wirtschaftliche und ökologische Ziele vereinbar sind.' },

  // ── SCHLUSS / FAZİT ───────────────────────────────────────
  { id: 42, kategorie: 'Schluss / Fazit', situation: 'Sonucu özetlemek', ausdrucke: ['Zusammenfassend lässt sich sagen, dass ...', 'Abschließend lässt sich festhalten, dass ...', 'Resümierend kann man sagen, dass ...'], beispiel: 'Zusammenfassend lässt sich sagen, dass eine nachhaltige Zukunft nur durch das Zusammenwirken aller möglich ist.' },
  { id: 43, kategorie: 'Schluss / Fazit', situation: 'Kendi son görüşünü belirtmek', ausdrucke: ['Ich komme daher zu dem Schluss, dass ...', 'Mein Fazit lautet: ...', 'Alles in allem bin ich der Meinung, dass ...'], beispiel: 'Ich komme daher zu dem Schluss, dass mehr Investitionen in frühkindliche Bildung unerlässlich sind.' },
  { id: 44, kategorie: 'Schluss / Fazit', situation: 'Bir çağrıda bulunmak / öneri yapmak', ausdrucke: ['Es ist daher dringend notwendig, dass ...', 'Die Gesellschaft ist aufgefordert, ...', 'Es bleibt zu hoffen, dass ...'], beispiel: 'Es ist daher dringend notwendig, dass Politik und Wirtschaft gemeinsam handeln.' },
  { id: 45, kategorie: 'Schluss / Fazit', situation: 'Geleceğe bakmak', ausdrucke: ['Die Zukunft wird zeigen, ob ...', 'Es bleibt abzuwarten, wie ...', 'Langfristig gesehen ...'], beispiel: 'Die Zukunft wird zeigen, ob die getroffenen Maßnahmen ausreichend sind, um den Klimawandel zu begrenzen.' },
  { id: 46, kategorie: 'Schluss / Fazit', situation: 'Dengeli / açık uçlu bir son yapmak', ausdrucke: ['Eine einfache Antwort gibt es nicht, aber ...', 'So eindeutig die Probleme auch sein mögen, so vielfältig sind die Lösungsansätze.'], beispiel: 'Eine einfache Antwort gibt es nicht, aber klar ist: ohne konsequentes Handeln wird sich nichts verändern.' },

  // ── BEZUG NEHMEN ──────────────────────────────────────────
  { id: 47, kategorie: 'Bezug nehmen', situation: 'Bir metne / kaynağa atıfta bulunmak', ausdrucke: ['Wie im Text erwähnt wird ...', 'Laut dem Text ...', 'Der Autor weist darauf hin, dass ...'], beispiel: 'Wie im Text erwähnt wird, ist die Jugendarbeitslosigkeit in einigen Ländern auf über 30% gestiegen.' },
  { id: 48, kategorie: 'Bezug nehmen', situation: 'Bir görüşü dolaylı aktarmak', ausdrucke: ['Der Autor vertritt die These, dass ...', 'Laut ... sei ...', 'Experten zufolge ...'], beispiel: 'Der Autor vertritt die These, dass wirtschaftliches Wachstum und Nachhaltigkeit vereinbar seien.' },
  { id: 49, kategorie: 'Bezug nehmen', situation: 'Bir araştırmaya / istatistiğe atıfta bulunmak', ausdrucke: ['Einer Studie zufolge ...', 'Laut einer aktuellen Umfrage ...', 'Den Ergebnissen der Forschung zufolge ...'], beispiel: 'Laut einer aktuellen Umfrage befürworten 68% der Deutschen eine strengere Klimapolitik.' },
  { id: 50, kategorie: 'Bezug nehmen', situation: 'Grafiği / veriyi tanımlamak', ausdrucke: ['Die Grafik zeigt, dass ...', 'Aus der Darstellung geht hervor, dass ...', 'Auffällig ist, dass ...'], beispiel: 'Aus der Darstellung geht hervor, dass die Nutzung erneuerbarer Energien zwischen 2010 und 2023 stark gestiegen ist.' },

  // ── FORMELLER BRIEF ───────────────────────────────────────
  { id: 51, kategorie: 'Formeller Brief', situation: 'Mektup açılışı — kişiyi biliyorsun', ausdrucke: ['Sehr geehrte Frau [Name],', 'Sehr geehrter Herr [Name],'], beispiel: 'Sehr geehrte Frau Müller,' },
  { id: 52, kategorie: 'Formeller Brief', situation: 'Mektup açılışı — kişiyi bilmiyorsun', ausdrucke: ['Sehr geehrte Damen und Herren,'], beispiel: 'Sehr geehrte Damen und Herren,' },
  { id: 53, kategorie: 'Formeller Brief', situation: 'Yazma nedenini belirtmek', ausdrucke: ['Ich wende mich an Sie, um ...', 'Der Grund meines Schreibens ist ...', 'Mit diesem Brief möchte ich ...'], beispiel: 'Ich wende mich an Sie, um meine Bedenken bezüglich des geplanten Bauprojekts zu äußern.' },
  { id: 54, kategorie: 'Formeller Brief', situation: 'Rica etmek / talep etmek', ausdrucke: ['Ich würde mich freuen, wenn Sie ...', 'Ich bitte Sie, ...', 'Könnten Sie bitte ...'], beispiel: 'Ich bitte Sie, mir bis zum 30. des Monats eine schriftliche Bestätigung zukommen zu lassen.' },
  { id: 55, kategorie: 'Formeller Brief', situation: 'Şikayette bulunmak', ausdrucke: ['Ich möchte mich über ... beschweren.', 'Leider muss ich Ihnen mitteilen, dass ...', 'Ich bin mit ... äußerst unzufrieden.'], beispiel: 'Leider muss ich Ihnen mitteilen, dass die bestellten Waren trotz mehrfacher Nachfrage noch nicht angekommen sind.' },
  { id: 56, kategorie: 'Formeller Brief', situation: 'Çözüm önermek', ausdrucke: ['Ich schlage vor, dass ...', 'Als Lösung bietet sich an, ...', 'Ich würde es begrüßen, wenn ...'], beispiel: 'Ich schlage vor, dass ein gemeinsames Treffen organisiert wird, um das Problem zu besprechen.' },
  { id: 57, kategorie: 'Formeller Brief', situation: 'Mektup kapanışı', ausdrucke: ['Mit freundlichen Grüßen,', 'Hochachtungsvoll,', 'Mit freundlichen Grüßen und der Bitte um baldige Antwort,'], beispiel: 'Mit freundlichen Grüßen,' },
  { id: 58, kategorie: 'Formeller Brief', situation: 'Ek belgelere değinmek', ausdrucke: ['Anbei übersende ich Ihnen ...', 'In der Anlage finden Sie ...', 'Beiliegend erhalten Sie ...'], beispiel: 'Anbei übersende ich Ihnen meine Bewerbungsunterlagen sowie ein aktuelles Foto.' },
];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
