import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Molecules/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Filled: Story = {
  args: {
    type: 'filled',
    children: 'マイクで話す',
    color: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    type: 'outlined',
    children: 'マイクで話す',
    color: 'onPrimary',
  },
};

export const Text: Story = {
  args: {
    type: 'text',
    children: 'マイクで話す',
    color: 'onPrimary',
  },
};

export const Icon: Story = {
  args: {
    type: 'icon',
    icon: 'micOn',
    color: 'onPrimary',
  },
};