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
  type: 'mc' | 'rfn';
  frage?: string;
  aussage?: string;
  optionen?: string[];
  antwort: string;
  erklaerung: string;
}

export interface LeseverstehenExercise {
  examType: 'goethe' | 'testdaf' | 'dsh';
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
