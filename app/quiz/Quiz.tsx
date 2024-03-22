"use client";

import StatisticsCard from "@/components/StatisticsCard";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
interface Props {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];

  userId: string | undefined;
}

function Quiz({ questions, userId }: Props) {
  const [activeQuestions, setActiveQuestions] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState("");
  const [checked, setChecked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);

  const { answers, correctAnswer, question } = questions[activeQuestions];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, timeRemaining]);

  const computedResult = Math.round((results.score / 50) * 100);

  const startTimer = () => {
    setTimerRunning(true);
  };
  const stopTimer = () => {
    setTimerRunning(false);
  };
  const resetTimer = () => {
    setTimeRemaining(30);
  };

  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    nextQuestion();
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    resetTimer(); // Reset the timer whenever the active question changes
  }, [activeQuestions]);

  const onAnswerSelected = (answer: string, questionIndex: number) => {
    setChecked(true);
    setSelectedAnswerIndex(questionIndex);

    if (answer === correctAnswer) {
      setSelectedAnswers(answer);
    } else {
      setSelectedAnswers("");
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResults((previousResults: any) => {
      return selectedAnswers
        ? {
            ...previousResults,
            score: previousResults.score + 5,
            correctAnswers: previousResults.correctAnswers + 1,
          }
        : {
            ...previousResults,
            wrongAnswers: previousResults.wrongAnswers + 1,
          };
    });

    if (activeQuestions !== questions.length - 1) {
      setActiveQuestions((previousQuestion) => previousQuestion + 1);
    } else {
      setShowResults(true);
      stopTimer();
      fetch("/api/quizResult ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network is down!!");
          }
          return response.json();
        })
        .then((data) => {
          console.log("result saved successfully!!");
          data;
        })
        .catch((error) => {
          console.log(`error, quiz not saved due to:`, error);
        });
    }

    setChecked(false);
    startTimer();
    // resetTimer();
  };

  return (
    <div className="m-h-[500px] px-2 ">
      <div className="max-w-full mx-auto w-full flex justify-center py-10 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <div className="">
                <div className="flex bg-secondary text-white px-4 rounded-md py-1">
                  <h2 className="">Question: {activeQuestions + 1}</h2>
                  <span>/{questions.length}</span>
                </div>
              </div>
              <div className="bg-secondary text-white px-4 rounded-md py-1">
                {timeRemaining} seconds to answer.
              </div>
            </div>
            <div className="">
              <h3 className="mb-5 text-2xl font-bold">{question}</h3>
            </div>

            {timeRemaining < 1 &&
              toast.error("oops time up and answer not saved!")}

            <ul className=" border-b border-slate-400">
              {answers.map((answer: string, index: number) => {
                return (
                  <li
                    key={index}
                    className={`py-4 border-t border-slate-400  hover:text-blue-600 cursor-pointer ${
                      selectedAnswerIndex === index &&
                      "bg-secondary text-primary animate-pulse"
                    }`}
                    onClick={() => {
                      onAnswerSelected(answer, index);
                    }}>
                    <span>({String.fromCharCode(65 + index)}). </span>
                    {answer}
                  </li>
                );
              })}
            </ul>

            <button
              disabled={!checked}
              onClick={() => {
                toast.success(
                  `${
                    activeQuestions + 1 === 9
                      ? " Thanks for taking this quiz, see you next time."
                      : `You have answered ${
                          activeQuestions + 1
                        } successfully, Next!`
                  }`
                );

                nextQuestion();
                resetTimer();
              }}
              className={` disabled:bg-red-600 flex w-fit justify-center rounded-md items-center text-white font-bold mt-6 bg-secondary py-2 px-4 ${
                !checked && "cursor-not-allowed"
              }`}>
              {activeQuestions === questions.length - 1
                ? "Complete Quiz"
                : "Next Question"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl uppercase mb-10"> Your Quiz Results</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatisticsCard title="Percentage" value={`${computedResult}%`} />

              <StatisticsCard
                title="Total Questions"
                value={questions.length}
              />

              <StatisticsCard title="Total Score" value={results.score} />

              <StatisticsCard
                title="Correct Answers"
                value={results.correctAnswers}
              />

              <StatisticsCard
                title="Wrong Answers"
                value={results.wrongAnswers}
              />
            </div>

            {
              <button
                className="bg-yellow-500 hover:animate-pulse hover:bg-yellow-800 py-2 px-4 rounded-md text-primary  mt-12"
                onClick={() => {
                  window.location.reload();
                }}>
                Start All Over
              </button>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
