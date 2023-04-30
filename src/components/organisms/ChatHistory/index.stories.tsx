import type { Meta, StoryObj } from '@storybook/react';

import { ChatHistory } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Organisms/ChatHistory',
  component: ChatHistory,
  tags: ['autodocs'],
} satisfies Meta<typeof ChatHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
    args: {
      messages: [
        { owner: 'user', text: 'カムパネルラ、また僕たち二人きりになったので、すこししゃくにさわってだまっていました。' },
        { owner: 'bot', text: '一時間で行ってくるよと言いながら、自分もだんだん顔いろがかがやいてきました。' },
        { owner: 'user', text: 'わたしの大事なタダシはいまどんな歌をうたってやすむとき、いつも窓からぼんやり白く見えていたのです。' },
        { owner: 'bot', text: 'この男は、どこか苦しいというふうではきはき談しているのでした。' },
        { owner: 'user', text: 'どこでできるのですか青年は笑いながら言いました。' },
      ],
      botLoading: true,
    },
  };


