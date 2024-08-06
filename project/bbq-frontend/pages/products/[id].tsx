import { getSession, signIn } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { MenuAPI } from '@/apis';
import { Desktop, Mobile } from '@/components/functions';
import { ProductPageTemplate } from '@/components/templates';
import { useSidebarCart } from '@/stores';
import { Menu, MenuCategory, MenuSubOption, MenuSubOptionItem } from '@/types';
import { copyDeep, parseApiError } from '@/utils';

export default function Product() {
  const router = useRouter();
  const { id: menuId } = router.query;
  const { addItem: addItemToSidebarCart, data, changeQuantity } = useSidebarCart();

  const [detail, setDetail] = useState<Menu | undefined>(undefined);
  const [options, setOptions] = useState<MenuSubOption[] | undefined>(undefined);
  const [categories, setCategories] = useState<MenuCategory[] | undefined>(undefined);

  // 선택된 데이터
  const [selectedSubOptionData, setSelectedSubOptionData] = useState<
    { id: number; itemIds: number[] }[]
  >([]);

  // 메뉴ID 바뀌면 선택된 데이터도 초기화
  useEffect(() => {
    // 옵션중에 필수요소가 있다면 기본 선택
    if (options) {
      setSelectedSubOptionData(
        options
          .filter(option => option.requiredSelectCount > 0)
          .reduce<
            {
              id: number;
              itemIds: number[];
            }[]
          >(
            (arr, option) => [
              ...arr,
              {
                id: option.id,
                itemIds: [option.subOptionItemDetailResponseList[0].id],
              },
            ],
            [],
          ),
      );
    }
    // 옵션이 없다면 그냥 스킵
    else {
      setSelectedSubOptionData([]);
    }
  }, [menuId, options]);

  // API 호출
  useEffect(() => {
    if (!menuId) return;

    MenuAPI.get({ id: Number(menuId) })
      .then(res => {
        setDetail(res);
      })
      .catch(err => {
        console.error(err);
      });

    MenuAPI.Option.getList({ menuId: Number(menuId) })
      .then(res => {
        setOptions(res);
      })
      .catch(err => {
        console.error(err);
      });

    MenuAPI.Category.getList({ menuId: Number(menuId) })
      .then(res => {
        setCategories(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, [menuId]);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (!session) {
        await signIn('guest', { redirect: false });
      }
    })();
  }, []);

  // 필수 옵션 선택 여부
  const needRequiredOptionsSelected = useMemo<boolean>(() => {
    if (!options) {
      return false;
    }

    const requiredOptions = options.filter(option => option.requiredSelectCount > 0);

    if (requiredOptions.length) {
      for (let requiredOption of requiredOptions) {
        if (
          !selectedSubOptionData.filter(
            selectedSubOptionDataItem => selectedSubOptionDataItem.id === requiredOption.id,
          ).length
        ) {
          return true;
        }

        if (
          selectedSubOptionData.filter(
            selectedSubOptionDataItem => selectedSubOptionDataItem.id === requiredOption.id,
          )[0]?.itemIds.length < requiredOption.requiredSelectCount
        ) {
          return true;
        }
      }
    }

    return false;
  }, [options, selectedSubOptionData]);

  // 주문서에 추가 버튼 클릭 이벤트
  const handleAddToCartButtonClick = useCallback(async () => {
    if (!detail || !options) return;

    if (needRequiredOptionsSelected) {
      alert('필수 옵션을 선택해주세요.');
      return;
    }

    const newItem = {
      menu: detail,
      options: options,
      selectedOptionItemIds: selectedSubOptionData.reduce<number[]>((arr, item) => {
        return [...arr, ...item.itemIds];
      }, []),
    };

    const existItem = data.items.find(v => {
      const object: any = { ...v };
      delete object.quantity;
      return JSON.stringify(object) === JSON.stringify(newItem);
    });

    try {
      if (existItem) {
        const index = data.items.indexOf(existItem);
        changeQuantity({ index, quantity: existItem.quantity + 1 });
      } else {
        addItemToSidebarCart({ ...newItem, quantity: 1 });
      }
    } catch (error) {
      console.error(error);
      alert(parseApiError(error).message);
    }
  }, [
    detail,
    options,
    needRequiredOptionsSelected,
    selectedSubOptionData,
    menuId,
    addItemToSidebarCart,
  ]);

  // 옵션 아이템 선택
  const selectSubOption = ({ optionId, itemId }: { optionId: number; itemId: number }) => {
    const option = (options ?? []).filter(option => option.id === optionId)[0];
    if (!option) return;

    // 선택데이터 에서 옵션id로 element가 있는지 index찾기
    const foundIndex = selectedSubOptionData.findIndex(data => data.id === optionId);
    // 선택데이터에 존재하면
    if (foundIndex >= 0) {
      const copied = copyDeep<{ id: number; itemIds: number[] }[]>(selectedSubOptionData);
      // 선택된 아이템이면
      if (copied[foundIndex].itemIds.includes(itemId)) {
        // 최소 선태 갯수보다 클때 -> 제거
        if (option.requiredSelectCount < copied[foundIndex].itemIds.length) {
          copied[foundIndex].itemIds = copied[foundIndex].itemIds.filter(id => id !== itemId);
        }
      }
      // 선택된 아이템이 아니면
      else {
        // 최대 선택 갯수보다 작을때 -> 그냥 추가
        if ((option.maxSelectCount ?? 9999) > copied[foundIndex].itemIds.length) {
          copied[foundIndex].itemIds = [...copied[foundIndex].itemIds, itemId];
        }
        // 최대 선택 갯수보다 클때 -> 앞에 1개 제거하고 추가
        else {
          copied[foundIndex].itemIds = [...copied[foundIndex].itemIds.slice(1), itemId];
        }
      }
      setSelectedSubOptionData(copied);
    }
    // 선택데이터에 존재하지 않으면
    else {
      // 신규 추가
      setSelectedSubOptionData([
        ...selectedSubOptionData,
        {
          id: optionId,
          itemIds: [itemId],
        },
      ]);
    }
  };

  if (!detail || !options || !categories) {
    return null;
  }

  const props = {
    menuDetail: detail,
    menuSubOptions: options,
    menuCategories: categories,
    selectedSubOptionData: selectedSubOptionData,
    needRequiredOptionsSelected: needRequiredOptionsSelected,
    onOptionItemClick: (option: MenuSubOption, item: MenuSubOptionItem) => {
      selectSubOption({
        optionId: option.id,
        itemId: item.id,
      });
    },
    handleAddToCartButtonClick: handleAddToCartButtonClick,
  };

  return (
    <>
      <Desktop>
        <ProductPageTemplate {...props} />
      </Desktop>
      <Mobile>
        <ProductPageTemplate.Mobile {...props} />
      </Mobile>
    </>
  );
}
