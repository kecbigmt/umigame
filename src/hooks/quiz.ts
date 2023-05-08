import { useRecoilCallback, useRecoilValue } from "recoil"
import { OpenAI } from "langchain/llms/openai";

import { llmSettingState, quizState } from "../dataflow";
import { createQuizGeneratingPrompt } from "../prompts";
import { Quiz } from "../domain";

export const useGenerateQuiz = () => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const { openAIApiKey, modelName, language } = snapshot.getLoadable(llmSettingState).getValue();

    const llm = new OpenAI({ openAIApiKey, modelName, temperature: 0 });

    const res = await llm.call(createQuizGeneratingPrompt(language));
    const quiz = JSON.parse(res) as Quiz;

    set(quizState, quiz);
  }, []);
};

export const useQuiz = () => {
  return useRecoilValue(quizState);
};
