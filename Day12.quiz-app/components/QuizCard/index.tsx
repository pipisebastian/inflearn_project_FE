"use client";

import { Button } from "../Button";
import styles from "./QuizCard.module.css";

import { use, useEffect, useState } from "react";
import { AnswerState, Quiz } from "../../type";

export interface QuizCardProps extends Quiz {
  isQuiz: boolean;
  handelSelectAnswer?: (selectedIndex: number) => void;
}

export const QuizCard = ({
  question,
  answers,
  isQuiz = false,
  handelSelectAnswer,
}: QuizCardProps) => {
  const correctAnswer = answers.findIndex((answer) => answer.correct);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [state, setState] = useState<AnswerState>("NONE");

  const handleClickAnswerButton = () => {
    setState(selectedAnswer === correctAnswer ? "CORRECT" : "WRONG");
  };

  useEffect(() => {
    setState("NONE");
    setSelectedAnswer(0);
  }, [question]);

  return (
    <div
      className={`${styles.container} ${
        state === "CORRECT" && styles.containerCorrect
      } ${state === "WRONG" && styles.containerWrong}`}
    >
      <div className={styles.title}>{question} = ?</div>
      <div
        style={{
          display: "flex",
          gap: "32px",
        }}
      >
        {answers.map((answer, index) => {
          return (
            <div className="radio-wrap" key={index}>
              <input
                type="radio"
                checked={selectedAnswer === index}
                onChange={() => {
                  setSelectedAnswer(index);
                  handelSelectAnswer && handelSelectAnswer(index); // Add null check
                }}
              />
              <label
                className={`${
                  // END: ed8c6549bwf9
                  state !== "NONE" && answer.correct && styles.textCorrect
                } ${state !== "NONE" && !answer.correct && styles.textWrong} `}
              >
                {answer.text}
              </label>
            </div>
          );
        })}
      </div>

      {!isQuiz && (
        <div className={styles.end}>
          <Button name="답변 확인" onClick={handleClickAnswerButton} />
        </div>
      )}
    </div>
  );
};
