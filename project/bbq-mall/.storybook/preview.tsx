import type { Decorator, Preview } from '@storybook/react';
import React from 'react';

import localFont from 'next/font/local';

import { ThemeProvider } from 'styled-components';

import { theme } from '../src/provider/CustomThemeProvider';
import { InitGlobalStyled } from '../src/styles/init';

const _pretendard = localFont({
  src: [
    {
      path: '../fonts/Pretendard-Black.woff2',
      weight: '900',
    },
    {
      path: '../fonts/Pretendard-ExtraBold.woff2',
      weight: '800',
    },
    {
      path: '../fonts/Pretendard-Bold.woff2',
      weight: '700',
    },
    {
      path: '../fonts/Pretendard-SemiBold.woff2',
      weight: '600',
    },
    {
      path: '../fonts/Pretendard-Medium.woff2',
      weight: '500',
    },
    {
      path: '../fonts/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../fonts/Pretendard-Light.woff2',
      weight: '300',
    },
    {
      path: '../fonts/Pretendard-ExtraLight.woff2',
      weight: '200',
    },
    {
      path: '../fonts/Pretendard-Thin.woff2',
      weight: '100',
    },
  ],
  preload: true,
  display: 'swap',
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators: Decorator[] = [
  Story => (
    <div className={_pretendard.className}>
      <ThemeProvider theme={theme}>
        <InitGlobalStyled />
        <Story />
      </ThemeProvider>
    </div>
  ),
];

export default preview;
