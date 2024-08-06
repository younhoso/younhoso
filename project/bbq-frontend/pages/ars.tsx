'use server';

import Lottie from 'lottie-react';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

import { NextPageContext } from 'next';

import styled from 'styled-components';

import { chibbackIcon } from '@/constant/chibbackIcon';

export default function Ars({
  phoneNumber,
  hashedPhoneNumber,
}: {
  phoneNumber: string;
  hashedPhoneNumber: string;
}) {
  useEffect(() => {
    sessionStorage.setItem('ars', 'true');
    signIn('ars', { phoneNumber, hashedPhoneNumber, callbackUrl: '/' });
  }, []);
  return (
    <LoadingMobileStyled>
      <Lottie animationData={chibbackIcon} loop autoplay />
    </LoadingMobileStyled>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { p: phoneNumber, h: hashedPhoneNumber } = context.query;

  if (!phoneNumber || !hashedPhoneNumber) {
    return { rdeirect: '/' };
  }

  return { props: { phoneNumber, hashedPhoneNumber } };
}
export const LoadingMobileStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 90px;
  margin: 0 auto;
`;
