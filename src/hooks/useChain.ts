import { useMemo } from 'react';

import { ConversationChain } from 'langchain/chains';
import { OpenAI } from 'langchain';

export const useChain = (openAIApiKey: string | undefined) => {
    return useMemo(() => {
        if (!openAIApiKey) throw new Error('openAIApiKey is undefined');
        
        const llm = new OpenAI({ openAIApiKey });
        return new ConversationChain({ llm });
    }, [openAIApiKey]);
};
