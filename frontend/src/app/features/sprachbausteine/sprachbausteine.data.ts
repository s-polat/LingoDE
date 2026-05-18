export interface KalipNvv {
  type: 'nvv';
  phrase: string;
  noun: string;
  verb: string;
  article: string;
  equivalent_verb: string;
  meaning_tr: string;
  example_de: string;
  example_tr: string;
  category: string;
}

export interface KalipPv {
  type: 'pv';
  verb: string;
  preposition: string;
  case: string;
  meaning_tr: string;
  example_de: string;
  example_tr: string;
  level: string;
}

export type Kalip = KalipNvv | KalipPv;

export interface SprachbausteineItem {
  nr: number;
  optionen: [string, string, string, string]; // [0] = doğru cevap
  erklaerung: string;
  kalip?: Kalip;
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
        kalip: {
          type: 'nvv',
          phrase: 'zur Verfügung stehen',
          noun: 'Verfügung',
          verb: 'stehen',
          article: 'die',
          equivalent_verb: 'verfügbar sein',
          meaning_tr: 'mevcut olmak, erişilebilir olmak',
          example_de: 'Das Angebot steht allen Nutzern zur Verfügung.',
          example_tr: 'Teklif tüm kullanıcılara açıktır.',
          category: 'Zustand',
        },
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
        kalip: {
          type: 'pv',
          verb: 'fehlen',
          preposition: 'an',
          case: 'Dativ',
          meaning_tr: '... eksik olmak, ... yetersiz kalmak',
          example_de: 'Es fehlt an der notwendigen technischen Ausstattung.',
          example_tr: 'Gerekli teknik donanım eksiktir.',
          level: 'B2',
        },
      },
      {
        nr: 6,
        optionen: ['außer', 'ohne', 'über', 'unter'],
        erklaerung: '"außer Zweifel stehen" = "şüphe götürmez olmak". Kalıp ifade, "außer" değişmez.',
        kalip: {
          type: 'nvv',
          phrase: 'außer Zweifel stehen',
          noun: 'Zweifel',
          verb: 'stehen',
          article: 'der',
          equivalent_verb: 'unzweifelhaft sein',
          meaning_tr: 'şüphe götürmez olmak',
          example_de: 'Es steht außer Zweifel, dass digitale Kompetenzen unverzichtbar sind.',
          example_tr: 'Dijital becerilerin zorunlu olduğu şüphe götürmez.',
          category: 'Zustand',
        },
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
        kalip: {
          type: 'pv',
          verb: 'reagieren',
          preposition: 'auf',
          case: 'Akkusativ',
          meaning_tr: '... tepki vermek, yanıt vermek',
          example_de: 'Unternehmen reagieren auf die steigende Nachfrage.',
          example_tr: 'Şirketler artan talebe yanıt veriyor.',
          level: 'B2',
        },
      },
      {
        nr: 4,
        optionen: ['darauf', 'daran', 'davon', 'dabei'],
        erklaerung: '"hinweisen auf etwas" → zamir formu: "darauf hinweisen". "auf etw." → "darauf".',
        kalip: {
          type: 'pv',
          verb: 'hinweisen',
          preposition: 'auf',
          case: 'Akkusativ',
          meaning_tr: '... dikkat çekmek, işaret etmek',
          example_de: 'Kritiker weisen darauf hin, dass Greenwashing weit verbreitet ist.',
          example_tr: 'Eleştirmenler, greenwashing\'in yaygın olduğuna dikkat çekiyor.',
          level: 'C1',
        },
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
        kalip: {
          type: 'nvv',
          phrase: 'in die Lage versetzen',
          noun: 'Lage',
          verb: 'versetzen',
          article: 'die',
          equivalent_verb: 'ermöglichen',
          meaning_tr: 'imkân tanımak, muktedir kılmak',
          example_de: 'Die Maßnahmen sollen Verbraucher in die Lage versetzen, bewusste Entscheidungen zu treffen.',
          example_tr: 'Önlemler tüketicilerin bilinçli kararlar almasını sağlamalıdır.',
          category: 'Handlung',
        },
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
        kalip: {
          type: 'nvv',
          phrase: 'zum Ausdruck bringen',
          noun: 'Ausdruck',
          verb: 'bringen',
          article: 'der',
          equivalent_verb: 'ausdrücken',
          meaning_tr: 'dile getirmek, ifade etmek',
          example_de: 'Das Kunstwerk bringt gesellschaftliche Werte zum Ausdruck.',
          example_tr: 'Sanat eseri toplumsal değerleri ifade etmektedir.',
          category: 'Kommunikation',
        },
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
        kalip: {
          type: 'pv',
          verb: 'wechseln',
          preposition: 'zwischen',
          case: 'Dativ',
          meaning_tr: '... arasında geçiş yapmak',
          example_de: 'Mehrsprachige Kinder können leichter zwischen verschiedenen Perspektiven wechseln.',
          example_tr: 'Çok dilli çocuklar farklı bakış açıları arasında daha kolay geçiş yapabilir.',
          level: 'B2',
        },
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
        kalip: {
          type: 'pv',
          verb: 'raten',
          preposition: 'zu',
          case: 'Dativ',
          meaning_tr: '... tavsiye etmek, önermek',
          example_de: 'Experten raten dazu, beide Sprachen konsequent zu fördern.',
          example_tr: 'Uzmanlar her iki dili düzenli olarak desteklemeyi tavsiye ediyor.',
          level: 'B2',
        },
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

  // ── TEXT 4 ─────────────────────────────────────────────────────
  {
    id: 4,
    titel: 'Klimawandel und Umweltpolitik',
    thema: 'Klima · Energie · Internationale Kooperation',
    schwierigkeit: 'Fortgeschritten',
    text:
      'Der Klimawandel gilt [1] als eine der drängendsten Herausforderungen des 21. Jahrhunderts. [2] steigender Temperaturen und häufiger Extremwetterereignisse sind viele Regierungen [3] Druck geraten, ihre Klimaschutzziele zu verschärfen. [4] die Erderwärmung auf 1,5 Grad zu begrenzen, muss der weltweite CO₂-Ausstoß deutlich gesenkt werden. [5] wirtschaftlicher Sicht erfordert die Energiewende zwar erhebliche Investitionen, doch sind sich die meisten Experten [6] einig, dass sie sich langfristig lohnen. [7] diesem Zusammenhang spielt internationale Kooperation eine entscheidende Rolle. Die Weltgemeinschaft hat sich [8] geeinigt, gemeinsam gegen den Klimawandel vorzugehen, doch die Umsetzung scheitert häufig [9] dem nötigen politischen Willen. Nur durch kollektives Handeln lässt [10] eine gerechte und nachhaltige Zukunft gestalten.',
    items: [
      {
        nr: 1,
        optionen: ['allgemein', 'häufig', 'selten', 'kaum'],
        erklaerung: '"gilt allgemein als" = "genel olarak ... kabul görür". "allgemein" burada "genel kabule göre" anlamında.',
      },
      {
        nr: 2,
        optionen: ['Angesichts', 'Trotz', 'Seit', 'Statt'],
        erklaerung: '"Angesichts + Genitiv" = "... göz önüne alındığında, ... karşısında". "Trotz" zıtlık bildirir (yanlış); "Seit" zamansal.',
      },
      {
        nr: 3,
        optionen: ['unter', 'in', 'an', 'bei'],
        erklaerung: '"unter Druck geraten" = "baskı altına girmek" kalıp ifade. "unter" değişmez.',
        kalip: {
          type: 'nvv',
          phrase: 'unter Druck geraten',
          noun: 'Druck',
          verb: 'geraten',
          article: 'der',
          equivalent_verb: 'unter Stress stehen',
          meaning_tr: 'baskı altına girmek',
          example_de: 'Viele Regierungen sind unter Druck geraten, ihre Klimaschutzziele zu verschärfen.',
          example_tr: 'Pek çok hükümet iklim koruma hedeflerini sıkılaştırmak için baskı altına girdi.',
          category: 'Zustand',
        },
      },
      {
        nr: 4,
        optionen: ['Um', 'Für', 'Damit', 'Wegen'],
        erklaerung: '"Um ... zu + Infinitiv" = amaç bildiren yapı. "Damit" farklı fiil formu gerektirir (Konjunktiv). "Für" bu yapıda kullanılmaz.',
      },
      {
        nr: 5,
        optionen: ['Aus', 'Von', 'Nach', 'Für'],
        erklaerung: '"Aus wirtschaftlicher Sicht" = "ekonomik açıdan bakıldığında" standart akademik ifade.',
      },
      {
        nr: 6,
        optionen: ['darin', 'dabei', 'daran', 'davon'],
        erklaerung: '"sich darin einig sein, dass ..." = "... konusunda hemfikir olmak". "darin" + "dass"-Satz standart kombinasyon.',
      },
      {
        nr: 7,
        optionen: ['In', 'Aus', 'Mit', 'Von'],
        erklaerung: '"In diesem Zusammenhang" = "bu bağlamda" standart bağlaç ifade. "Aus diesem Zusammenhang" = bağlamdan koparma (farklı anlam).',
      },
      {
        nr: 8,
        optionen: ['darauf', 'dazu', 'dabei', 'daran'],
        erklaerung: '"sich einigen auf etw." → zamir formu: "sich darauf geeinigt, X zu tun". "auf etw." → "darauf".',
        kalip: {
          type: 'pv',
          verb: 'sich einigen',
          preposition: 'auf',
          case: 'Akkusativ',
          meaning_tr: '... üzerinde uzlaşmak, anlaşmak',
          example_de: 'Die Weltgemeinschaft hat sich darauf geeinigt, gemeinsam vorzugehen.',
          example_tr: 'Dünya topluluğu birlikte hareket etmek için anlaşmıştır.',
          level: 'C1',
        },
      },
      {
        nr: 9,
        optionen: ['an', 'bei', 'für', 'mit'],
        erklaerung: '"scheitern an + Dativ" = "... yüzünden başarısız olmak". "an" bu fiilin sabit edatı.',
        kalip: {
          type: 'pv',
          verb: 'scheitern',
          preposition: 'an',
          case: 'Dativ',
          meaning_tr: '... yüzünden başarısız olmak, ... engeliyle karşılaşmak',
          example_de: 'Die Umsetzung scheitert häufig an dem nötigen politischen Willen.',
          example_tr: 'Uygulama çoğu zaman gerekli siyasi irade eksikliği nedeniyle başarısız oluyor.',
          level: 'C1',
        },
      },
      {
        nr: 10,
        optionen: ['sich', 'es', 'man', 'das'],
        erklaerung: '"lässt sich gestalten" = "şekillendirilebilir". "lassen + sich + Infinitiv" = pasif ikamesi (Passiversatz). "sich" zorunlu.',
      },
    ],
  },

  // ── TEXT 5 ─────────────────────────────────────────────────────
  {
    id: 5,
    titel: 'Gesundheit und Prävention',
    thema: 'Medizin · Lebensstil · Gesellschaft',
    schwierigkeit: 'Mittel',
    text:
      'Experten weisen [1] hin, dass präventive Gesundheitsmaßnahmen das individuelle Krankheitsrisiko deutlich senken. Dennoch fällt es vielen Menschen schwer, ihren Lebensstil [2] Grund auf zu verändern, da es häufig [3] der nötigen Motivation fehlt. Gesundheitsorganisationen fordern [4] diesem Hintergrund, Prävention bereits im Kindesalter systematisch zu verankern. Schulen können in [5] Hinsicht besonders wirksam sein, da sie täglich [6] junge Menschen einwirken. Es [7] sich nicht leugnen, dass ein inaktiver Lebensstil langfristig erhebliche Schäden verursacht. Digitale Gesundheitsanwendungen können [8] dazu beitragen, gesunde Gewohnheiten in den Alltag zu integrieren. [9] man sich jedoch kritisch mit den eigenen Daten auseinandersetzt, lassen sich auch Risiken minimieren. Insgesamt steht [10] Zweifel, dass Prävention langfristig sowohl Kosten als auch Leid erheblich reduziert.',
    items: [
      {
        nr: 1,
        optionen: ['darauf', 'daran', 'davon', 'dabei'],
        erklaerung: '"hinweisen auf etw." → zamir formu: "darauf hinweisen". "auf etw." → "darauf".',
      },
      {
        nr: 2,
        optionen: ['von', 'im', 'an', 'aus'],
        erklaerung: '"von Grund auf" = "temelden, kökten" kalıp ifade. "von" sabit.',
      },
      {
        nr: 3,
        optionen: ['an', 'bei', 'für', 'mit'],
        erklaerung: '"es fehlt an + Dativ" = "... eksik olmak, ... yetersiz kalmak". "an" değişmez.',
      },
      {
        nr: 4,
        optionen: ['Vor', 'Mit', 'Auf', 'In'],
        erklaerung: '"vor diesem Hintergrund" = "bu bağlamda, bu arka plana karşın" standart gazetecilik ifadesi.',
      },
      {
        nr: 5,
        optionen: ['dieser', 'jener', 'solcher', 'gewisser'],
        erklaerung: '"in dieser Hinsicht" = "bu açıdan, bu bağlamda". "diese" = konuşma bağlamındaki unsuru işaret eder.',
      },
      {
        nr: 6,
        optionen: ['auf', 'in', 'für', 'gegen'],
        erklaerung: '"einwirken auf + Akkusativ" = "... üzerinde etki etmek, etkilemek". "auf" bu fiilin sabit edatı.',
        kalip: {
          type: 'pv',
          verb: 'einwirken',
          preposition: 'auf',
          case: 'Akkusativ',
          meaning_tr: '... üzerinde etki etmek, etkilemek',
          example_de: 'Schulen können täglich auf junge Menschen einwirken.',
          example_tr: 'Okullar her gün genç insanlar üzerinde etki bırakabilir.',
          level: 'C1',
        },
      },
      {
        nr: 7,
        optionen: ['lässt', 'darf', 'kann', 'muss'],
        erklaerung: '"es lässt sich nicht leugnen" = "inkâr edilemez" kalıp ifade. "lassen + sich + Infinitiv" = pasif ikamesi.',
      },
      {
        nr: 8,
        optionen: ['erheblich', 'kaum', 'selten', 'wenig'],
        erklaerung: '"erheblich dazu beitragen" = "önemli ölçüde katkıda bulunmak". Bağlam olumlu → "erheblich". "kaum/selten/wenig" zıt anlam.',
      },
      {
        nr: 9,
        optionen: ['Wenn', 'Bevor', 'Damit', 'Obwohl'],
        erklaerung: '"Wenn man sich mit etw. auseinandersetzt" = koşul cümlesi. "Bevor" sıralama, "Damit" amaç, "Obwohl" zıtlık bildirir.',
      },
      {
        nr: 10,
        optionen: ['außer', 'ohne', 'über', 'unter'],
        erklaerung: '"außer Zweifel stehen" = "şüphe götürmez olmak" kalıp ifade. "außer" değişmez.',
      },
    ],
  },

  // ── TEXT 6 ─────────────────────────────────────────────────────
  {
    id: 6,
    titel: 'Migration und Integration',
    thema: 'Gesellschaft · Bildung · Chancengleichheit',
    schwierigkeit: 'Fortgeschritten',
    text:
      'Migration ist ein [1] Teil der Menschheitsgeschichte und prägt seit jeher Kulturen und Gesellschaften. In modernen Demokratien wird Integration nicht nur [2] einer gesellschaftlichen Aufgabe, sondern auch als kulturelle Bereicherung verstanden. Einwanderer bringen vielfältige Qualifikationen und Perspektiven [3] sich, die dem Aufnahmeland zugutekommen können. Integration kann [4] gelingen, wenn beide Seiten – die aufnehmende Gesellschaft und die Zugewanderten – aktiv beitragen. Sprachkompetenz gilt als [5] Schlüssel für eine erfolgreiche Eingliederung. Studien zeigen, dass Kinder [6] Migrationshintergrund bessere Bildungschancen haben, wenn sprachliche Förderung früh einsetzt. In vielen Ländern gibt es jedoch [7] strukturelle Diskriminierung auf dem Arbeitsmarkt. Politik und Gesellschaft sind [8] aufgefordert, diese Hindernisse systematisch abzubauen. Kulturelle Vielfalt [9] daher als gesellschaftliche Ressource begriffen werden, nicht als Bedrohung. Integration ist kein einmaliger Prozess, sondern eine [10] gesellschaftliche Aufgabe.',
    items: [
      {
        nr: 1,
        optionen: ['grundlegender', 'grundlegendes', 'grundlegende', 'grundlegend'],
        erklaerung: '"ein grundlegender Teil" — "Teil" eril (der Teil), Nominativ, belirsiz artikel sonrası güçlü çekim: "-er".',
      },
      {
        nr: 2,
        optionen: ['als', 'wie', 'für', 'von'],
        erklaerung: '"nicht nur als X, sondern auch als Y" = kalıp zıtlık yapısı. "als" her iki konumda sabit.',
      },
      {
        nr: 3,
        optionen: ['mit', 'bei', 'an', 'in'],
        erklaerung: '"mit sich bringen" = "beraberinde getirmek, bünyesinde barındırmak" kalıp ifade. "mit" sabit.',
        kalip: {
          type: 'nvv',
          phrase: 'mit sich bringen',
          noun: 'sich',
          verb: 'bringen',
          article: '—',
          equivalent_verb: 'zur Folge haben',
          meaning_tr: 'beraberinde getirmek, gerektirmek',
          example_de: 'Einwanderer bringen vielfältige Qualifikationen mit sich.',
          example_tr: 'Göçmenler beraberinde çeşitli nitelikler getiriyor.',
          category: 'Handlung',
        },
      },
      {
        nr: 4,
        optionen: ['nur dann', 'immer', 'leicht', 'selten'],
        erklaerung: '"nur dann ... wenn" = "ancak ... durumunda" koşul kalıbı. "nur dann" + "wenn" birlikte kullanılır.',
      },
      {
        nr: 5,
        optionen: ['entscheidender', 'entscheidenden', 'entscheidendes', 'entscheidende'],
        erklaerung: '"gilt als entscheidender Schlüssel" — "als" sonrası Nominativ, "Schlüssel" eril → güçlü çekim: "-er".',
      },
      {
        nr: 6,
        optionen: ['mit', 'ohne', 'aus', 'von'],
        erklaerung: '"Kinder mit Migrationshintergrund" = "göç geçmişi olan çocuklar". "mit" sabit bağlaç.',
      },
      {
        nr: 7,
        optionen: ['nach wie vor', 'immer seltener', 'kaum noch', 'längst keine'],
        erklaerung: '"nach wie vor" = "hâlâ, hâlihazırda" kalıp ifade. Bağlam "dennoch" (bununla birlikte) → olumsuz durum devam ediyor.',
      },
      {
        nr: 8,
        optionen: ['dazu', 'dabei', 'daran', 'davon'],
        erklaerung: '"dazu aufgefordert sein, X zu tun" = "X yapmaya davet edilmek/çağrılmak". "auffordern zu" → "dazu".',
        kalip: {
          type: 'pv',
          verb: 'auffordern',
          preposition: 'zu',
          case: 'Dativ',
          meaning_tr: '... yapmaya çağırmak, davet etmek',
          example_de: 'Politik und Gesellschaft sind dazu aufgefordert, Hindernisse abzubauen.',
          example_tr: 'Siyaset ve toplum engelleri ortadan kaldırmaya çağrılmaktadır.',
          level: 'C1',
        },
      },
      {
        nr: 9,
        optionen: ['muss', 'soll', 'darf', 'kann'],
        erklaerung: '"muss ... begriffen werden" = normatif yükümlülük. Bağlam: "tehdit değil, kaynak olarak" → güçlü zorunluluk → "muss".',
      },
      {
        nr: 10,
        optionen: ['dauerhafte', 'einmalige', 'kurzfristige', 'leichte'],
        erklaerung: '"eine dauerhafte Aufgabe" — "eine" + dişil Nominativ → zayıf çekim: "-e". "einmalige" (tek seferlik) bağlamla çelişir.',
      },
    ],
  },

  // ── TEXT 7 ─────────────────────────────────────────────────────
  {
    id: 7,
    titel: 'Wissenschaft und Forschung',
    thema: 'Universität · Integrität · Wissenschaftskommunikation',
    schwierigkeit: 'Fortgeschritten',
    text:
      'Wissenschaftliche Forschung bildet die [1] Grundlage gesellschaftlichen Fortschritts. Neue Erkenntnisse tragen [2] bei, globale Herausforderungen zu bewältigen. Forschende stehen [3] der Pflicht, ihre Ergebnisse transparent und nachvollziehbar zu kommunizieren, [4] die Öffentlichkeit fundierte Entscheidungen treffen kann. Im [5] mit anderen Ländern zeigt Deutschland eine hohe Forschungsintensität. Universitäten sind [6], eine Kultur der wissenschaftlichen Integrität aktiv zu fördern. Staatliche Fördergelder tragen [7] bei, dass viele Projekte überhaupt realisiert werden können. Ohne diese Unterstützung würden zahlreiche Vorhaben nicht [8] kommen. Gleichzeitig wächst die Bedeutung internationaler Kooperationen, da komplexe Probleme [9] nationaler Grenzen angegangen werden müssen. Angesichts dieser Entwicklungen kommt der Wissenschaftskommunikation eine [10] Bedeutung zu, denn nur ein informiertes Publikum kann Forschungsergebnisse sinnvoll einordnen.',
    items: [
      {
        nr: 1,
        optionen: ['wesentliche', 'wesentlichen', 'wesentlicher', 'wesentliches'],
        erklaerung: '"die wesentliche Grundlage" — "die" (bestimmter Artikel) + dişil Nominativ → zayıf çekim: "-e".',
      },
      {
        nr: 2,
        optionen: ['dazu', 'dabei', 'daran', 'davon'],
        erklaerung: '"dazu beitragen, X zu tun" = "X yapmaya katkıda bulunmak". "beitragen zu" → zamir: "dazu".',
        kalip: {
          type: 'pv',
          verb: 'beitragen',
          preposition: 'zu',
          case: 'Dativ',
          meaning_tr: '... katkıda bulunmak',
          example_de: 'Neue Erkenntnisse tragen dazu bei, globale Herausforderungen zu bewältigen.',
          example_tr: 'Yeni bulgular küresel zorluklarla başa çıkmaya katkıda bulunur.',
          level: 'B2',
        },
      },
      {
        nr: 3,
        optionen: ['in', 'unter', 'vor', 'bei'],
        erklaerung: '"in der Pflicht stehen" = "yükümlülük sahibi olmak, sorumlu olmak" kalıp ifade. "in" değişmez.',
        kalip: {
          type: 'nvv',
          phrase: 'in der Pflicht stehen',
          noun: 'Pflicht',
          verb: 'stehen',
          article: 'die',
          equivalent_verb: 'verpflichtet sein',
          meaning_tr: 'yükümlülük sahibi olmak, sorumlu olmak',
          example_de: 'Forschende stehen in der Pflicht, ihre Ergebnisse transparent zu kommunizieren.',
          example_tr: 'Araştırmacılar sonuçlarını şeffaf biçimde iletmekle yükümlüdür.',
          category: 'Zustand',
        },
      },
      {
        nr: 4,
        optionen: ['damit', 'sodass', 'obwohl', 'wenn'],
        erklaerung: '"damit" = amaç bağlacı (Finalsatz): araştırmacıların kasıtlı amacı kamuoyunu bilgilendirmek. "sodass" sonuç bildirirdi.',
      },
      {
        nr: 5,
        optionen: ['Vergleich', 'Gegensatz', 'Verhältnis', 'Unterschied'],
        erklaerung: '"im Vergleich mit" = "-le karşılaştırıldığında". "Gegensatz/Verhältnis/Unterschied" "zu" edatını gerektirir ("zu" değil "mit").',
      },
      {
        nr: 6,
        optionen: ['dazu verpflichtet', 'dazu aufgefordert', 'daran interessiert', 'davon befreit'],
        erklaerung: '"dazu verpflichtet sein, X zu tun" = "X yapmakla yükümlü olmak". Bağlam normatif → "verpflichtet". "davon befreit" = muaf olmak (zıt anlam).',
      },
      {
        nr: 7,
        optionen: ['wesentlich', 'kaum', 'wenig', 'selten'],
        erklaerung: '"wesentlich dazu beitragen" = "önemli ölçüde katkıda bulunmak". Bağlam olumlu → "wesentlich". Diğerleri olumsuz/zayıf anlam.',
      },
      {
        nr: 8,
        optionen: ['zustande', 'zuwege', 'heraus', 'durch'],
        erklaerung: '"zustande kommen" = "gerçekleşmek, hayata geçmek" kalıp ifade. "zuwege kommen" daha az yaygın; "heraus/durch kommen" farklı anlam.',
        kalip: {
          type: 'nvv',
          phrase: 'zustande kommen',
          noun: 'Zustande',
          verb: 'kommen',
          article: '—',
          equivalent_verb: 'gelingen, entstehen',
          meaning_tr: 'gerçekleşmek, hayata geçmek',
          example_de: 'Ohne finanzielle Unterstützung würden viele Projekte nicht zustande kommen.',
          example_tr: 'Mali destek olmadan pek çok proje gerçekleşemezdi.',
          category: 'Handlung',
        },
      },
      {
        nr: 9,
        optionen: ['jenseits', 'diesseits', 'innerhalb', 'außerhalb'],
        erklaerung: '"jenseits nationaler Grenzen" = "ulusal sınırların ötesinde" akademik kalıp ifade. "außerhalb" fiziksel dışarıda olma, "jenseits" kavramsal aşma.',
      },
      {
        nr: 10,
        optionen: ['wachsende', 'wachsender', 'wachsendes', 'wachsendem'],
        erklaerung: '"eine wachsende Bedeutung" — "eine" (belirsiz artikel) + dişil Nominativ → zayıf çekim: "-e".',
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
