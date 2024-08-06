import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { OrderAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { MyPageOrderPageTemplate } from '@/components/templates';
import { Order } from '@/types';
import { parseApiError } from '@/utils';

export default function OrderDetailPage() {
  const router = useRouter();
  const [order, setOrder] = useState<Order | undefined | null>(undefined);

  useEffect(() => {
    const { id: _orderId } = router.query;
    const orderId = Number(_orderId);
    if (!orderId || isNaN(orderId)) return;

    OrderAPI.get({ id: orderId })
      .then(res => {
        setOrder(res);
      })
      .catch(err => {
        console.error(err);
        alert(parseApiError(err).message);
      });
  }, [router.isReady, router.query]);

  if (!order) return null;

  return (
    <>
      <Desktop>
        <MyPageOrderPageTemplate order={order} />
      </Desktop>
      <Mobile>
        <MyPageOrderPageTemplate.Mobile order={order} />
      </Mobile>
    </>
  );
}
