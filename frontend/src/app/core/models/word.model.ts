export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'other';

export interface VerbConjugation {
  präsens: { ich: string; du: string; er: string; wir: string; ihr: string; sie: string };
  präteritum: { ich: string; du: string; er: string; wir: string; ihr: string; sie: string };
  perfekt: string;
  konjunktiv2: string;
  imperativ: { du: string; ihr: string; sie: string };
}

export interface WordMeaning {
  turkish: string;
  example_de: string;
  example_tr: string;
}

export interface Word {
  _id?: string;
  german: string;
  article?: 'der' | 'die' | 'das';
  plural?: string;
  type: WordType;
  level: CefrLevel;
  meanings: WordMeaning[];
  conjugation?: VerbConjugation;
  tags?: string[];
  // SM-2 aralıklı tekrar alanları
  sm2_repetitions: number;
  sm2_interval: number;
  sm2_easiness: number;
  sm2_next_review: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
