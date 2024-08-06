import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { OrderAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { CheckoutCompletePageTemplate } from '@/components/templates';
import { useAuth } from '@/hooks';
import { Order } from '@/types';
import { parseApiError } from '@/utils';

export default function CheckoutCompletePage() {
  const router = useRouter();
  const { reloadCartCount } = useAuth();
  const { id: orderId } = router.query;

  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    if (!router.isReady) return;
    if (!orderId) return;

    OrderAPI.complete({
      orderId: Number(orderId),
    })
      .then(({ orderId }) => {
        OrderAPI.get({ id: orderId })
          .then(order => {
            setOrder(order);
          })
          .catch(err => {
            console.error(err);
            alert(parseApiError(err).message);
            router.push('/mypage/orders');
            reloadCartCount();
          });
      })
      .catch(err => {
        console.error(err);
        const response = parseApiError(err);
        if (response && response.code !== 'ALREADY_PROCESSED') {
          alert(parseApiError(err).message);
          router.push('/mypage/orders');
        }
      });
  }, [orderId, router.isReady]);

  if (!order) {
    return null;
  }

  return (
    <>
      <Desktop>
        <CheckoutCompletePageTemplate />
      </Desktop>

      <Mobile>
        <CheckoutCompletePageTemplate.Mobile />
      </Mobile>
    </>
  );
}
