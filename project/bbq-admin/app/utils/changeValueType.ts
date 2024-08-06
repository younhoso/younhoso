import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const returnNumberToDate = (number: string) => {
  switch (number) {
    case '7d':
      return '일주일';
    case '1m':
      return '한달';
    case '1y':
      return '1년';
  }
};

export const returnNumberToDateString = (number: string) => {
  switch (number) {
    case '7d':
      return `${dayjs().subtract(7, 'day').format('YYYY-MM-DD(ddd)')} ~ ${dayjs().format('YYYY-MM-DD(dd)')}`;
    case '1m':
      return `${dayjs().subtract(1, 'month').format('YYYY-MM-DD(ddd)')} ~ ${dayjs().format('YYYY-MM-DD(dd)')}`;
    case '1y':
      return `${dayjs().subtract(1, 'year').format('YYYY-MM-DD(ddd)')} ~ ${dayjs().format('YYYY-MM-DD(dd)')}`;
  }
};

export const returnMealType = (value: string) => {
  switch (value) {
    case 'TAKEOUT':
      return '포장';
    case 'DELIVERY':
      return '배달';
    case 'EAT_IN':
      return '매장';
  }
};

export const returnOrderStatus = (value: string, value2?: string) => {
  switch (value) {
    case 'ADMIN_CANCELLED':
      return '관리자 취소';
    case 'PAY_WAITING':
      return '결제 대기';
    case 'PAY_FAILED':
      return '결제 실패';
    case 'PAY_COMPLETED':
      return '결제 완료';
    case 'NOTIFIED':
      return '주문 접수';
    case 'COOKING':
      return '조리중';
    case 'IN_DELIVERY':
      return '배달중';
    case 'COMPLETED':
      if (value2 === 'DELIVERY') {
        return '배달 완료';
      } else if (value2 === 'TAKEOUT') {
        return '포장 완료';
      }
    case 'CANCEL_REQUESTED':
      return '취소 요청';
    case 'CANCEL_CONFIRMED':
      return '취소 완료';
  }
};

export const returnPaymentMethod = (value: string) => {
  switch (value) {
    case 'SG_PAY':
      return 'BBQ페이';
    case 'UB_PAY':
      return '딹페이';
    case 'KAKAO_PAY':
      return '카카오페이';
    case 'NAVER_PAY':
      return '네이버페이';
    case 'TOSS_PAY':
      return '토스';
    case 'PAYCO_PAY':
      return '페이코';
    case 'DANAL_CARD':
      return '신용/체크카드';
    case 'DANAL_PHONE':
      return '휴대전화';
    case 'DANAL_PAYCOIN':
      return '다날 페이코인';
    case 'PAY_LATER_CARD':
      return '만나서 카드 결제';
    case 'PAY_LATER_CASH':
      return '만나서 현금 결제';
    case 'NONE':
      return '결제 금액 없음';
  }
};

export const returnOrderFlow = (value: string) => {
  switch (value) {
    case 'CART':
      return '장바구니 페이지에서 주문';
    case 'DIRECT':
      return '메뉴 페이지에서 바로결제 버튼으로 주문';
    case 'QUICK_ORDER':
      return '퀵오더 페이지에서 주문';
  }
};

export const returnMenuType = (value: string) => {
  switch (value) {
    case 'MAIN':
      return '일반 메뉴';
    case 'SIDE':
      return '사이드';
    case 'ALCOHOL':
      return '음료/주류';
  }
};

export const returnCouponCategory = (value: string) => {
  switch (value) {
    case 'DEFAULT':
      return '일반';
    case 'MEMBERSHIP_GRADE':
      return '멤버십등급';
    case 'NEW_MEMBER_JOINED':
      return '신규가입';
    case 'BIRTH':
      return '생일축하';
    case 'MARKETING_AGREEMENT':
      return '마케팅 동의';
    default:
      return '';
  }
};

export const changeMapData = (city: string): string => {
  switch (city) {
    case 'Busan':
      return 'BUSAN';
    case 'Daegu':
      return 'DAEGU';
    case 'Daejeon':
      return 'DAEJEON';
    case 'Gangwon':
      return 'GANGWON';
    case 'Gwangju':
      return 'GWANGJU';
    case 'Gyeonggi':
      return 'GYEONGGI';
    case 'Incheon':
      return 'INCHEON';
    case 'Jeju':
      return 'JEJU';
    case 'North Chungcheong':
      return 'CHUNGBUK';
    case 'North Gyeongsang':
      return 'GYEONGBUK';
    case 'North Jeolla':
      return 'JEONBUK';
    case 'Sejong':
      return 'SEJONG';
    case 'Seoul':
      return 'SEOUL';
    case 'South Chungcheong':
      return 'CHUNGNAM';
    case 'South Gyeongsang':
      return 'GYEONGNAM';
    case 'South Jeolla':
      return 'JEONNAM';
    case 'Ulsan':
      return 'ULSAN';
    default:
      return '';
  }
};

