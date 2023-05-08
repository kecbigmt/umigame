import { atom, atomFamily, selector } from "recoil";

import { ChatMessage, ChatMessageID, ChatMessageOwner } from "../domain";

export type ChatMessagePointer = { owner: ChatMessageOwner; id: ChatMessageID };

export const chatMessageIDArrayState = atom<ChatMessageID[]>({
  key: 'chat/chatMessageIDArray',
  default: [],
});

export const chatMessageState = atomFamily<ChatMessage, ChatMessageID>({
  key: 'chat/chatMessage',
});

export const chatHistoryState = selector<ChatMessage[]>({
  key: 'chat/chatHistory',
  get: ({ get }) => {
    const ids = get(chatMessageIDArrayState);
    return ids.map((id) => get(chatMessageState(id)));
  },
});
