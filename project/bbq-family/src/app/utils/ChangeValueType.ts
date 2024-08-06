import { MenuSaleType, MenuType } from '../api/menu/route';

export const returnWeekType = (weekType: string) => {
  switch (weekType) {
    case 'FIRST_WEEK':
      return '첫째주';
    case 'SECOND_WEEK':
      return '둘째주';
    case 'THIRD_WEEK':
      return '셋째주';
    case 'FOURTH_WEEK':
      return '넷째주';
    case 'EVERY_WEEK':
      return '매주';
    default:
      return '';
  }
};

export const returnDayOfWeek = (dayOfWeek: string) => {
  switch (dayOfWeek) {
    case 'MONDAY':
      return '월요일';
    case 'TUESDAY':
      return '화요일';
    case 'WEDNESDAY':
      return '수요일';
    case 'THURSDAY':
      return '목요일';
    case 'FRIDAY':
      return '금요일';
    case 'SATURDAY':
      return '토요일';
    case 'SUNDAY':
      return '일요일';
    default:
      return '';
  }
};

export const returnMenuSaleTypeColor = (menuSaleType: MenuSaleType) => {
  switch (menuSaleType) {
    case 'AVAILABLE':
      return '#3ABA65';
    case 'SOLD_OUT':
      return '#E52143';
    case 'HIDDEN':
      return '#666666';
  }
};

export const returnMenuSaleType = (menuSaleType: MenuSaleType) => {
  switch (menuSaleType) {
    case 'AVAILABLE':
      return '판매중';
    case 'SOLD_OUT':
      return '품절';
    case 'HIDDEN':
      return '숨김';
  }
};
export const returnMenuType = (menuType: MenuType) => {
  switch (menuType) {
    case 'MAIN':
      return '일반메뉴';
    case 'SIDE':
      return '사이드';
    case 'ALCOHOL':
      return '음료/주류';
  }
};
