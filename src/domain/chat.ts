export type ChatMessage = {
    owner: 'user' | 'bot'; // TODO: add 'friend' when multiple users are supported
    text: string;
};

export type ChatHistory = ChatMessage[];
