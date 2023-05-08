import { atom } from 'recoil';

import { Quiz } from '../domain';

export const quizState = atom<Quiz>({
  key: 'quiz',
});
