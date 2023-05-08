import React from 'react';
import ReactDOM from 'react-dom/client';
import { MutableSnapshot, RecoilRoot } from 'recoil';

import App from './App.tsx';
import { llmSettingState, quizState } from './dataflow/index.ts';
import { openAIApiKey, quiz } from './env';

const initializeState = ({ set }: MutableSnapshot) => {
  set(llmSettingState, {
    language: 'Japanese',
    modelName: 'gpt-4',
    openAIApiKey,
  });

  if (quiz) set(quizState, quiz);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot initializeState={initializeState}>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
