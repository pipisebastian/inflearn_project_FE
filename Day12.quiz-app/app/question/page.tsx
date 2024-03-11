"use client";

import { QuizCard } from "../../components/QuizCard";
import { mathQuiz } from "../../mocks/quiz";
import { Quiz } from "../../type";

const Quiz = () => {
  const randomLevel = Math.floor(Math.random() * 2) + 1;
  const filteredQuiz = mathQuiz.filter((quiz) => quiz.level === randomLevel)[0]
    .quizs;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {filteredQuiz.map((quiz: Quiz) => {
        return (
          <QuizCard
            question={quiz.question}
            answers={quiz.answers}
            isQuiz={false}
          />
        );
      })}
    </div>
  );
};

export default Quiz;
