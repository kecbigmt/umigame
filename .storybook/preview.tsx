import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';

import { darkTheme } from '../src/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators: Decorator[] = [
  (Story) => (
    <ThemeProvider theme={darkTheme}>
      <Story  />
    </ThemeProvider>
  ),
]

export default preview;
