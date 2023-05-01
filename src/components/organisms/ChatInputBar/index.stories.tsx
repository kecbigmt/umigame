import type { Meta, StoryObj } from '@storybook/react';

import { ChatInputBar } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Organisms/ChatInputBar',
  component: ChatInputBar,
  tags: ['autodocs'],
} satisfies Meta<typeof ChatInputBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
    args: {
      onSubmitMessage: () => {},
    },
  };


