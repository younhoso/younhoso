'use client';

import { ReactNode } from 'react';

import Script from 'next/script';

import NCPPayService from '@/libs/NCPPay';
import { getCachedSession } from '@/libs/customNextAuth';

export default function OrderLayout({ children }: { children: ReactNode }) {
  const NCPPay = new NCPPayService();
  return (
    <>
      {children}
      <Script
        src="https://shop-api.e-ncp.com/payments/ncp_pay.js"
        onLoad={async () => {
          const session = await getCachedSession();

          NCPPay.setConfiguration({
            clientId: process.env.NEXT_PUBLIC_SHOPBY_CLIENT_ID,
            confirmUrl: `${process.env.NEXT_PUBLIC_KCP_CONFIRM_URL}/pc/order`,
            platform: 'PC',
            accessToken: session?.shopByToken ?? '',
          });
        }}
      />
      <Script src={process.env.NEXT_PUBLIC_KCP_PAYMENT_URL} />
    </>
  );
}
