// src/components/templates/QuizLayout.jsx
import "./QuizLayout.css";

const QuizLayout = ({
  children,
  quizTitle,
  questionCount,
  currentQuestion,
  score,
  onExit,
}) => {
  const progress =
    questionCount > 0 ? ((currentQuestion + 1) / questionCount) * 100 : 0;

  return (
    <div className="quiz-layout">
      <div className="quiz-header-panel">
        <button className="quiz-back-button" onClick={onExit}>
          ← Back
        </button>
        <h1>{quizTitle}</h1>
        <div className="quiz-stats">
          <span>
            Question {currentQuestion + 1}/{questionCount}
          </span>
          <span>Score: {score}</span>
          <span>Progress: {Math.round(progress)}%</span>
        </div>
      </div>
      <div className="quiz-content">{children}</div>
    </div>
  );
};

export default QuizLayout;
