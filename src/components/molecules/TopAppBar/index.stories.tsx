import type { Meta, StoryObj } from '@storybook/react';

import { TopAppBar } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Molecules/TopAppBar',
  component: TopAppBar,
  tags: ['autodocs'],
} satisfies Meta<typeof TopAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Full: Story = {
  args: {
    title: 'タイトル',
    color: 'surface',
    leadingNavigation: {
      icon: 'chevronLeft',
      onClick: () => {},
    },
    trailingAction: {
      icon: 'menu',
      onClick: () => {},
    },
  },
};

export const NoTitle: Story = {
  args: {
    color: 'surface',
    leadingNavigation: {
      icon: 'chevronLeft',
      onClick: () => {},
    },
    trailingAction: {
      icon: 'menu',
      onClick: () => {},
    },
  },
};

export const NoLeadingNavigation: Story = {
  args: {
    title: 'タイトル',
    color: 'surface',
    trailingAction: {
      icon: 'menu',
      onClick: () => {},
    },
  },
};

export const NoTrailingAction: Story = {
  args: {
    title: 'タイトル',
    color: 'surface',
    leadingNavigation: {
      icon: 'chevronLeft',
      onClick: () => {},
    },
  },
};

