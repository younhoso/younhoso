import { ArrayElement } from '@/types/arrayElement';

export const DEPOSIT_WAIT_CNT = 'depositWaitCnt';
export const PAY_DONE_CNT = 'payDoneCnt';
export const PRODUCT_PREPARE_CNT = 'productPrepareCnt';
export const DELIVERY_ING_CNT = 'deliveryIngCnt';
export const DELIVERY_DONE_CNT = 'deliveryDoneCnt';
export const CANCEL_DONE_CNT = 'cancelDoneCnt';
export const RETURN_DONE_CNT = 'returnDoneCnt';
export const EXCHANGE_DONE_CNT = 'exchangeDoneCnt';
export const BUY_CONFIRM_CNT = 'buyConfirmCnt';

export const orderHistoryToKor = {
  [DEPOSIT_WAIT_CNT]: '주문접수',
  [PAY_DONE_CNT]: '결제완료',
  [PRODUCT_PREPARE_CNT]: '상품준비중',
  [DELIVERY_ING_CNT]: '배송중',
  [DELIVERY_DONE_CNT]: '배송완료',
  [BUY_CONFIRM_CNT]: '구매확정',
  [CANCEL_DONE_CNT]: '취소',
  [EXCHANGE_DONE_CNT]: '교환',
  [RETURN_DONE_CNT]: '반품',
} as Record<string, string>;

export const ORDER_HISTORY = '주문내역';
export const CANCEL_HISTORY = '취소/교환/반품';

export const HISTORY_LIST = [ORDER_HISTORY, CANCEL_HISTORY] as const;

export type HistoryListElement = ArrayElement<typeof HISTORY_LIST>;

export const orderHistoryItems: Record<HistoryListElement, string[]> = {
  [ORDER_HISTORY]: [
    DEPOSIT_WAIT_CNT,
    PAY_DONE_CNT,
    PRODUCT_PREPARE_CNT,
    DELIVERY_ING_CNT,
    DELIVERY_DONE_CNT,
    BUY_CONFIRM_CNT,
  ],
  [CANCEL_HISTORY]: [CANCEL_DONE_CNT, EXCHANGE_DONE_CNT, RETURN_DONE_CNT],
};

export const orderHistoryString: Record<HistoryListElement, string[]> = {
  [ORDER_HISTORY]: [
    'DEPOSIT_WAIT',
    'PAY_DONE',
    'PRODUCT_PREPARE',
    'DELIVERY_ING',
    'DELIVERY_DONE',
    'DELIVERY_PREPARE',
    'BUY_CONFIRM',
  ],
  [CANCEL_HISTORY]: [
    'CANCEL_DONE',
    'EXCHANGE_DONE',
    'RETURN_DONE',
    'CANCEL_PROCESSING',
    'RETURN_PROCESSING',
    'EXCHANGE_WAITING',
    'EXCHANGE_PROCESSING',
  ],
};
