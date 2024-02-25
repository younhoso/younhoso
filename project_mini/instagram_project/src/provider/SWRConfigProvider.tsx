'use client';

import { ReactNode } from "react";
import { SWRConfig } from "swr";

export default function SWRConfigProvider({ children }: { children: ReactNode }) {
  return <SWRConfig
    value={{
      fetcher: (url : string) => fetch(url).then(res => res.json())
    }}
    >{children}</SWRConfig>;
}