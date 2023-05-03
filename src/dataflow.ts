import { atom, selector } from 'recoil';
import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

import { ChatHistory, Quiz } from './domain';
import { quiz, openAIApiKey } from './env';
import {
  createQuizGameMasterTemplate,
  createQuizGeneratingPrompt,
} from './prompts';

export const quizState = selector({
  key: 'quiz',
  get: async ({ get }) => {
    if (quiz) return quiz;

    const { openAIApiKey, modelName, language } = get(llmSettingState);

    const prompt = createQuizGeneratingPrompt(language);

    const llm = new OpenAI({ openAIApiKey, modelName, temperature: 1.0 });
    return llm.call(prompt).then((res) => JSON.parse(res) as Quiz);
  },
});

export type LLMSettingState = {
  language: string;
  openAIApiKey?: string;
  modelName: string;
};

export const llmSettingState = atom<LLMSettingState>({
  key: 'llmSetting',
  default: {
    language: 'Japanese',
    openAIApiKey: openAIApiKey ?? undefined,
    modelName: 'gpt-3.5-turbo',
  },
});

export type ChatHistoryState = ChatHistory;

export const chatHistoryState = atom<ChatHistoryState>({
  key: 'chatHistory',
  default: [],
});

export const latestChatHistoryState = selector({
  key: 'latestChatHistory',
  get: async ({ get }) => {
    const chatHistory = get(chatHistoryState);
    const latestMessage = chatHistory.slice(-1)[0];
    if (latestMessage.owner === 'bot') return chatHistory;

    const quiz = get(quizState);
    const { openAIApiKey, modelName } = get(llmSettingState);

    const template = createQuizGameMasterTemplate(quiz);

    const llm = new OpenAI({ openAIApiKey, modelName, temperature: 0 });
    const chain = new LLMChain({
      llm,
      prompt: new PromptTemplate({
        template,
        inputVariables: ['history', 'input'],
      }),
      outputKey: 'response',
    });

    const history = chatHistory
      .slice(0, -1)
      .map(({ owner, text }) => `${owner === 'user' ? 'Human' : 'AI'}: ${text}`)
      .join('\n');

    const res = await chain.call({ history, input: latestMessage.text });

    const responseMessage = res['response'];
    if (typeof responseMessage !== 'string')
      throw new Error('Invalid response from OpenAI API');

    return [...chatHistory, { owner: 'bot', text: responseMessage }];
  },
});
