'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';
import { DebouncedFunc } from 'lodash';

import chicken from '@/assets/images/cart/chicken.png';
import plusWhite from '@/assets/images/cart/plus-white.svg';
import npayBuy from '@/assets/images/components/npay-buy.svg';
import npay from '@/assets/images/components/npay.png';
import Button from '@/components/Button';
import CartProduct from '@/components/CartProduct';
import { CartProductData } from '@/components/CartProduct/main/pc/CartProduct';
import Checkbox from '@/components/Checkbox';
import Divider from '@/components/Divider';
import Loading from '@/components/Loading';
import OrderPriceInfo from '@/components/OrderPriceInfo';
import ProductCard from '@/components/ProductCard';
import { CartPrice, SectionDetail } from '@/types';

import { CartPageDivideMobileStyled } from './styled';

export interface CartPageDivideMobileProps {
  className?: string;
  isCartLoading: boolean | undefined;
  cartLength: number | undefined;
  recommendItem: SectionDetail | undefined;
  cartList: CartProductData[];
  onChangeCheckbox: (value: unknown) => void;
  checkedList: unknown[];
  indeterminate: boolean;
  checkAll: boolean;
  onClickCheckAll: () => void;
  modifyCart: DebouncedFunc<(e: number, i: number) => Promise<void>>;
  onClickDelete: (list: number[], noLengthWord: string, confirmWord: string) => void;
  price: CartPrice | undefined;
  onClickOrder: () => void;
  orderLoading: boolean | undefined;
  visiblePay?: boolean;
  onClickNaverPay?: () => void;
}

const CartPageDivideMobile = ({
  className,
  isCartLoading,
  cartLength,
  recommendItem,
  cartList,
  checkedList,
  indeterminate,
  checkAll,
  onClickCheckAll,
  onChangeCheckbox,
  modifyCart,
  onClickDelete,
  price,
  onClickOrder,
  orderLoading,
  visiblePay,
  onClickNaverPay,
}: CartPageDivideMobileProps) => {
  const router = useRouter();

  if (isCartLoading) {
    return <Loading.Mobile />;
  }

  return (
    <CartPageDivideMobileStyled className={clsx('CartPageDivideMobile', className)}>
      <Divider.Mobile />
      {cartLength ? (
        <div className="mobile-cart-content">
          <div className="mobile-cart-product">
            <div className="mobile-cart-product-header">
              <div>
                <Checkbox
                  indeterminate={indeterminate}
                  checked={checkAll}
                  onChange={onClickCheckAll}
                />
                전체선택({checkedList.length}/{cartLength})
              </div>
              <div>
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
            <div className="cart-product-mobile-wrapper">
              {cartList.map((v, i) => (
                <CartProduct.Mobile
                  data={v}
                  key={v.value}
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
            <div className="cart-product-button-wrapper">
              <Button styleType="sub" size="small" onClick={() => router.push('/')}>
                <Image src={plusWhite} width={20} height={20} alt="go-shopping" />더 담으러 가기
              </Button>
            </div>
          </div>
          <Divider.Mobile />
          {!!recommendItem?.products.length && (
            <>
              <div className="mobile-cart-recommend">
                <h3>이 상품은 어때요?</h3>
                <p>다른 고객이 같이 구매한 상품이에요.</p>
                <div className="mobile-cart-recommend-products">
                  {recommendItem.products.map(v => (
                    <ProductCard.Mobile key={v.productNo} size="156px" item={v} showLike={false} />
                  ))}
                </div>
              </div>
              <Divider.Mobile />
            </>
          )}

          <OrderPriceInfo.Mobile
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
          <div className="cart-mobile-footer">
            <Button
              disabled={!checkedList.length || orderLoading}
              isLoading={orderLoading}
              onClick={onClickOrder}
              styleType="main"
              size="small"
              className="cart-brief-order"
            >
              <span>{price?.totalAmt.toLocaleString() ?? 0}</span> 원 주문하기
            </Button>
            {visiblePay && (
              <Button
                disabled={!checkedList.length || orderLoading}
                className="cart-brief-npay"
                onClick={onClickNaverPay}
              >
                <Image src={npay} width={50} height={20} alt="npay" />
                <Image src={npayBuy} width={26} height={14} alt="npay" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="no-product">
          <p>장바구니에 담긴 상품이 없습니다.</p>
          <Image src={chicken} width={221} height={132} alt="no-chickent" unoptimized />
          <Button size="small" styleType="main" onClick={() => router.push('/')}>
            쇼핑하러 가기
          </Button>
        </div>
      )}
    </CartPageDivideMobileStyled>
  );
};

export default CartPageDivideMobile;
