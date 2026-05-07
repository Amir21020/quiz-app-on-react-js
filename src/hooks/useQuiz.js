import { useState } from 'react';
import { quizData } from '../assets/quizData';

const noop = () => {};

export const useQuiz = () => {
  if (!quizData || quizData.length === 0) {
    return {
      question: null,
      index: 0,
      score: 0,
      selected: null,
      isFinished: false,
      handleAnswer: noop,
      nextQuestion: noop,
      reset: noop,
      total: 0,
      isEmpty: true,
    };
  }

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizData[index];

  const handleAnswer = (optionIndex) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (index < quizData.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsFinished(false);
  };

  return { question, index, score, selected, isFinished, handleAnswer, nextQuestion, reset, total: quizData.length, isEmpty: false };
};