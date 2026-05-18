export interface SprachbausteineItem {
  nr: number;
  optionen: [string, string, string, string]; // [0] = doğru cevap
  erklaerung: string;
}

export interface SprachbausteineText {
  id: number;
  titel: string;
  thema: string;
  schwierigkeit: 'Mittel' | 'Fortgeschritten';
  text: string; // [1], [2] ... ile işaretlenmiş boşluklar
  items: SprachbausteineItem[];
}

export const SPRACHBAUSTEINE_TEXTE: SprachbausteineText[] = [

  // ── TEXT 1 ─────────────────────────────────────────────────────
  {
    id: 1,
    titel: 'Digitalisierung und Bildung',
    thema: 'Bildungssystem · Technologie · Gesellschaft',
    schwierigkeit: 'Mittel',
    text:
      'Die Digitalisierung verändert das Bildungssystem [1] Grund auf. Digitale Lernplattformen stehen Schülerinnen und Schülern rund um die Uhr [2] Verfügung und ermöglichen flexibles, individuelles Lernen. Lehrkräfte sehen sich [3] der Herausforderung, traditionelle Unterrichtsmethoden mit modernen digitalen Werkzeugen zu verbinden. Viele Pädagogen weisen darauf hin, dass eine rein technologiebasierte Bildung soziale Kompetenzen vernachlässigen kann. [4] Experten müssen digitale Medien stets in ein pädagogisches Gesamtkonzept eingebettet sein. Besonders in ländlichen Regionen fehlt es vielen Haushalten [5] der notwendigen technischen Ausstattung. Es steht [6] Zweifel, dass digitale Kompetenzen künftig unverzichtbar sein werden. Der Zugang zu digitalen Bildungsangeboten soll [7] staatliche Förderprogramme ausgebaut werden. Bildung muss so gestaltet sein, [8] alle Menschen gleichermaßen von den Chancen profitieren können. Nur so kann Digitalisierung dauerhaft [9] Bedeutung gewinnen, [10] soziale Ungleichheiten zu verstärken.',
    items: [
      {
        nr: 1,
        optionen: ['von', 'im', 'an', 'aus'],
        erklaerung: '"von Grund auf" = "temelden, kökten" anlamında kalıp ifade. "von" değişmez.',
      },
      {
        nr: 2,
        optionen: ['zur', 'für', 'in', 'an'],
        erklaerung: '"zur Verfügung stehen" = "mevcut olmak" sabit ifade. "zu" + Dativ → "zur".',
      },
      {
        nr: 3,
        optionen: ['vor', 'mit', 'bei', 'für'],
        erklaerung: '"sich vor einer Herausforderung sehen" = "bir zorlukla karşı karşıya kalmak". "vor" sabit.',
      },
      {
        nr: 4,
        optionen: ['Laut', 'Nach', 'Für', 'Durch'],
        erklaerung: '"Laut + Nomen" = "...göre". "Laut Experten" = "uzmanlara göre". Yazılı Almancada standart.',
      },
      {
        nr: 5,
        optionen: ['an', 'bei', 'für', 'mit'],
        erklaerung: '"es fehlt an + Dativ" = "... eksik" sabit ifade. "an" bu yapıda değişmez.',
      },
      {
        nr: 6,
        optionen: ['außer', 'ohne', 'über', 'unter'],
        erklaerung: '"außer Zweifel stehen" = "şüphe götürmez olmak". Kalıp ifade, "außer" değişmez.',
      },
      {
        nr: 7,
        optionen: ['durch', 'mit', 'für', 'von'],
        erklaerung: '"durch + Akkusativ" = araç/yöntem bildirir. "durch staatliche Programme" = devlet programları aracılığıyla.',
      },
      {
        nr: 8,
        optionen: ['damit', 'obwohl', 'weil', 'wenn'],
        erklaerung: '"damit" = amaç bağlacı (Finalsatz): "öyle ki herkes yararlansın". "sodass" sonuç, "damit" amaç bildirir.',
      },
      {
        nr: 9,
        optionen: ['an', 'in', 'für', 'zur'],
        erklaerung: '"an Bedeutung gewinnen" = "önem kazanmak" kalıp ifade. "an" burada değişmez.',
      },
      {
        nr: 10,
        optionen: ['ohne', 'statt', 'anstatt', 'trotz'],
        erklaerung: '"ohne + Infinitiv" = "-meden/maksızın". "ohne soziale Ungleichheiten zu verstärken" = eşitsizlikleri artırmadan.',
      },
    ],
  },

  // ── TEXT 2 ─────────────────────────────────────────────────────
  {
    id: 2,
    titel: 'Nachhaltigkeit und Konsum',
    thema: 'Umwelt · Verbraucherverhalten · Politik',
    schwierigkeit: 'Mittel',
    text:
      'Nachhaltiger Konsum gewinnt in modernen Gesellschaften zunehmend [1] Bedeutung. Immer mehr Verbraucherinnen und Verbraucher informieren sich [2] über die Herkunft und Umweltverträglichkeit von Produkten. Unternehmen reagieren [3] diese Nachfrage, indem sie verstärkt auf nachhaltige Materialien und Produktionsmethoden setzen. Kritiker weisen [4] hin, dass sogenanntes „Greenwashing" – also das Vortäuschen von Umweltfreundlichkeit – weit verbreitet ist. [5] diesem Hintergrund fordert die EU transparentere Kennzeichnungspflichten für Produkte. Verbraucherinnen und Verbraucher sollen so in [6] gesetzt werden, bewusste Kaufentscheidungen zu treffen. [7] aktuellen Studien hat die jüngere Generation ihr Konsumverhalten stärker verändert als ältere Bevölkerungsgruppen. Dies [8] sich vor allem damit erklären, dass Jugendliche früher für Klimafragen sensibilisiert wurden. Nachhaltigem Konsum kommt dabei eine politische Dimension [9], da er gesellschaftliche Werte und Prioritäten zum [10] bringt.',
    items: [
      {
        nr: 1,
        optionen: ['an', 'in', 'für', 'zur'],
        erklaerung: '"an Bedeutung gewinnen" = "önem kazanmak" kalıp ifade. "an" değişmez.',
      },
      {
        nr: 2,
        optionen: ['verstärkt', 'kaum', 'selten', 'manchmal'],
        erklaerung: '"verstärkt" = "giderek daha fazla / artan ölçüde". Bağlam: tüketiciler her zamankinden daha çok bilgi ediniyor.',
      },
      {
        nr: 3,
        optionen: ['auf', 'für', 'an', 'gegen'],
        erklaerung: '"reagieren auf + Akkusativ" = "...e tepki vermek / yanıt vermek". "auf" bu fiilin sabit edatı.',
      },
      {
        nr: 4,
        optionen: ['darauf', 'daran', 'davon', 'dabei'],
        erklaerung: '"hinweisen auf etwas" → zamir formu: "darauf hinweisen". "auf etw." → "darauf".',
      },
      {
        nr: 5,
        optionen: ['Vor', 'Mit', 'Auf', 'In'],
        erklaerung: '"vor diesem Hintergrund" = "bu bağlamda / bu arka plana karşın" standart gazetecilik ifadesi.',
      },
      {
        nr: 6,
        optionen: ['die Lage', 'der Lage', 'eine Lage', 'einer Lage'],
        erklaerung: '"in die Lage versetzen" = "imkân tanımak, muktedir kılmak". Akküzatif: "die Lage". Kalıp ifade.',
      },
      {
        nr: 7,
        optionen: ['Laut', 'Nach', 'Durch', 'Von'],
        erklaerung: '"Laut + Nomen" = "...e göre". "Laut aktuellen Studien" = "güncel araştırmalara göre".',
      },
      {
        nr: 8,
        optionen: ['lässt', 'liegt', 'ergibt', 'zeigt'],
        erklaerung: '"sich erklären lassen" = "açıklanabilmek". "lässt sich erklären" = açıklanabilir. Sabit yapı.',
      },
      {
        nr: 9,
        optionen: ['zu', 'an', 'vor', 'bei'],
        erklaerung: '"zukommen" = "ait olmak, düşmek". "Nachhaltigem Konsum kommt ... zu" = "... Nachhaltigen Konsum\'a aittir".',
      },
      {
        nr: 10,
        optionen: ['Ausdruck', 'Wort', 'Vorschein', 'Geltung'],
        erklaerung: '"zum Ausdruck bringen" = "dile getirmek, ifade etmek" kalıp ifade. "zum Ausdruck" sabit.',
      },
    ],
  },

  // ── TEXT 3 ─────────────────────────────────────────────────────
  {
    id: 3,
    titel: 'Mehrsprachigkeit als Ressource',
    thema: 'Sprache · Kognition · Bildungspolitik',
    schwierigkeit: 'Fortgeschritten',
    text:
      'Mehrsprachigkeit gilt heute nicht [1] als sprachliche Besonderheit, sondern als wichtige kognitive Ressource. Studien belegen, dass mehrsprachig aufgewachsene Kinder leichter [2] verschiedene Perspektiven wechseln und flexibler denken können. [3] Sicht der Neurowissenschaften stärkt aktives Mehrsprachigkeitserleben bestimmte Hirnareale und kann kognitivem Abbau entgegenwirken. Kinder, die [4] frühester Kindheit an mit zwei oder mehr Sprachen aufwachsen, profitieren dabei besonders stark. In Schulen galt Mehrsprachigkeit lange [5] Hindernis, [6] sie in der Praxis häufig eine beachtliche Stärke darstellt. Neuere pädagogische Konzepte setzen [7] auf mehrsprachige Unterrichtsmodelle, die die Erstsprache als Fundament für weitere Sprachen nutzen. Experten raten [8], beide Sprachen konsequent und [9] Druck zu fördern. Insgesamt [10] Mehrsprachigkeit in einer globalisierten Welt zunehmend an Bedeutung.',
    items: [
      {
        nr: 1,
        optionen: ['mehr', 'nur', 'länger', 'bloß'],
        erklaerung: '"nicht mehr ... sondern" = "artık değil ... aksine". "mehr" burada "artık" (no longer) anlamında.',
      },
      {
        nr: 2,
        optionen: ['zwischen', 'in', 'durch', 'über'],
        erklaerung: '"zwischen ... wechseln" = "... arasında geçiş yapmak". "wechseln" fiili "zwischen + Dativ" ile kullanılır.',
      },
      {
        nr: 3,
        optionen: ['Aus', 'Von', 'Nach', 'Für'],
        erklaerung: '"Aus Sicht + Genitiv" = "... bakış açısından". "Aus Sicht der Experten" standart akademik ifade.',
      },
      {
        nr: 4,
        optionen: ['von', 'ab', 'seit', 'aus'],
        erklaerung: '"von frühester Kindheit an" = "en erken çocukluktan itibaren". "von ... an" kalıbında "von" sabit.',
      },
      {
        nr: 5,
        optionen: ['als', 'wie', 'für', 'wegen'],
        erklaerung: '"gelten als + Nominativ" = "... olarak kabul görmek, sayılmak". "als" bu yapıda değişmez.',
      },
      {
        nr: 6,
        optionen: ['obwohl', 'da', 'wenn', 'weil'],
        erklaerung: '"obwohl" = zıtlık bağlacı (Konzessivsatz). Önceki cümle: uzun süre engel sayıldı → bağlam zıtlık gerektiriyor.',
      },
      {
        nr: 7,
        optionen: ['verstärkt', 'heute', 'bereits', 'kaum'],
        erklaerung: '"verstärkt setzen auf" = "giderek daha güçlü biçimde ... üzerine odaklanmak / bel bağlamak".',
      },
      {
        nr: 8,
        optionen: ['dazu', 'dabei', 'darauf', 'daran'],
        erklaerung: '"raten zu + Dativ" → zamir formu: "dazu raten, etwas zu tun". "zu etw." → "dazu".',
      },
      {
        nr: 9,
        optionen: ['ohne', 'mit', 'unter', 'durch'],
        erklaerung: '"ohne + Akkusativ" = "-siz / -madan". "ohne Druck" = baskı uygulamadan / zorlamadan.',
      },
      {
        nr: 10,
        optionen: ['gewinnt', 'verliert', 'nimmt', 'hat'],
        erklaerung: '"an Bedeutung gewinnen" = "önem kazanmak". "gewinnt an Bedeutung" standart kalıp. "nimmt an Bedeutung" Almancada kullanılmaz.',
      },
    ],
  },
];

export function shuffleOptions(arr: string[]): string[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
