import type { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atoms/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const OnPrimaryBase: Story = {
  args: {
    children: 'ぼくは学校から帰る途中たびたびカムパネルラのうちにはアルコールランプで走る汽車があったらしいのでした。',
    color: 'onPrimary.base',
    size: 'md',
    weight: 'regular',
  },
};
