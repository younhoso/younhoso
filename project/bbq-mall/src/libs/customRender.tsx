import { render } from '@testing-library/react';

import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/provider/CustomThemeProvider';
import { InitGlobalStyled } from '@/styles/init';

import { pretendard } from './fonts';

const Wrapper = ({ children }: any) => (
  <div className={pretendard.className}>
    <ThemeProvider theme={theme}>
      <InitGlobalStyled />
      {children}
    </ThemeProvider>
  </div>
);

export const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
