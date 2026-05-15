export interface NvvEntry {
  id: number;
  phrase: string;
  noun: string;
  verb: string;
  article: string | null;
  equivalent_verb: string;
  meaning_tr: string;
  example_de: string;
  example_tr: string;
  category: string;
}

export interface NvvExercise {
  id: number;
  phrase: string;
  sentence_with_gap: string;
  options: string[];
  answer: string;
  hint: string;
  meaning_tr: string;
  example_tr: string;
  category: string;
}
