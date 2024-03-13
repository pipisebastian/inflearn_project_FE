const wrapper = document.getElementById("wrapper");
const answerContainer = document.getElementById("answer-container");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");

let questionIndex = 0;

const startGame = () => {
  const container = document.getElementById("container");

  container.classList.remove("hide");
  startButton.classList.add("hide");

  nextQuestion();
};

const nextQuestion = () => {
  wrapper.classList.remove("correct");
  wrapper.classList.remove("wrong");

  nextButton.classList.add("hide");

  // 질문 업데이트
  const questionTitle = document.getElementById("question-title");
  questionTitle.innerText = questions[questionIndex].question;

  // 존재하는 버튼을 모두 제거
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }

  // 선택 버튼 생성
  questions[questionIndex].answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerText = answer.text;

    answer.correct ? (button.dataset.correct = answer.correct) : null;

    button.addEventListener("click", selectButton);
    answerContainer.appendChild(button);
  });
};

const selectButton = (e) => {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  // 정답 여부에 따라 wrapper 색상 변경
  correct ? wrapper.classList.add("correct") : wrapper.classList.add("wrong");

  // 정답 여부에 따라 버튼 색상 변경
  Array.from(answerContainer.children).forEach((button) => {
    button.dataset.correct
      ? button.classList.add("correct")
      : button.classList.add("wrong");
  });

  const isLastQuestion = questions.length <= questionIndex + 1;

  if (isLastQuestion) {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  } else {
    nextButton.classList.remove("hide");
  }
};

startButton.addEventListener("click", () => {
  questionIndex = 0;
  startGame();
});

nextButton.addEventListener("click", () => {
  questionIndex++;
  nextQuestion();
});

const questions = [
  {
    question: "2 + 2 =",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
    ],
  },
  {
    question: "10 + 10 =",
    answers: [
      { text: "0", correct: false },
      { text: "5", correct: false },
      { text: "20", correct: true },
      { text: "40", correct: false },
    ],
  },
  {
    question: "2 ^ 4 =",
    answers: [
      { text: "2", correct: false },
      { text: "64", correct: false },
      { text: "16", correct: true },
      { text: "8", correct: false },
    ],
  },
];
