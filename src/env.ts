import { Quiz } from "./domain";

export const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const loadQuiz = (): Quiz | undefined => {
  const title = import.meta.env.VITE_QUIZ_TITLE;
  const mystery = import.meta.env.VITE_QUIZ_MYSTERY;
  const truth = import.meta.env.VITE_QUIZ_TRUTH;
  const core = import.meta.env.VITE_QUIZ_CORE;

  if (!title || !mystery || !truth || !core) return undefined;

  return { title, mystery, truth, core };
}

export const quiz = loadQuiz();
