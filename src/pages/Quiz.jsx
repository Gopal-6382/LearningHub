import React, { useState } from "react";
import QuizLayout from "../components/templates/QuizLayout";
import Quiz from "../components/molecules/Quiz";
import useQuiz from "../hooks/useQuiz";
import { quizQuestions } from "../utils/quiz";

const QuizPage = ({ onTabChange }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const quiz = useQuiz(selectedQuiz);

  // Quiz selection screen
  if (!quiz.quizStarted) {
    return (
      <QuizLayout
        quizTitle="Choose a Quiz"
        questionCount={0}
        currentQuestion={0}
        score={0}
        onExit={() => onTabChange("intro")}
      >
        <div className="flex flex-col items-center space-y-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Pick Your Challenge 🎯
          </h2>
          <p className="text-gray-600">
            Test your knowledge in different areas of Atomic Science.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {Object.keys(quizQuestions).map((quizId) => (
              <button
                key={quizId}
                onClick={() => {
                  setSelectedQuiz(quizId);
                  quiz.startQuiz(quizId);
                }}
                className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition transform"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {quizId
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </h3>
                <p className="text-sm text-blue-100">
                  {quizQuestions[quizId].length} Questions
                </p>
              </button>
            ))}
          </div>
        </div>
      </QuizLayout>
    );
  }

  // Quiz completed screen
  if (quiz.quizCompleted) {
    const percentage = Math.round((quiz.score / quiz.questions.length) * 100);

    return (
      <QuizLayout
        quizTitle="Quiz Completed!"
        questionCount={quiz.questions.length}
        currentQuestion={quiz.currentQuestionIndex}
        score={quiz.score}
        onExit={() => setSelectedQuiz(null)}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-4xl font-bold text-green-600">🎉 Well Done!</h2>

          {/* Score circle */}
          <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center text-2xl font-bold text-green-600">
            {percentage}%
          </div>

          <p className="text-lg text-gray-700">
            You scored <span className="font-semibold">{quiz.score}</span> out
            of <span className="font-semibold">{quiz.questions.length}</span>
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => quiz.startQuiz(selectedQuiz)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Retry Quiz
            </button>
            <button
              onClick={() => {
                quiz.startQuiz(null); // reset quiz state
                setSelectedQuiz(null); // clear selected quiz
                onTabChange("quiz"); // optionally switch tab
              }}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Back to Quiz List
            </button>
          </div>
        </div>
      </QuizLayout>
    );
  }

  // Quiz in progress
  if (quiz.quizStarted && !quiz.quizCompleted && quiz.currentQuestion) {
    return (
      <QuizLayout
        quizTitle={selectedQuiz
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())}
        questionCount={quiz.questions.length}
        currentQuestion={quiz.currentQuestionIndex}
        score={quiz.score}
        onExit={() => setSelectedQuiz(null)} // quit quiz → go back to list
      >
        <Quiz
          question={quiz.currentQuestion.question}
          options={quiz.currentQuestion.options}
          selectedAnswer={quiz.selectedAnswer}
          onSelect={quiz.selectAnswer}
          onSubmit={quiz.submitAnswer}
          isLast={quiz.currentQuestionIndex === quiz.questions.length - 1}
        />
      </QuizLayout>
    );
  }
  // Fallback if something unexpected happens
  if (!quiz.currentQuestion) {
    return (
      <QuizLayout
        quizTitle="Loading Quiz..."
        questionCount={0}
        currentQuestion={0}
        score={quiz.score}
        onExit={() => setSelectedQuiz(null)}
      >
        <div className="text-center text-gray-600">Preparing your quiz…</div>
      </QuizLayout>
    );
  }
};

export default QuizPage;
