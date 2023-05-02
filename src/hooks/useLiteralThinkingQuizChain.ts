import { useMemo } from 'react';

import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { BufferMemory } from 'langchain/memory';
import { PromptTemplate } from 'langchain/prompts';
import { Quiz } from '../domain/quiz';

export const useLiteralThinkingQuizChain = (quiz: Quiz, openAIApiKey: string | undefined) => {
    return useMemo(() => {
        if (!openAIApiKey) throw new Error('openAIApiKey is undefined');

        const template = `水平思考ゲームの出題者をやってください。

問題は以下です。ユーザーは解答を知りません。

- title: ${quiz.title}
- question: ${quiz.question}
- answer: ${quiz.answer}
- answerKey: ${quiz.answerKey}

以下が各項目の説明です。
- title: 問題のタイトル。出題する前にユーザーに伝えてください。
- question: 問題文。これをユーザーに出題してください。
- answer: 解答。ユーザーが正解するまでは決して明かさないでください。
- answerKey: 解答のカギ。ユーザーがこれを言い当てられていたら正解です。

ユーザーはあなたにYesまたはNoで答えられる質問をします。Yes/Noで答えられない質問に対する回答は拒否してください。

解答をもとに、YesまたはNoで回答してください。
解答とは関係ない質問には「わからない」と答えてください。
また、ユーザーの質問が問題の解答を言い当てている場合は、ゲームは終了です。私が正解したことを伝え、問題の解説を行なってください。

Current cenversation:
{history}
Human: {input}
AI:`;

        const llm = new OpenAI({ openAIApiKey, modelName: 'gpt-4', temperature: 0 });
        return new LLMChain({
            llm,
            prompt: new PromptTemplate({
                template,
                inputVariables: ['history', 'input'],
            }),
            outputKey: 'response',
            memory: new BufferMemory(),
        });
    }, [openAIApiKey]);
};
