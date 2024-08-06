'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { OrderHistoryItemProps } from '../pc/OrderHistoryItem';
import { OrderHistoryItemMobileStyled } from './styled';

const OrderHistoryItemMobile = ({ className, data }: OrderHistoryItemProps) => {
  const isSingleOption = data.productName === data.optionValue;
  const router = useRouter();

  return (
    <OrderHistoryItemMobileStyled className={clsx('OrderHistoryItemMobile', className)}>
      <div className="order-history-info">
        <Image width={72} height={72} alt="product-image" src={'https:' + data.imageUrl} />

        <div>
          <p
            className="history-product-name"
            onClick={() => router.push(`/categories/detail/${data.productNo}`)}
          >
            {data.productName}
          </p>
          <p className="history-option-name">
            {'선택옵션 : ' + (isSingleOption ? '없음' : data.optionValue)}
          </p>

          <div>
            <div>
              {data.price.buyAmt?.toLocaleString()}원{' '}
              <span>
                {' '}
                | <span>{data.orderCnt} 개</span>
              </span>
            </div>

            <div>{data.orderStatusTypeLabel}</div>
          </div>
        </div>
      </div>
    </OrderHistoryItemMobileStyled>
  );
};

export default OrderHistoryItemMobile;
