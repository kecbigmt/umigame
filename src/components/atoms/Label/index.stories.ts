import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'マイクで話す',
    color: 'onPrimary.base',
    size: 'md',
    weight: 'regular',
    font: 'primary',
  },
};

export const Secondary: Story = {
    args: {
      children: 'Q.',
      color: 'onPrimary.base',
      size: 'md',
      weight: 'bold',
      font: 'secondary',
    },
  };
  