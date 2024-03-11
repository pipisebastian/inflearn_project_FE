"use client";

import { useState } from "react";
import { QuizCard } from "../../components/QuizCard";
import { mathQuiz } from "../../mocks/quiz";
import { Quiz } from "../../type";

const State = () => {
  const [level, setLevel] = useState(1);
  const filteredQuiz = mathQuiz.filter((quiz) => quiz.level === level)[0].quizs;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <span className="title">LEVEL</span>
        <div className="radio-wrap">
          <input
            type="radio"
            id="level-1"
            checked={level === 1}
            onClick={() => setLevel(1)}
          />
          <label htmlFor="level-1">easy</label>
          <input
            type="radio"
            id="level-2"
            checked={level === 2}
            onClick={() => setLevel(2)}
          />
          <label htmlFor="level-2">hard</label>
        </div>
      </div>

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

export default State;
