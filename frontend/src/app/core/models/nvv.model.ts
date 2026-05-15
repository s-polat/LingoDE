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
  id: string;
  type: 'tr_to_de' | 'verb_completion';
  question: string;
  hint: string;
  options: string[];
  answer: string;
  example_tr: string;
  category: string;
}
