export const detailProductInfoLabel = {
  Price: '가격',
  DeliveryFee: '배송비',
  DeliveryArea: '배송지역',
  ReturnExchange: '반품교환',
  BankTransferNotes: '무통장 입금시 주의사항',
  DeliveryGuide: '배송 안내',
  ReturnExchangeGuide: '반품/교환안내',
  ReturnExchangeAddress: '교환/반품 주소',
} as const;

export type DetailInfoData = {
  defaultType: {
    label: (typeof detailProductInfoLabel)[keyof typeof detailProductInfoLabel];
    value: string;
  }[];
  essentialCertification: { label: string; value: string }[];
  asNotes: {
    label: (typeof detailProductInfoLabel)[keyof typeof detailProductInfoLabel];
    value: string;
  }[];
};

export type TabStatus =
  | 'product_description'
  | 'product_guide'
  | 'product_review_frame'
  | 'product_qna_frame';
