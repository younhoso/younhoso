import { FC } from 'react';

import { useRouter } from 'next/router';

import { Box, Flex, Icon, Space, Text } from '@/components/atoms';
import { FONTSIZE_15, FONTSIZE_16, PLANCK } from '@/constants';

import { QuickOrderPageTemplateProps } from '../../QuickOrderPageTemplate';
import QuickOrderItemCard from '../../components/QuickOrderItemCard';

const Body: FC<QuickOrderPageTemplateProps> = ({
  quickOrders,
  selectedQuickOrderId,
  setSelectedQuickOrderId,
  refetch,
}) => {
  const router = useRouter();

  return (
    <Box border={'#dddddd'} background={'#F8F9FA'} padding={PLANCK * 5}>
      <Flex.RSC full layout="auto 1 auto">
        <Text color={'#666666'} size={FONTSIZE_15}>
          ⚠ 리스트 중 택일하여 주문하시기 바랍니다.
        </Text>
        <div></div>
        <Box
          border={'#b1b6cb'}
          background={'#F8F9FA'}
          shape={'round'}
          padding={`${PLANCK}px ${PLANCK * 3}px`}
          onClick={() => router.push('/mypage/orders')}
        >
          <Flex.RCC>
            <Icon src={'delivery-bike.svg'} size={28} />
            <Space.V1_5 />
            <Text size={FONTSIZE_16} color={'#302d46'}>
              퀵오더 등록
            </Text>
          </Flex.RCC>
        </Box>
      </Flex.RSC>
      <Space.H4 />
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
      <Space.H4 />
    </Box>
  );
};

export default Body;
