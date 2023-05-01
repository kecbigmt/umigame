import type { Meta, StoryObj } from '@storybook/react';

import { ChatTextArea } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Molecules/ChatTextArea',
  component: ChatTextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ChatTextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    value: 'その職業は',
    onTextChange: () => {},
    onClickClearButton: () => {},
    color: 'primary',
  },
};