export const changeCityNameToKorean = (city: string): string => {
  switch (city) {
    case 'BUSAN':
      return '부산';
    case 'DAEGU':
      return '대구';
    case 'DAEJEON':
      return '대전';
    case 'GANGWON':
      return '강원';
    case 'GWANGJU':
      return '광주';
    case 'GYEONGGI':
      return '경기';
    case 'INCHEON':
      return '인천';
    case 'JEJU':
      return '제주';
    case 'CHUNGBUK':
      return '충청북도';
    case 'GYEONGBUK':
      return '경상북도';
    case 'JEONBUK':
      return '전라북도';
    case 'SEJONG':
      return '세종';
    case 'SEOUL':
      return '서울';
    case 'CHUNGNAM':
      return '충청남도';
    case 'GYEONGNAM':
      return '경상남도';
    case 'JEONNAM':
      return '전라남도';
    case 'ULSAN':
      return '울산';
    default:
      return '';
  }
};

export const returnCouponBenefitType = (city: string): string => {
  switch (city) {
    case 'PRODUCT':
      return '메뉴증정';
    case 'FLAT_DISCOUNT':
      return '정액할인';
    case 'RATE_DISCOUNT':
      return '정률할인';
    case 'DELIVERY_FEE':
      return '배달비 할인';
    default:
      return '';
  }
};

export const returnCouponStatus = (status: string): string => {
  switch (status) {
    case 'WAITING':
      return '대기중';
    case 'DOING':
      return '발행중';
    case 'DONE':
      return '발행종료';
    default:
      return '';
  }
};
export const returnPaymentType = (type: string): string => {
  switch (type) {
    case 'TAKEOUT':
      return '포장 주문 할인';
    case 'ECOUPON':
      return 'E-쿠폰';
    case 'POINT':
      return '포인트';
    case 'HPC_POINT':
      return '해피포인트';
    case 'MEMBERSHIP_COUPON_PUBLIC':
      return '멤버십 쿠폰';
    case 'MEMBERSHIP_COUPON_PRIVATE':
      return '멤버십 쿠폰';
    case 'VOUCHER':
      return '지류상품권';
    case 'PRICE_COUPON':
      return '금액권(기프티쇼)';
    case 'REAL_PAYMENT':
      return '실결제';
    default:
      return '';
  }
};
export const returnPointType = (type: string): string => {
  switch (type) {
    case 'BBQ':
      return 'BBQ 포인트 적립';
    case 'BBQ_FIN':
      return 'BBQ 포인트 적립 완료';
    case 'HP':
      return '해피포인트 적립';
    case 'HP_FIN':
      return '해피포인트 적립 완료';
    default:
      return '';
  }
};
export const returnCancelType = (type: string): string => {
  switch (type) {
    case 'AUTO':
      return '자동 취소';
    case 'MEMBER':
      return '고객 취소';
    case 'ADMIN':
      return '관리자 취소';
    case 'FAMILY':
      return '패밀리점 취소';
    default:
      return '';
  }
};

export const returnOrderChannel = (type: string): string => {
  switch (type) {
    case 'MOBILE_APP_ANDROID':
      return '모바일 앱(Android)';
    case 'MOBILE_APP_IOS':
      return '모바일 앱(iOS)';
    case 'MOBILE_WEB':
      return '모바일 웹';
    case 'DESKTOP_WEB':
      return 'PC 웹';
    case 'OTHER':
      return '기타';
    default:
      return '';
  }
};

export const returnEarnPointType = (type: string): string => {
  switch (type) {
    case 'BBQ':
      return 'BBQ 포인트 적립';
    case 'BBQ_FIN':
      return 'BBQ 포인트 적립 완료';
    case 'HPC':
      return '해피포인트 적립';
    case 'HPC_FIN':
      return '해피포인트 적립 완료';
    default:
      return '';
  }
};
export const returnAuthorities = (type: string): string => {
  switch (type) {
    case 'SYSTEM':
      return '시스템 관리';
    case 'CONTENT':
      return '콘텐츠 관리';
    case 'ORDER':
      return '주문 관리';
    case 'FAMILY':
      return '매장 관리';
    case 'MENU':
      return '메뉴 관리';
    case 'COUPON':
      return '쿠폰 관리';
    case 'CUSTOMER':
      return '고객 관리';
    default:
      return '';
  }
};
