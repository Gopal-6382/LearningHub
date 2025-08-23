// src/hooks/useQuiz.js
import { useState, useCallback, useMemo, useEffect } from 'react';
import { quizQuestions } from '../utils';
import useQuizStore from '../store/useQuizStore'; // ✅ Import store

const useQuiz = (quizId = 'atomic-structure-basic') => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeStarted, setTimeStarted] = useState(null);
  const [timeCompleted, setTimeCompleted] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [hintUsed, setHintUsed] = useState(false);

  // Get quiz questions
  const questions = useMemo(() => {
    return quizQuestions[quizId] || quizQuestions['atomic-structure-basic'];
  }, [quizId]);

  const currentQuestion = questions[currentQuestionIndex];

  // Start quiz
  const startQuiz = useCallback(() => {
    setQuizStarted(true);
    setTimeStarted(new Date());
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setAnswers([]);
    setHintUsed(false);

    // ✅ Reset progress in global store
    useQuizStore.getState().resetQuiz(quizId);
  }, [quizId]);

  // Select answer
  const selectAnswer = useCallback((answerIndex) => {
    setSelectedAnswer(answerIndex);
  }, []);

  // Submit answer
  const submitAnswer = useCallback(() => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    setScore(newScore);
    setAnswers(prev => [...prev, {
      questionIndex: currentQuestionIndex,
      selectedAnswer,
      isCorrect,
      hintUsed
    }]);

    setHintUsed(false);

    // ✅ Update global progress in store
    useQuizStore.getState().updateProgress(quizId, currentQuestionIndex + 1);

    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      setTimeCompleted(new Date());
    }
  }, [selectedAnswer, currentQuestion, currentQuestionIndex, score, questions.length, hintUsed, quizId]);

  // Skip question
  const skipQuestion = useCallback(() => {
    setAnswers(prev => [...prev, {
      questionIndex: currentQuestionIndex,
      selectedAnswer: null,
      isCorrect: false,
      skipped: true,
      hintUsed
    }]);

    setHintUsed(false);

    // ✅ Still count skipped questions for progress
    useQuizStore.getState().updateProgress(quizId, currentQuestionIndex + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      setTimeCompleted(new Date());
    }
  }, [currentQuestionIndex, questions.length, hintUsed, quizId]);

  // Use hint
  const useHint = useCallback(() => {
    if (!hintUsed && currentQuestion.hint) {
      setHintUsed(true);
    }
  }, [hintUsed, currentQuestion]);

  // Restart quiz
  const restartQuiz = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  // Calculate quiz statistics
  const quizStats = useMemo(() => {
    if (!timeStarted) return null;

    const timeElapsed = timeCompleted
      ? (timeCompleted - timeStarted) / 1000
      : (new Date() - timeStarted) / 1000;

    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const accuracy = answers.length > 0 ? (correctAnswers / answers.length) * 100 : 0;

    return {
      totalQuestions: questions.length,
      questionsAnswered: answers.length,
      correctAnswers,
      incorrectAnswers: answers.length - correctAnswers,
      skippedQuestions: answers.filter(a => a.skipped).length,
      accuracy: Math.round(accuracy),
      timeElapsed: Math.round(timeElapsed),
      averageTimePerQuestion: answers.length > 0 ? timeElapsed / answers.length : 0
    };
  }, [timeStarted, timeCompleted, answers, questions.length]);

  // Calculate score percentage
  const scorePercentage = useMemo(() => {
    return Math.round((score / questions.length) * 100);
  }, [score, questions.length]);

  // Get performance rating
  const performanceRating = useMemo(() => {
    if (scorePercentage >= 90) return { text: 'Excellent!', emoji: '🎉', color: '#10b981' };
    if (scorePercentage >= 75) return { text: 'Great job!', emoji: '👍', color: '#84cc16' };
    if (scorePercentage >= 60) return { text: 'Good effort!', emoji: '🙂', color: '#f59e0b' };
    return { text: 'Keep practicing!', emoji: '📚', color: '#ef4444' };
  }, [scorePercentage]);

  // Get question progress
  const progress = useMemo(() => {
    return ((currentQuestionIndex + (selectedAnswer !== null ? 0.5 : 0)) / questions.length) * 100;
  }, [currentQuestionIndex, questions.length, selectedAnswer]);

  // Auto-submit after delay if answer selected
  useEffect(() => {
    if (selectedAnswer !== null && !quizCompleted) {
      const timer = setTimeout(submitAnswer, 1500); // Auto-submit after 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, [selectedAnswer, submitAnswer, quizCompleted]);

  return {
    // State
    questions,
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer,
    score,
    quizStarted,
    quizCompleted,
    timeStarted,
    timeCompleted,
    answers,
    hintUsed,

    // Stats
    stats: quizStats,
    scorePercentage,
    performanceRating,
    progress,

    // Actions
    startQuiz,
    selectAnswer,
    submitAnswer,
    skipQuestion,
    useHint,
    restartQuiz,

    // Utilities
    hasNextQuestion: currentQuestionIndex < questions.length - 1,
    hasPreviousQuestion: currentQuestionIndex > 0,
    isLastQuestion: currentQuestionIndex === questions.length - 1,
    totalQuestions: questions.length
  };
};

export default useQuiz;
