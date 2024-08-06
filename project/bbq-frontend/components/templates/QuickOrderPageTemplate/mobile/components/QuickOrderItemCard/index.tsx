import { FC, Fragment, useCallback, useState } from 'react';

import styled from 'styled-components';

import { OrderAPI } from '@/apis';
import { Arrow, Box, Divider, Flex, Icon, Image, RadioBox, Space, Text } from '@/components/atoms';
import { useModal } from '@/components/molecules';
import { FONTSIZE_11, FONTSIZE_12, FONTSIZE_13, FONTSIZE_14, PLANCK } from '@/constants';
import { MealTypeEnum, QuickOrder } from '@/types';
import { parseApiError } from '@/utils';

const QuickOrderItemCard: FC<{
  checked?: boolean;
  handleCheckClick: () => void;
  quickorder: QuickOrder;
  refetch?: () => void;
}> = ({ checked, handleCheckClick, quickorder, refetch }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleDeleteButtonClick = useCallback(async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await OrderAPI.QuickOrder.delete({ id: quickorder.id });
      alert('삭제했습니다.');
    } catch (err) {
      console.error(err);
      alert(parseApiError(err).message);
    }

    refetch && refetch();
  }, [quickorder]);

  return (
    <Box
      full
      shadow="angle"
      background="white"
      border="#cccccc"
      padding={`${PLANCK * 3}px ${PLANCK * 3}px`}
    >
      <Flex.RCC full layout="auto auto auto 1 auto">
        <RadioBox.Mobile
          checked={checked ?? false}
          onClick={handleCheckClick}
          label={quickorder.quickOrderTitle}
        />
        <Space.V2_5 />
        <Box
          shape="9999px"
          border={'#b1b6cb'}
          background="#f9fafb"
          padding={`${PLANCK}px ${PLANCK * 2}px`}
        >
          <Flex.RCC onClick={handleDeleteButtonClick} style={{ cursor: 'pointer' }}>
            <Icon size={10} src={'pencil-black.svg'} />
            <Space.V1 />
            <Text size={FONTSIZE_11} color={'#777777'}>
              삭제
            </Text>
          </Flex.RCC>
        </Box>
        <div></div>
        <CollapseButton onClick={() => setCollapsed(!collapsed)}>
          <CollapseButtonIconWrapper>
            {collapsed ? (
              <Arrow.Up thickness={1.5} size={2.5} />
            ) : (
              <Arrow.Down thickness={1.5} size={2.5} />
            )}
          </CollapseButtonIconWrapper>
        </CollapseButton>
      </Flex.RCC>
      {collapsed ? (
        <>
          <Space.H3 />
          <Divider />
          {quickorder.quickOrderDetailList.map((menu, index) => (
            <Fragment key={index}>
              <Space.H3 />
              <Flex.RSC layout="auto auto 1">
                <Image
                  src={menu.menuImageUrl}
                  backgroundPosition="center"
                  backgroundSize="cover"
                  width={60}
                />
                <Space.V3 />
                <Flex.RSC layout="1 10px auto">
                  <div>
                    <Text size={FONTSIZE_13}>{menu.menuName}</Text>
                    <Space.H1 />
                    <Text size={FONTSIZE_12} color={'#777777'}>{`수량 ${menu.quantity}개ㆍ옵션 ${
                      menu.quickOrderSubOptionItemDetailList.length ?? 0
                    }개`}</Text>
                    <Space.H1_5 />
                    <Text size={FONTSIZE_11} color={'#777777'} lineHeight={'1.3em'}>
                      {menu.quickOrderSubOptionItemDetailList
                        .map(
                          optionItem =>
                            `${optionItem.subOptionItemName}(${(
                              optionItem.addPrice ?? 0
                            ).toLocaleString()}원)`,
                        )
                        .join(', ')}
                    </Text>
                  </div>
                  <div></div>
                  <Text size={FONTSIZE_13} weight={700}>{`${
                    /* TODO: menu의 가격을 곱해야하는데 API에 없음 */
                    (
                      menu.quantity *
                      (menu.menuPrice +
                        menu.quickOrderSubOptionItemDetailList.reduce<number>((total, option) => {
                          return total + (option.addPrice ?? 0);
                        }, 0))
                    ).toLocaleString()
                  }원`}</Text>
                </Flex.RSC>
              </Flex.RSC>
              <Space.H3 />
              <Divider />
            </Fragment>
          ))}
        </>
      ) : null}
      <Space.H4 />
      <Flex.RBE>
        <Text size={FONTSIZE_13} color={'#777'}>
          {`[${
            quickorder.mealType.toUpperCase() === MealTypeEnum.Delivery ? '배달' : '포장'
          }] ${quickorder.quickOrderDetailList[0].menuName}${
            quickorder.quickOrderDetailList.length > 1
              ? ` 외 ${quickorder.quickOrderDetailList.length}건`
              : ''
          }`}
        </Text>
        <Text size={FONTSIZE_14}>{(quickorder.totalPrice ?? 0).toLocaleString()}원</Text>
      </Flex.RBE>
    </Box>
  );
};

const CollapseButton = styled.div`
  cursor: pointer;
  position: relative;
  width: 24px;
  height: 23px;
  border-radius: 7px;
  background-color: #f8f8f9;
  box-shadow:
    inset 0 2px 3px 0 rgba(255, 255, 255, 0.5),
    0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0px 1px 0 rgba(0, 0, 0, 0.25);
`;

const CollapseButtonIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -57.5%);
`;

export default QuickOrderItemCard;
