export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface GrammarExample {
  sentence: string;
  translation: string;
}

export interface GrammarTable {
  headers: string[];
  rows: string[][];
}

export interface GrammarSection {
  title: string;
  explanation: string;
  table?: GrammarTable;
  examples: GrammarExample[];
  tip?: string;
}

export interface GrammarLesson {
  id: string;
  title: string;
  level: CefrLevel;
  category: string;
  description: string;
  sections: GrammarSection[];
  exercises?: GrammarExercise[];
}

export interface GrammarExercise {
  question: string;
  options?: string[];
  answer: string;
  explanation?: string;
}
