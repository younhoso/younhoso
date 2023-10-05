import Signin from "@/components/Signin";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";

type Props = {
  searchParams: {
    callbackUrl: string
  }
};

export default async function SignPage({searchParams: {callbackUrl}} : Props) {
  const session = await getServerSession(authOptions);

  if(session){
    return { redirect: { destination: "/" } };
  }

  const providers = (await getProviders()) ?? {};
  
  return (
    <section className="flex justify-center mt-[30%]">
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'}/>
    </section>
  )
} 