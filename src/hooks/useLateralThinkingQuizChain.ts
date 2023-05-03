import { useEffect, useMemo, useState } from 'react';

import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { BufferMemory } from 'langchain/memory';
import { PromptTemplate } from 'langchain/prompts';
import { Quiz } from '../domain/quiz';

export const useLateralThinkingQuizChain = (language: string, modelName: string, openAIApiKey: string | undefined): {
    chain: LLMChain, 
    quiz: Quiz,
} | undefined => {
    const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);

    useEffect(() => {
        if (!openAIApiKey) throw new Error('openAIApiKey is undefined');
        if (quiz) return

        const prompt = `You are a quiz generating AI. Create questions for the Horizontal Thinking quiz.

# Output format
Output only one JSON object that satisfies the following Quiz type. Do not output anything else.

type Quiz = {
    title: string;
    mystery: string;
    truth: string;
    core: string
}

- \`title\`: The title of the question.
- \`mystery\`: The body of the question. Start with a puzzling story, and end with "Why?"
- \`truth\`: The truth of the story. It should answer the question "Why?".
- \`core\`: The heart of the truth. If the player can guess it, he or she is correct. Extract only the important parts of the truth.

# Output sample

{
  "title": "TITLE",
  "mystery": "MYSTERY",
  "truth": "TRUTH",
  "core": "core"
}

# Constraints
- JSON object should be
- JSON object values must be output in ${language}.
- Use narrative tricks to make the reader think of a different scene from the truth.
- The mystery must include physically impossible phenomena or actions that cannot be understood by common sense.
- The content of the mystery must be consistent with the truth.
- The truth should be unexpected and not immediately predictable by the player who reads the mystery. However, the truth should not include any physically impossible phenomena or words or actions that cannot be understood by common sense.
- Make sure that anyone who reads the mystery and the truth together will be able to understand it

# Output Results
`;

        const llm = new OpenAI({ openAIApiKey, modelName, temperature: 0 });
        llm.call(prompt).then((res) => {
            const quiz = JSON.parse(res);
            setQuiz(quiz);
        });

    }, [language, openAIApiKey, modelName]);

    return useMemo(() => {
        if (!openAIApiKey) throw new Error('openAIApiKey is undefined');
        if (!quiz) return undefined;

        const template = `You are the AI of the friendly game master who asks the human players lateral thinking quizzes.

# Quiz content
- Title: ${quiz.title}
- Mystery: ${quiz.mystery}
- Truth: ${quiz.truth}

[IMPORTANT]
The human knows only the title and the mystery.
The truth are only known to you. DO NOT TELL THE HUMAN UNTIL THE GAME IS OVER.

# Rules
- Humans will ask you Yes/No questions. You answer as much as you can infer from the story or the truth. If you cannot guess, answer that you do not know.
- Each time they ask you a question, you must strictly judge whether they are saying the exact same thing as the "${quiz.core}" that is the core of the truth of the mystery. If they are only saying part of the core, unfortunately, it is incorrect.
- If they correctly point out the core, the game is over. Instead of answering the question, congratulate them on having solved the quiz and explain to them more about the truth of it.

# Constraints
- Speak the same language as the human. If you do not know what language the humans uses, speak in the language used in the quiz title, mystery, and truth text.
- You can only answer Yes/No questions. Refuse to answer questions that cannot be answered with Yes/No.
- You will be provided with a history of conversations between you and the human for reference, but when you judge whether their question is correct or not, base your decision on only the most recent question from them, not on that history.
- DO NOT TELL THE HUMAN THE TRUTH UNTIL THE GAME IS OVER.

# Conversation history
{history}

# Human's question
{input}

# Your answer`;

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
