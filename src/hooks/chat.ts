import { useRecoilValue } from "recoil";

import { ChatMessageID } from "../domain";
import { chatMessageIDArrayState, chatMessageState } from "../dataflow";

export const useChatMessageIDArray = () => {
  return useRecoilValue(chatMessageIDArrayState);
};

export const useChatMessage = (id: ChatMessageID) => {
  return useRecoilValue(chatMessageState(id));
};
