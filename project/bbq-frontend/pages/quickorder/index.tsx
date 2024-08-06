import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { CartAPI, OrderAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { QuickOrderPageTemplate } from '@/components/templates';
import { useAuth, useQueryParams } from '@/hooks';
import { QuickOrder } from '@/types';
import { parseApiError, serializeCart } from '@/utils';

export default function QuickOrderPage() {
  const router = useRouter();
  const { keepParams } = useQueryParams();
  const { reloadCartCount } = useAuth();

  const [quickOrders, setQuickOrders] = useState<QuickOrder[] | undefined>(undefined);
  const [selectedQuickOrderId, setSelectedQuickOrderId] = useState<number | undefined>(undefined);

  const selectedQuickOrder = useMemo<QuickOrder | undefined>(() => {
    if (!quickOrders) return undefined;
    return quickOrders.find(quickOrder => quickOrder.id === selectedQuickOrderId);
  }, [quickOrders, selectedQuickOrderId]);

  const fetch = useCallback(() => {
    OrderAPI.QuickOrder.getList()
      .then(res => {
        if (res.length) {
          setQuickOrders(res);
        } else {
          router.push('/quickorder/introduction');
        }
      })
      .catch(err => {
        console.error(err);
        alert(parseApiError(err).message);
      });
  }, []);

  const handleCheckoutButtonClick = useCallback(async () => {
    if (!selectedQuickOrder) return;

    try {
      router.push(
        keepParams('/checkout', {
          ...(selectedQuickOrder.mealType
            ? { mealType: selectedQuickOrder.mealType.toLowerCase() }
            : {}),
          ...(selectedQuickOrder.branchId ? { branchId: selectedQuickOrder.branchId } : {}),
          mc: serializeCart(
            selectedQuickOrder.quickOrderDetailList.map(item => {
              return {
                menuId: Number(item.menuId),
                quantity: item.quantity,
                subOptionIds: item.quickOrderSubOptionItemDetailList.map(
                  entity => entity.subOptionItemId,
                ),
              };
            }),
          ),
        }),
      );
      reloadCartCount();
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }
  }, [selectedQuickOrder]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (!quickOrders) return null;

  // SUMMARY
  const summary = selectedQuickOrder
    ? {
        title: selectedQuickOrder.quickOrderTitle,
        body: {
          items: [
            {
              name: '주문 금액',
              value: `${(selectedQuickOrder.totalPrice ?? 0).toLocaleString()}원`,
              highlighted: false,
            },
          ],
        },
        bottom: {
          items: [
            {
              name: '예상 결제 금액',
              value: `${(selectedQuickOrder.totalPrice ?? 0).toLocaleString()}원`,
            },
          ],
        },
        button: {
          title: '바로 결제',
          url: undefined,
          onClick: handleCheckoutButtonClick,
        },
      }
    : undefined;

  const props = {
    quickOrders: quickOrders,
    selectedQuickOrderId: selectedQuickOrderId,
    setSelectedQuickOrderId: setSelectedQuickOrderId,
    summary: summary,
    refetch: fetch,
  };

  return (
    <>
      <Desktop>
        <QuickOrderPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <QuickOrderPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
