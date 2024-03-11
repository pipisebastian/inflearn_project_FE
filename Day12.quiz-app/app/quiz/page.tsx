"use client";

import { useState } from "react";
import { QuizCard } from "../../components/QuizCard";
import { mathQuiz } from "../../mocks/quiz";
// import { Quiz } from "../../type";
import { Button } from "../../components/Button";

const Quiz = () => {
  const [level, setLevel] = useState(1);
  const filteredQuiz = mathQuiz.filter((quiz) => quiz.level === level)[0].quizs;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "24px",
        justifyContent: "center",
        backgroundColor: "#10bca820",
        borderRadius: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          flexDirection: "column",
          padding: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
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

        <Button name="시험 시작" href={`/quiz/${level}`} />
      </div>
    </div>
  );
};

export default Quiz;
