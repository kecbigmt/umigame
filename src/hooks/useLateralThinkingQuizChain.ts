import { useEffect, useMemo, useState } from 'react';
import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { BufferMemory } from 'langchain/memory';
import { PromptTemplate } from 'langchain/prompts';

import { Quiz } from '../domain';
import { createQuizGameMasterTemplate, createQuizGeneratingPrompt } from '../prompts';

export const useLateralThinkingQuizChain = (language: string, modelName: string, openAIApiKey: string | undefined, defaultQuiz?: Quiz): {
    chain: LLMChain, 
    quiz: Quiz,
} | undefined => {
    const [quiz, setQuiz] = useState<Quiz | undefined>(defaultQuiz);

    useEffect(() => {
        if (!openAIApiKey) throw new Error('openAIApiKey is undefined');
        if (quiz) return

        const prompt = createQuizGeneratingPrompt(language);

        const llm = new OpenAI({ openAIApiKey, modelName, temperature: 1.0 });
        llm.call(prompt).then((res) => {
            const quiz = JSON.parse(res);
            setQuiz(quiz);
        });

    }, [language, openAIApiKey, modelName]);

    return useMemo(() => {
        if (!openAIApiKey) throw new Error('openAIApiKey is undefined');
        if (!quiz) return undefined;

        const template = createQuizGameMasterTemplate(quiz);

        const llm = new OpenAI({ openAIApiKey, modelName, temperature: 0 });
        const chain = new LLMChain({
            llm,
            prompt: new PromptTemplate({
                template,
                inputVariables: ['history', 'input'],
            }),
            outputKey: 'response',
            memory: new BufferMemory(),
        });
        return { chain, quiz };
    }, [openAIApiKey, modelName, quiz]);
};
