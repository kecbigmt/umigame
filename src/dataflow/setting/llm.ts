import { atom } from 'recoil';

export type LLMSettingState = {
  language: string;
  openAIApiKey?: string;
  modelName: string;
};

export const llmSettingState = atom<LLMSettingState>({
  key: 'setting/llm',
});
