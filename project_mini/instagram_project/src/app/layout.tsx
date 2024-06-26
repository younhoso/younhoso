import { ReactNode } from "react";
import type { Metadata } from "next";
import { pretendard } from "@/libs/fonts";
import Header from "@/components/Header/Header";
import CustomThemeProvider from "@/provider/CustomThemeProvider";
import AuthProvider from "@/provider/AuthProvider";
import SWRConfigProvider from "@/provider/SWRConfigProvider";
import { LayoutPageStyled } from "@/styles/pageStyled/LayoutPageStyled";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Instantgram",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <LayoutPageStyled className={clsx("Layout")}>
        <AuthProvider>
          <CustomThemeProvider>
            <Header />
            <main>
              <SWRConfigProvider>{children}</SWRConfigProvider>
            </main>
          </CustomThemeProvider>
        </AuthProvider>
        <div id="portal" />
      </LayoutPageStyled>
    </html>
  );
}
