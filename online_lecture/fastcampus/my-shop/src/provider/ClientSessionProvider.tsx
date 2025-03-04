"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type ClientSessionProviderProps = {
  children: ReactNode;
};

export default function ClientSessionProvider({
  children,
}: ClientSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
