import { FC } from 'react';

import { useRouter } from 'next/router';

import { Box, Flex, Icon, Space, Text } from '@/components/atoms';
import {
  FONTSIZE_11,
  FONTSIZE_12,
  FONTSIZE_13,
  FONTSIZE_15,
  FONTSIZE_16,
  PLANCK,
} from '@/constants';

import { QuickOrderPageTemplateProps } from '../../../QuickOrderPageTemplate';
import QuickOrderItemCard from '../../components/QuickOrderItemCard';

const Body: FC<QuickOrderPageTemplateProps> = ({
  quickOrders,
  selectedQuickOrderId,
  setSelectedQuickOrderId,
  refetch,
}) => {
  const router = useRouter();

  return (
    <Box border={'#dddddd'} background={'#F8F9FA'} padding={PLANCK * 3}>
      <Flex.RSC full layout="auto 1 auto">
        <Text color={'#666666'} size={FONTSIZE_11}>
          ⚠ 리스트 중 택일하여 주문하시기 바랍니다.
        </Text>
        <div></div>
        <Box
          border={'#b1b6cb'}
          background={'#F8F9FA'}
          shape={'round'}
          padding={`${PLANCK}px ${PLANCK * 1.5}px`}
          onClick={() => router.push('/mypage/orders')}
        >
          <Flex.RCC>
            <Icon src={'delivery-bike.svg'} size={20} />
            <Space.V1 />
            <Text size={FONTSIZE_12} color={'#302d46'}>
              퀵오더 등록
            </Text>
          </Flex.RCC>
        </Box>
      </Flex.RSC>
      <Space.H3 />
      <Flex.CSS full gap={PLANCK * 4}>
        {quickOrders.map((quickOrder, index) => {
          const checked = selectedQuickOrderId === quickOrder.id;
          const handleCheckClick = () => {
            if (checked) {
              setSelectedQuickOrderId(undefined);
            } else {
              setSelectedQuickOrderId(quickOrder.id);
            }
          };
          return (
            <QuickOrderItemCard
              key={index}
              quickorder={quickOrder}
              handleCheckClick={handleCheckClick}
              checked={checked}
              refetch={refetch}
            />
          );
        })}
      </Flex.CSS>
    </Box>
  );
};

export default Body;
