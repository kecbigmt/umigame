import { useRecoilCallback } from 'recoil';
import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

import {
  chatHistoryState,
  chatMessageIDArrayState,
  chatMessageState,
} from '../dataflow/chat';
import { ChatMessage, ChatMessageID } from '../domain';
import { llmSettingState, quizState } from '../dataflow';
import { createQuizGameMasterTemplate } from '../prompts';

export const useSubmitMessage = () => {
  const submitMessage = useRecoilCallback(
    ({ snapshot, set }) =>
      (message: string) => {
        const history = snapshot.getLoadable(chatHistoryState).getValue();

        const userMessageID = Math.random()
          .toString(36)
          .slice(-8) as ChatMessageID;
        const botMessageID = Math.random()
          .toString(36)
          .slice(-8) as ChatMessageID;

        const newUserMessage: ChatMessage = { owner: 'user', body: message };
        const newBotMessage: ChatMessage = { owner: 'bot', body: '考え中...' };

        set(chatMessageIDArrayState, (oldValue) => [
          ...oldValue,
          userMessageID,
          botMessageID,
        ]);
        set(chatMessageState(userMessageID), newUserMessage);
        set(chatMessageState(botMessageID), newBotMessage);

        /**
         * Get bot message & set it to state
         */
        const { openAIApiKey, modelName } = snapshot
          .getLoadable(llmSettingState)
          .getValue();
        const quiz = snapshot.getLoadable(quizState).getValue();

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

        chain
          .call({ history, input: message })
          .then((res) => {
            const body = res['response'];
            if (typeof body !== 'string')
              throw new Error('Unexpected response from OpenAI API');

            const newBotMessage: ChatMessage = { owner: 'bot', body };

            set(chatMessageState(botMessageID), newBotMessage);
          })
          .catch(() => {
            const newBotMessage: ChatMessage = {
              owner: 'bot',
              body: 'エラーが発生しました。',
            };
            set(chatMessageState(botMessageID), newBotMessage);
          });
      },
    []
  );

  return submitMessage;
};
