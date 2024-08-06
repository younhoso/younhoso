import { AdminListCondition } from '../admin/page';
import { ContentEventListCondition } from '../content/event/page';
import { ContentNoticeListCondition } from '../content/notice/page';
import { CouponListCondition } from '../coupon/list/page';
import { MenuListCondition } from '../coupon/mobile-coupon/page';
import { MallListPageCondition } from '../mall/list/page';
import { OrderListCondition } from '../order/list/page';

export const createExcelDownloadUrl = <
  T extends
    | AdminListCondition
    | ContentEventListCondition
    | ContentNoticeListCondition
    | CouponListCondition
    | MallListPageCondition
    | MenuListCondition
    | OrderListCondition,
>(
  selectedValue: T,
  initSelectedParams: (selectedValue: T) => { params: any },
) => {
  const result = initSelectedParams(selectedValue);
  if (!result) return;

  const queryString = Object.entries(result.params)
    .map(([key, value]) => {
      if (!value) return;
      if (Array.isArray(value) && value.length === 0) {
        return `${encodeURIComponent(key)}=`;
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .filter(query => query !== '')
    .join('&');

  return queryString;
};
