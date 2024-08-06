'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import { DebouncedFunc } from 'lodash';

import plusRed from '@/assets/images/cart/plus-red.svg';
import npayBuy from '@/assets/images/components/npay-buy.svg';
import npay from '@/assets/images/components/npay.png';
import Button from '@/components/Button';
import CartProduct from '@/components/CartProduct';
import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import Checkbox from '@/components/Checkbox';
import Loading from '@/components/Loading';
import OrderPriceInfo from '@/components/OrderPriceInfo';
import ProductCard from '@/components/ProductCard';
import { CartPrice, SectionDetail } from '@/types';

import { CartPageDivideStyled } from './styled';

export interface CartPageDivideProps {
  className?: string;
  isCartLoading: boolean | undefined;
  indeterminate: boolean;
  checkAll: boolean;
  onClickCheckAll: () => void;
  onChangeCheckbox: (value: unknown) => void;
  checkedList: unknown[];
  cartLength: number;
  data: AxiosResponse<SectionDetail, any> | undefined;
  onClickDelete: (list: number[], noLengthWord: string, confirmWord: string) => void;
  cartList: CartProductData[];
  modifyCart: DebouncedFunc<(e: number, i: number) => Promise<void>>;
  price: CartPrice | undefined;
  onClickOrder: () => void;
  orderLoading: boolean | undefined;
  visiblePay?: boolean;
  onClickNaverPay?: () => void;
}

const description = [
  '쿠폰/포인트는 주문서에서 사용 가능합니다.',
  '[주문완료] 상태일 경우에만 주문 취소 가능합니다.',
  '[주문내역 > 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.',
  '쿠폰, 적립금 사용 금액을 제외한 실 결제 금액 기준으로 최종 산정됩니다.',
];

const CartPageDivide = ({
  className,
  indeterminate,
  checkAll,
  onClickCheckAll,
  onChangeCheckbox,
  checkedList,
  cartLength,
  data,
  onClickDelete,
  cartList,
  modifyCart,
  price,
  onClickOrder,
  isCartLoading,
  orderLoading,
  visiblePay,
  onClickNaverPay,
}: CartPageDivideProps) => {
  const router = useRouter();
  return (
    <CartPageDivideStyled className={clsx('CartPageDivide', className)}>
      <h2>장바구니</h2>
      <div className="cart-order">
        <div className="cart-product">
          <div className="cart-product-info">
            <div className="cart-product-info-left">
              <Checkbox
                indeterminate={indeterminate}
                checked={checkAll}
                onChange={onClickCheckAll}
                label={`전체선택(${checkedList.length}/${cartLength})`}
              />
            </div>
            <div className="cart-product-info-right">
              <div
                onClick={async () => {
                  const soldOutList: number[] = cartList.reduce((acc: number[], cur) => {
                    if (!cur.validInfo.valid) {
                      acc.push(cur.cartNo);
                    }

                    return acc;
                  }, []);

                  onClickDelete(
                    soldOutList,
                    '품절된 상품이 없습니다.',
                    '품절 상품을\n삭제하시겠습니까?',
                  );
                }}
              >
                품절삭제
              </div>
              <div
                onClick={() => {
                  onClickDelete(
                    checkedList as number[],
                    '선택된 상품이 없습니다.',
                    '선택 상품을\n삭제하시겠습니까?',
                  );
                }}
              >
                선택삭제
              </div>
            </div>
          </div>

          <div
            className={clsx(
              'cart-product-content',
              !isCartLoading && !cartLength && 'empty',
              isCartLoading && 'loading',
            )}
          >
            {isCartLoading ? (
              <Loading height="440px" />
            ) : !cartLength ? (
              <div>장바구니에 담긴 상품이 없습니다.</div>
            ) : (
              <div>
                {cartList.map((v, i) => (
                  <CartProduct
                    key={v.value}
                    data={v}
                    onChangeCheckbox={() => onChangeCheckbox(v.value)}
                    checked={checkedList.includes(v.value)}
                    onClickDelete={() => {
                      onClickDelete(
                        [v.value],
                        '선택된 상품이 없습니다.',
                        '선택 상품을\n삭제하시겠습니까?',
                      );
                    }}
                    onChangeCartCount={e => modifyCart(e, i)}
                  />
                ))}
              </div>
            )}
          </div>

          <Button onClick={() => router.push('/')}>
            <Image src={plusRed} width={24} height={24} alt="go-shopping" />
            <div>{cartLength ? '더 담으러 가기' : '쇼핑하러 가기'}</div>
          </Button>
        </div>
        <div className="cart-brief">
          <div className="cart-brief-receipt">
            <OrderPriceInfo
              price={price}
              discountItemList={[
                ...((!!price?.discountAmt && [
                  {
                    label: '상품할인금액',
                    value: price?.discountAmt,
                  },
                ]) ||
                  []),
              ]}
            />
          </div>
          <Button
            disabled={!checkedList.length || orderLoading}
            isLoading={orderLoading}
            className="cart-brief-order"
            onClick={onClickOrder}
            styleType="main"
          >
            주문하기
          </Button>
          {visiblePay && (
            <Button
              disabled={!checkedList.length || orderLoading}
              className="cart-brief-npay"
              onClick={onClickNaverPay}
            >
              <Image src={npay} width={70} height={28} alt="npay" />
              <Image src={npayBuy} width={37} height={20} alt="buy" />
            </Button>
          )}
          <div className="cart-brief-description">
            {description.map(v => (
              <div key={v}>
                <div>ㆍ</div>
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>

      {!!data?.data.products.length && (
        <div className="cart-recommend">
          <h3>이 상품은 어때요?</h3>
          <div className="sub-title">다른 고객이 같이 구매한 상품이에요.</div>
          <div className="cart-recomment-product-wrapper">
            {data.data.products.map(v => (
              <ProductCard item={v} key={v.productNo} size="243px" showLike={false} />
            ))}
          </div>
        </div>
      )}
    </CartPageDivideStyled>
  );
};

export default CartPageDivide;
