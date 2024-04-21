import type { ReactNode } from "react";
import { gmarket } from "../libs/fonts";
import type { Metadata, Viewport } from "next";
import CustomThemeProvider from "@/provider/CustomThemeProvider";
import SWRConfigProvider from "@/provider/SWRConfigProvider";

const metaTitle = "OMT Labs";

export const metadata: Metadata = {
  title: {
    template: metaTitle + " | %s",
    default: metaTitle,
  },
  description: "OMT Labs",
  icons: {
    icon: [{ url: "/favicon.ico", rel: "shortcut icon" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "naver-site-verification": "3d3e995da88e72e6",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={gmarket.className}>
        <CustomThemeProvider>
          <SWRConfigProvider>{children}</SWRConfigProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
