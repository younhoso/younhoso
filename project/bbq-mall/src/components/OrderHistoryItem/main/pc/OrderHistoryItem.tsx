'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import dayjs from 'dayjs';

import Button from '@/components/Button';
import { OrderHistoryOption } from '@/types/orderHistoryRelated';

import { OrderHistoryItemStyled } from './styled';

export interface OrderHistoryItemProps {
  className?: string;
  data: OrderHistoryOption;
  detailLabel?: string;
}

const OrderHistoryItem = ({
  className,
  data,
  detailLabel = '주문내역 상세',
}: OrderHistoryItemProps) => {
  const router = useRouter();
  return (
    <OrderHistoryItemStyled
      title={
        <div className="order-history-title">
          <div>주문번호 {data.orderNo}</div>
          <div>
            <div>
              {dayjs(new Date(data.orderStatusDate.registerYmdt)).format('YYYY.MM.DD HH:mm')}
            </div>
          </div>
        </div>
      }
      className={clsx('OrderHistoryItem', className)}
    >
      <div className="order-history-content">
        <Image width={100} height={100} alt="product-image" src={'https:' + data.imageUrl} />

        <div className="order-history-info">
          <div>
            <div>상품명</div>
            <div>{data.productName}</div>
          </div>

          <div>
            <div>결제금액</div>
            <div>{data.price.standardAmt?.toLocaleString()} 원</div>
          </div>
        </div>

        <div className="order-history-button-wrapper">
          <Button size="micro">{detailLabel}</Button>
        </div>
      </div>
    </OrderHistoryItemStyled>
  );
};

export default OrderHistoryItem;
