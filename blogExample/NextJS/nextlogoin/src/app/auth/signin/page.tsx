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
  // callbackUrl은 로그인 후 사용자가 리디렉션될 URL을 지정 callbackUrl 됩니다. 기본값은 로그인이 시작되는 페이지 URL입니다.
  const session = await getServerSession(authOptions);

  if(session){
    return { redirect: { destination: "/" } };
  }

  const providers = (await getProviders()) ?? {};

  return (
    <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
  )
} 