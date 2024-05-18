"use client";

import { ReactNode } from "react";

import { DefaultTheme, ThemeProvider } from "styled-components";

import StyledComponentsRegistry from "@/libs/registry";
import { InitGlobalStyled } from "@/styles/init";
import { colors, fontSizes, fontWeight } from "@/styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof colors;
    fontWeight: typeof fontWeight;
    fontSizes: typeof fontSizes;
  }
}

export const theme: DefaultTheme = {
  colors,
  fontWeight,
  fontSizes,
};

export default function CustomThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <InitGlobalStyled />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
