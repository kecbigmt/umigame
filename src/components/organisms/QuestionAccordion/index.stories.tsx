import type { Meta, StoryObj } from '@storybook/react';

import { QuestionAccordion } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Organisms/QuestionAccordion',
  component: QuestionAccordion,
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
    args: {
      lines: [
        'カムパネルラ、また僕たち二人きりになったので、すこししゃくにさわってだまっていました。',
        '一時間で行ってくるよと言いながら、自分もだんだん顔いろがかがやいてきました。',
        'わたしの大事なタダシはいまどんな歌をうたってやすむとき、いつも窓からぼんやり白く見えていたのです。',
        'この男は、どこか苦しいというふうではきはき談しているのでした。',
        'どこでできるのですか青年は笑いながら言いました。',
      ],
      color: 'surface',
    },
  };


