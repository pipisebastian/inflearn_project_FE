import { QuizSet } from "../type";

export const mathQuiz: QuizSet[] = [
  {
    level: 1,
    quizs: [
      {
        question: "2 + 2",
        answers: [
          { text: "1", correct: false },
          { text: "2", correct: false },
          { text: "3", correct: false },
          { text: "4", correct: true },
        ],
      },
      {
        question: "10 + 10",
        answers: [
          { text: "0", correct: false },
          { text: "5", correct: false },
          { text: "20", correct: true },
          { text: "40", correct: false },
        ],
      },
      {
        question: "4 * 4",
        answers: [
          { text: "2", correct: false },
          { text: "64", correct: false },
          { text: "16", correct: true },
          { text: "8", correct: false },
        ],
      },
    ],
  },
  {
    level: 2,
    quizs: [
      {
        question: "2 ^ 10",
        answers: [
          { text: "1024", correct: true },
          { text: "256", correct: false },
          { text: "512", correct: false },
          { text: "128", correct: false },
        ],
      },
      {
        question: "2 ^ 0",
        answers: [
          { text: "0", correct: false },
          { text: "1", correct: true },
          { text: "-1", correct: false },
          { text: "2", correct: false },
        ],
      },
      {
        question: "125361 + 1261",
        answers: [
          { text: "126121", correct: false },
          { text: "126212", correct: false },
          { text: "126332", correct: false },
          { text: "126622", correct: true },
        ],
      },
    ],
  },
];
