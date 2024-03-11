"use client";

import { useState } from "react";
import { QuizCard } from "../../../components/QuizCard";
import { mathQuiz } from "../../../mocks/quiz";
import { Quiz } from "../../../type";
import { usePathname } from "next/navigation";
import { Button } from "../../../components/Button";

const State = () => {
  const pathname = usePathname();
  const level = parseInt(pathname?.split("/quiz/")[1] || "1");
  const selectedAnswerArray = [0, 0, 0, 0];

  const [correctCount, setCorrectCount] = useState(0);
  const [isQuizEnd, setIsQuizEnd] = useState(false);

  const filteredQuiz = mathQuiz.filter((quiz) => quiz.level === level)[0].quizs;
  const correctAnswer = filteredQuiz.map((quiz) =>
    quiz.answers.findIndex((answer) => answer.correct)
  );

  const handelSelectAnswer = (selectedIndex: number, index: number) => {
    selectedAnswerArray[index] = selectedIndex;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {filteredQuiz.map((quiz: Quiz, index) => {
        return (
          <QuizCard
            question={quiz.question}
            answers={quiz.answers}
            isQuiz
            handelSelectAnswer={(selectedIndex) =>
              handelSelectAnswer(selectedIndex, index)
            }
          />
        );
      })}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {isQuizEnd && (
          <div
            className="title"
            style={{
              padding: "4px 16px",
              borderRadius: "12px",
              backgroundColor: "#10bca820",
            }}
          >
            맞춘 갯수는 {correctCount}개 입니다.
          </div>
        )}
        <Button
          name="제출하기"
          onClick={() => {
            let count = 0;
            for (let i = 0; i < 4; i++) {
              if (selectedAnswerArray[i] === correctAnswer[i]) {
                count++;
              }
            }
            setCorrectCount(count);
            setIsQuizEnd(true);
          }}
        />
        {isQuizEnd && <Button name="다시하기" href="/quiz" />}
      </div>
    </div>
  );
};

export default State;
