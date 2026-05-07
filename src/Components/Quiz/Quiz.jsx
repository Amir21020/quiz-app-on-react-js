import { useQuiz } from '../../hooks/useQuiz';
import './Quiz.css';

export default function Quiz() {
  const { question, index, score, selected, isFinished, handleAnswer, nextQuestion, reset, total, isEmpty } = useQuiz();

  if (isEmpty) {
    return (
      <div className="container">
        <p className="message">Нет доступных вопросов</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="result">
        <h2 className="result-title">Результат: {score} из {total}</h2>
        <button type="button" className="nav-btn" onClick={reset}>Начать заново</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="question">{index + 1}. {question.question}</h2>
      <div className="options">
        {question.options.map((opt, i) => {
          let className = 'option';
          if (selected !== null) {
            className += i === question.correct ? ' correct' : '';
            if (selected === i && i !== question.correct) className += ' wrong';
          }
          return (
            <button
              key={i}
              type="button"
              className={className}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <button type="button" className="nav-btn" disabled={selected === null} onClick={nextQuestion}>
        {index === total - 1 ? 'Завершить' : 'Далее'}
      </button>
    </div>
  );
}