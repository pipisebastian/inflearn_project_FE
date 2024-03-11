export interface Answer {
  text: string;
  correct: boolean;
}

export interface Quiz {
  question: string;
  answers: Answer[];
}

export interface QuizSet {
  level: number;
  quizs: Quiz[];
}

export type AnswerState = "NONE" | "CORRECT" | "WRONG";
