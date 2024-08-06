import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { OrderAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { useModal } from '@/components/molecules';
import { AddQuickOrderPopup } from '@/components/organisms';
import { MyPageOrdersPageTemplate } from '@/components/templates';
import { useAuth, useCookie, useQueryParams } from '@/hooks';
import { MealTypeEnum, Order, Pagination } from '@/types';
import { parseApiError, serializeCart } from '@/utils';

export default function MyPageOrdersPage() {
  const { keepParams } = useQueryParams();
  const router = useRouter();
  const { member } = useAuth();
  const { openModal } = useModal();
  const [data, setData] = useState<Pagination<Order> | undefined>(undefined);
  const [currentPage, setCurrentPageIndex] = useState<number>(1);
  const { setLastSelectedBranchId, setLastSelectedMealType, setLastSelectedPosition } = useCookie();

  // 이벤트 목록 API 함수
  const fetch = useCallback(({ page }: { page: number }) => {
    return new Promise<Pagination<Order>>((resolve, reject) => {
      OrderAPI.getList({ page: page, size: 10 })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }, []);

  // 다시 장바구니에 추가하는 함수
  const addToCart = useCallback(async ({ orderId }: { orderId: number }) => {
    try {
      const order = await OrderAPI.get({ id: orderId });

      setLastSelectedBranchId(order.familyInfo.branchId);
      setLastSelectedMealType(order.mealType as MealTypeEnum);
      // setLastSelectedPosition();

      try {
        router.push(
          keepParams('/checkout', {
            ...(order.mealType ? { mealType: order.mealType.toLowerCase() } : {}),
            ...(order.familyInfo.branchId ? { branchId: order.familyInfo.branchId } : {}),
            mc: serializeCart(
              order.orderMenuList.map(item => {
                return {
                  menuId: Number(item.menuId),
                  quantity: item.quantity,
                  subOptionIds: item.orderSubOptionList.reduce<number[]>((arr, subOption) => {
                    return [
                      ...arr,
                      ...subOption.orderSubOptionItemList.map(item => item.subOptionItemId!),
                    ];
                  }, []),
                };
              }),
            ),
          }),
        );
      } catch (err) {
        console.error(err);
        alert(parseApiError(err).message);
      }
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }
  }, []);

  // 불러오기 실행
  useEffect(() => {
    fetch({ page: currentPage })
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [currentPage]);

  // 재주문 버튼 클릭 이벤트
  const handleOrderAgainButtonClick = useCallback(
    ({ order }: { order: Order }) => {
      if (!confirm('재주문을 진행하시겠습니까?')) return;
      addToCart({ orderId: order.id });
    },
    [addToCart],
  );

  // 퀵오더 등록 버튼 클릭 이벤트
  const handleAddToQuickOrderButtonClick = useCallback(
    ({ order }: { order: Order }) => {
      if (member) {
        openModal({
          title: '퀵오더 등록',
          body: <AddQuickOrderPopup order={order} />,
        });
      } else {
        alert('회원 전용 기능입니다.\n로그인 후 이용해주세요.');
      }
    },
    [member],
  );

  if (!data) return null;

  const props = {
    data: data,
    page: currentPage,
    setPage: setCurrentPageIndex,
    handleOrderAgainButtonClick: handleOrderAgainButtonClick,
    handleAddToQuickOrderButtonClick: handleAddToQuickOrderButtonClick,
  };

  return (
    <>
      <Desktop>
        <MyPageOrdersPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <MyPageOrdersPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
