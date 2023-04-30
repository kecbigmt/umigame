import type { Meta, StoryObj } from '@storybook/react';

import { ChatBubble } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Molecules/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Secondary: Story = {
  args: {
    children:
      'ぼくは学校から帰る途中たびたびカムパネルラのうちにはアルコールランプで走る汽車があったらしいのでした。',
    color: 'secondary',
    position: 'right',
  },
};

export const Tertiary: Story = {
  args: {
    children:
      'ぼくは学校から帰る途中たびたびカムパネルラのうちにはアルコールランプで走る汽車があったらしいのでした。',
    color: 'tertiary',
    position: 'left',
  },
};

export const Surface: Story = {
  args: {
    children:
      'ぼくは学校から帰る途中たびたびカムパネルラのうちにはアルコールランプで走る汽車があったらしいのでした。',
    color: 'surface',
    position: 'left',
  },
};
