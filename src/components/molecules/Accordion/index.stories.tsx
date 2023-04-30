import type { Meta, StoryObj } from '@storybook/react';

import { Accordion } from '.';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TitleIcon: Story = {
    args: {
      titleIcon: 'questionSquareFill',
      preview: 'ぼくは学校から帰る途中たびたびカムパネルラのうちにはアルコールランプで走る汽車があったらしいのでした。',
      children:
          'ぼくは学校から帰る途中たびたびカムパネルラのうちにはアルコールランプで走る汽車があったらしいのでした。',
      color: 'surface',
    },
  };
  
export const TitleLabel: Story = {
    args: {
      titleLabel: '問題',
      preview: 'ぼくは学校から帰る途中たびたびカムパネルラのうちにはアルコールランプで走る汽車があったらしいのでした。',
      children:
          'ぼくは学校から帰る途中たびたびカムパネルラのうちにはアルコールランプで走る汽車があったらしいのでした。',
      color: 'surface',
    },
  };
  


