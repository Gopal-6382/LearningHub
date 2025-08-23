// src/store/useQuizStore.js
import { create } from "zustand";
import { quizQuestions } from "../utils/quiz";

const useQuizStore = create((set, get) => ({
  // ✅ Dynamically build quizzes from quizQuestions so totalQuestions always matches
  quizzes: Object.keys(quizQuestions).reduce((acc, id) => {
    acc[id] = {
      id,
      topicId: id, // or map if topicId differs
      answered: 0,
      totalQuestions: quizQuestions[id].length,
      completed: false,
    };
    return acc;
  }, {}),

  // ✅ Update quiz progress
  updateProgress: (quizId, answeredCount) => {
    const quiz = get().quizzes[quizId];
    if (!quiz) return;

    const completed = answeredCount >= quiz.totalQuestions;

    set((state) => ({
      quizzes: {
        ...state.quizzes,
        [quizId]: {
          ...quiz,
          answered: answeredCount,
          completed,
        },
      },
    }));

    // 🔓 Unlock related topic when quiz is finished
    // if (completed) {
    //   useTopicStore.getState().completeTopic(quiz.topicId);
    // }
  },

  // ✅ Reset a quiz
  resetQuiz: (quizId) => {
    const quiz = get().quizzes[quizId];
    if (!quiz) return;

    set((state) => ({
      quizzes: {
        ...state.quizzes,
        [quizId]: {
          ...quiz,
          answered: 0,
          completed: false,
        },
      },
    }));
  },

  // ✅ Check if quiz is completed
  isCompleted: (quizId) => {
    const quiz = get().quizzes[quizId];
    return quiz ? quiz.completed : false;
  },
}));

export default useQuizStore;
