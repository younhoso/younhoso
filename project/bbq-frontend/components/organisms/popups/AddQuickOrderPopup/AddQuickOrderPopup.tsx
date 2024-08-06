import { useCallback, useEffect, useRef, useState } from 'react';

import { OrderAPI } from '@/apis';
import { Box, Divider, Flex, Grid, Image, Input, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { COLOR_RED, FONTSIZE_14, FONTSIZE_20, FONTSIZE_26, PLANCK } from '@/constants';
import { Order } from '@/types';
import { parseApiError } from '@/utils';

export const AddQuickOrderPopup = ({ order }: { order: Order }) => {
  const { closeModal } = useModal();
  const footerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState<number>(0);

  const [title, setTitle] = useState<string>('');

  const handleSubmitButtonClick = useCallback(async () => {
    if (!title || !title.trim().length) return;
    try {
      await OrderAPI.QuickOrder.add({
        orderHistoryId: order.id,
        quickOrderTitle: title,
      });
      alert('추가했습니다.');
      closeModal();
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }
  }, [title]);

  useEffect(() => {
    if (footerRef.current) {
      const { height } = (footerRef.current as any).getBoundingClientRect();
      setFooterHeight(height);
    }
  }, [footerRef]);

  return (
    <div>
      <Text>퀵오더명</Text>
      <Space.H2 />
      <Input
        placeholder={'퀵오더 이름 입력 (예: 나의불금세트)'}
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
      />
      <Space.H4 />
      <div style={{ height: 320, overflowY: 'scroll' }}>
        <Grid columnCount={1} gap={PLANCK * 2}>
          {order.orderMenuList.map((menu, index) => {
            return (
              <Box border="lightgray" key={index}>
                <Flex.RSC layout="90px auto auto 1" full>
                  <Image
                    src={menu.menuImageUrl}
                    backgroundPosition={'center'}
                    backgroundSize={'cover'}
                  />
                  <Divider.V1 stretched />
                  <Space.V2 />
                  <div>
                    <Text>{menu.menuName}</Text>
                    <Space.H0_5 />
                    <Text size={FONTSIZE_14} color={'#777777'} lineHeight={'1.4em'}>
                      {`수량 ${menu.quantity ?? 1}개 / 옵션 `}
                      {menu.orderSubOptionList?.length
                        ? menu.orderSubOptionList
                            .map(option => {
                              return option.orderSubOptionItemList
                                .map(sub => sub.subOptionItemName)
                                .join(', ');
                            })
                            .join(', ')
                        : '없음'}
                    </Text>
                    <Space.H3 />
                    <Text size={FONTSIZE_14}>
                      {menu.menuAndSubOptionAndQuantityPrice.toLocaleString()}원
                    </Text>
                  </div>
                </Flex.RSC>
              </Box>
            );
          })}
        </Grid>
      </div>
      <div style={{ height: footerHeight - PLANCK * 4 }}></div>
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }} ref={footerRef}>
        <Divider.H1 />
        <Box padding={PLANCK * 4}>
          <Flex.RBE>
            <Text>Total {(order.orderMenuList.length ?? 0).toLocaleString()}</Text>
            <Flex.RSE>
              <Text size={FONTSIZE_20}>총</Text>
              <Space.V1 />
              <Text size={FONTSIZE_26}>
                {order.orderMenuList
                  .reduce<number>((total, menu) => {
                    return total + menu.menuAndSubOptionAndQuantityPrice;
                  }, 0)
                  .toLocaleString()}
              </Text>
              <Text size={FONTSIZE_20}>원</Text>
            </Flex.RSE>
          </Flex.RBE>
        </Box>
        <Divider.H1 />
        <Box padding={PLANCK * 4}>
          <Text size={FONTSIZE_14} lineHeight={'1.3em'}>
            ⚠ 퀵오더 제품 가격은 포인트사용, 각종할인 등이 적용되지 않은 정가로 저장됩니다.
          </Text>
          <Space.H2 />
          <Button
            disabled={!title || !title.trim().length}
            full={true}
            color={'primary'}
            shape={'round'}
            text="확인"
            onClick={handleSubmitButtonClick}
          />
        </Box>
      </div>
    </div>
  );
};
