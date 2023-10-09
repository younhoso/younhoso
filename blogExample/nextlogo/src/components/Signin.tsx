'use client';
import { ClientSafeProvider, signIn } from "next-auth/react";
import SnsLogoBtn from "./ul/SnsLogoBtn";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}

export default function Signin({providers, callbackUrl}: Props) {
  
  return (
    <>
      {Object.values(providers).map(({id, name}) => (
        <SnsLogoBtn 
          key={id}
          text={`Sing In width ${name}`}
          onClick={() => signIn(id, {callbackUrl})}
        />
      ))}
    </>
  );
} 