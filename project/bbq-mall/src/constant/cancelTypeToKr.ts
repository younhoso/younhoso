export const cancelTypeToKr = {
  CHANGE_MIND: '단순변심(색상, 사이즈 등)',
  DEFECTIVE_PRODUCT: '상품불량/파손',
  WRONG_DELIVERY: '배송누락/오배송',
  OUT_OF_STOCK_SYSTEM: '재고부족(품절취소)',
  CANCEL_BEFORE_PAY: '입금전취소',
  WRONG_PRODUCT_DETAIL: '상품상세 정보와 다름',
  DELAY_DELIVERY: '판매자 배송 지연',
  OTHERS_SELLER: '기타(판매자 귀책)',
  OTHERS_BUYER: '기타(구매자 귀책)',
  OUT_OF_STOCK: '상품 품절/재고 없음',
  LATER_INPUT_ORDER: '배송지 미입력 취소',
  LATER_INPUT_ORDER_RECEIVER_CANCEL: '선물거절취소',
} as const;

export type KeyofCancelType = keyof typeof cancelTypeToKr;
