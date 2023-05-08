import { useRecoilCallback } from "recoil";

import { LLMSettingState, llmSettingState } from "../dataflow";

export const useSetLLMSetting = (newSetting: Partial<LLMSettingState>) => {
  return useRecoilCallback(({ set }) => () => {
    set(llmSettingState, (oldValue) => ({ ...oldValue, ...newSetting }));
  }, []);
}
