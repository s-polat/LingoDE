export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AiWordAnalysis {
  german: string;
  article?: 'der' | 'die' | 'das';
  plural?: string;
  type: string;
  level: string;
  meanings: { turkish: string; example_de: string; example_tr: string }[];
  conjugation?: object;
  confidence: number;
}

export interface ExtractedWordsResult {
  words: string[];
  source: 'camera' | 'upload' | 'manual';
  raw_text?: string;
}

export interface PraepositionalverbEntry {
  verb: string;
  preposition: string;
  case: 'Akkusativ' | 'Dativ';
  meaning_tr: string;
  example_de: string;
  example_tr: string;
  level: string;
}

export interface GapFillExercise {
  id: string;
  verb: string;
  sentence_with_gap: string;
  options: string[];
  answer: string;
  meaning_tr: string;
  example_tr: string;
  case: 'Akkusativ' | 'Dativ';
  level: string;
}

export interface WritingKategorie {
  punkte: number;
  feedback: string;
}

export interface WritingKorrektur {
  original: string;
  korrektur: string;
  erklaerung: string;
}

export interface WritingFeedback {
  gesamtnote: string;
  gesamtpunkte: number;
  kategorien: {
    grammatik: WritingKategorie;
    wortschatz: WritingKategorie;
    kohaerenz: WritingKategorie;
    register: WritingKategorie;
  };
  korrekturen: WritingKorrektur[];
  staerken: string[];
  verbesserungen: string[];
}

export interface LeseverstehenFrage {
  nr: number;
  type: 'mc' | 'rfn' | 'satz_insert';
  frage?: string;
  aussage?: string;
  kontext?: string;
  luecke?: string;
  optionen?: string[];
  antwort: string;
  erklaerung: string;
}

export interface LeseverstehenExercise {
  examType: 'goethe' | 'telc' | 'testdaf' | 'dsh';
  topic: string;
  text: string;
  fragen: LeseverstehenFrage[];
}

export interface HochschuleKategorie {
  punkte: number;
  maxpunkte: number;
  feedback: string;
}

export interface HochschuleFeedback {
  pruefung: 'TestDaF' | 'DSH';
  note: string;
  gesamtpunkte: number;
  maxpunkte: number;
  kategorien: Record<string, HochschuleKategorie>;
  korrekturen: WritingKorrektur[];
  staerken: string[];
  verbesserungen: string[];
}

export interface ExercisesResponse {
  data: GapFillExercise[];
  total: number;
  page: number;
  pages: number;
}

export interface TagesSchreibenKategorie {
  punkte: number;
  feedback: string;
}

export interface TagesSchreibenFeedback {
  gesamtpunkte: number;
  niveau: string;
  kategorien: Record<string, TagesSchreibenKategorie>;
  korrekturen: WritingKorrektur[];
  verbesserungen: string[];
}

export interface TagesSchreibenArgumantasyon {
  modus: 'argumantasyon';
  thema: string;
  leitfrage: string;
  aufgabe: string;
  hinweis: string;
}

export interface TagesSchreibenZusammenfassung {
  modus: 'zusammenfassung';
  thema: string;
  text: string;
  aufgabe: string;
  wortanzahl_ziel: number;
}

export type TagesSchreibenPrompt = TagesSchreibenArgumantasyon | TagesSchreibenZusammenfassung;

export interface MuendlichKategorie {
  punkte: number;
  feedback: string;
}

export type SessionType = 'schreibtrainer' | 'muendlich' | 'hochschul' | 'tagesschreiben' | 'leseverstehen' | 'grammar';

export interface CreateSessionDto {
  type: SessionType;
  subtype?: string;
  score: number;
  rawScore?: number;
  maxScore?: number;
  note?: string;
}

export interface ExerciseSession extends CreateSessionDto {
  _id: string;
  userId: string;
  date: string;
  createdAt: string;
}

export interface SessionByType {
  _id: { type: string; subtype?: string };
  avgScore: number;
  count: number;
  lastScore: number;
  lastNote?: string;
}

export interface SessionStats {
  recent: ExerciseSession[];
  byType: SessionByType[];
}

export interface MuendlichFeedback {
  niveau: string;
  gesamtpunkte: number;
  kategorien: Record<string, MuendlichKategorie>;
  impulskarten_behandelt: string[];
  impulskarten_fehlend: string[];
  verbesserungen: string[];
  musterformulierungen: string[];
}
