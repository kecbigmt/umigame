export type ChatMessageID = string;

export type ChatMessageOwner = 'user' | 'bot';

export type ChatMessage = {
    owner: ChatMessageOwner;
    body: string;
}

export type ChatHistory = ChatMessage[];
