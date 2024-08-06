export const COLOR_BACKGROUND = '#FFFFFF';
export const COLOR_WHITE = '#FFFFFF';
export const COLOR_PRIMARY = '#B92C35';
export const COLOR_SECONDARY = '#F9FAFC';
export const COLOR_DISABLED = '#F9FAFC';
export const COLOR_GRAY = '#777777';
export const COLOR_CONTENT = '#000000';
export const COLOR_BLACK = '#000000';
export const COLOR_DIVIDER = '#DDDDDD';
export const COLOR_BORDER = '#DDDDDD';
export const COLOR_PLACEHOLDER = '#999999';
export const COLOR_FOOTER_BACKGROUND = '#F1F2F6';
export const COLOR_FOOTER_CONTENT = '#324266';
export const COLOR_FOOTER_BORDER = '#DADCE6';
export const COLOR_PRODUCT_CARD_DESCRIPTION = '#777777';
export const COLOR_EVENT_CARD_SUBTITLE = '#777777';
export const COLOR_BOX_BORDER_DEFAULT = '#D8D8D8';
export const COLOR_BOX_BORDER_PRIMARY = '#E5E8EF';
export const COLOR_BOX_BACKGROUND_DEFAULT = '#FFFFFF';
export const COLOR_BOX_BACKGROUND_PRIMARY = '#EFF0F4';
export const COLOR_RED = '#E52143';
export const COLOR_GREEN = '#2CB86B';
export const COLOR_LIGHTGRAY = '#D9D9D9';
export const COLOR_LIGHTGRAY_2 = '#8E93AD';
export const COLOR_DARK_GRAY = '#302d46';

export const FONTSIZE_8 = 8;
export const FONTSIZE_9 = 9;
export const FONTSIZE_10 = 10;
export const FONTSIZE_11 = 11;
export const FONTSIZE_12 = 12;
export const FONTSIZE_13 = 13;
export const FONTSIZE_14 = 14;
export const FONTSIZE_15 = 15;
export const FONTSIZE_16 = 16;
export const FONTSIZE_17 = 17;
export const FONTSIZE_18 = 18;
export const FONTSIZE_19 = 19;
export const FONTSIZE_20 = 20;
export const FONTSIZE_22 = 22;
export const FONTSIZE_24 = 24;
export const FONTSIZE_26 = 26;
export const FONTSIZE_28 = 28;
export const FONTSIZE_30 = 30;
export const FONTSIZE_32 = 32;
export const FONTSIZE_34 = 34;
export const FONTSIZE_36 = 36;

export const PLANCK = 5;
export const TOP_BANNER_HEIGHT = 45;
export const HEADER_HEIGHT = 138;
export const MOBILE_HEADER_HEIGHT = 52;
export const SIDEBAR_WIDTH = 308;
export const MOBILE_SCREEN_MAX_WIDTH = 800; // NOTE: 원래 640이 맞는데 BBQ 사이트가 중간에 깨지는게 있다고 해서 수정함

export const YEARS: number[] = (() => {
  const currentYear = new Date().getFullYear();
  const startYear = 1930;
  const yearArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearArray.push(year);
  }

  return yearArray;
})();

export const MONTHS: number[] = (() => {
  const monthArray = [];

  for (let month = 1; month <= 12; month++) {
    monthArray.push(month);
  }

  return monthArray;
})();

export const DAYS: number[] = (() => {
  const dayArray = [];

  for (let day = 1; day <= 31; day++) {
    dayArray.push(day);
  }

  return dayArray;
})();

export const BBQ_COMPANY_POSITION = {
  LATITUDE: 37.491493,
  LONGITUDE: 127.116024,
};

export const MYPAGES: {
  key: string;
  href: string;
  alternativeHref?: string;
  activeIconUrl: string;
  inactiveIconUrl: string;
  iconSizeRatio?: number;
  text: string;
  guestText?: string;
  memberOnly: boolean;
  guestAlternativeHref?: string;
}[] = [
  {
    key: 'information',
    href: '/mypage',
    activeIconUrl: 'idcard-red.svg',
    inactiveIconUrl: 'idcard-gray.svg',
    text: '내 정보',
    memberOnly: true,
    guestAlternativeHref: '/mypage/orders',
  },
  {
    key: 'order',
    href: '/mypage/orders',
    activeIconUrl: 'document-red.svg',
    inactiveIconUrl: 'document-gray.svg',
    text: '주문 이력 & 퀵오더 등록',
    guestText: '주문 이력 ',
    memberOnly: false,
  },
  {
    key: 'coupon',
    href: '/mypage/coupons/1',
    alternativeHref: '/mypage/coupons',
    activeIconUrl: 'double-ticket-red.svg',
    inactiveIconUrl: 'double-ticket-gray.svg',
    text: '쿠폰북',
    memberOnly: false,
  },
  {
    key: 'point',
    href: '/mypage/points',
    activeIconUrl: 'folded-point-red.svg',
    inactiveIconUrl: 'folded-point-gray.svg',
    text: '나의 포인트',
    memberOnly: true,
  },
  {
    key: 'address',
    href: '/mypage/address',
    activeIconUrl: 'pin-map-red.svg',
    inactiveIconUrl: 'pin-map-gray.svg',
    text: '배송지 관리',
    memberOnly: false,
  },
  {
    key: 'inquiry',
    href: '/mypage/inquiry',
    activeIconUrl: 'chat-red.svg',
    inactiveIconUrl: 'chat-gray.svg',
    text: '나의 문의',
    memberOnly: false,
  },
  {
    key: 'guide',
    href: '/mypage/guide',
    activeIconUrl: 'i-circle-red.svg',
    inactiveIconUrl: 'i-circle-gray.svg',
    text: '이용 안내',
    memberOnly: false,
  },
  {
    key: 'membership',
    href: '/mypage/membership',
    activeIconUrl: 'badge-red.svg',
    inactiveIconUrl: 'badge-gray.svg',
    text: '멤버십 안내',
    iconSizeRatio: 1.2,
    memberOnly: true,
  },
  {
    key: 'bulkpurchase',
    href: '/mypage/bulk-purchase',
    activeIconUrl: 'basket-bbq-red.svg',
    inactiveIconUrl: 'basket-bbq-gray.svg',
    text: '대량 구매 안내',
    iconSizeRatio: 1,
    memberOnly: false,
  },
];

export const YOUTUBE_CONTENTS_LIST = [
  {
    code: '632BKk3AWTo',
    title: 'BBQ Garlicioso 착착갈릭 - 15s New Ver.',
  },
  {
    code: 'Vi2s5P-wZ6E',
    title: 'BBQ Garlicioso 단짠갈릭 - 15s New Ver.',
  },
  {
    code: 'S5BTWPHfdAY',
    title: 'BBQ Garlicioso 바삭갈릭 - 15s New Ver.',
  },
  {
    code: 'AlrJAiKgP_s',
    title: 'BBQ Garlicioso 3종 : 갈리시오소 바삭갈릭, 단짠갈릭, 착착갈릭 - 30s New Ver.',
  },
  {
    code: 'Oe2YZTIYpJk',
    title: 'BBQ 창업, 곧 달에도 착륙 합니다🌙',
  },
  {
    code: 'ei-OPIFj8og',
    title: 'BBQ X 김유정, BBQ 탐험편💚 - long ver',
  },
  {
    code: '1adwbt1sNg8',
    title: 'BBQ 신메뉴 황올콤보 출시🍗',
  },
  {
    code: 'LSRrZx9FEhM',
    title: 'BBQ OLIVE US 봉사단 면접 공개✨',
  },
  {
    code: 'Cpi_fKvHp6s',
    title: '우리모두 황올한 BBQ치킨 파티! - (30s)',
  },
  {
    code: 'vnZA-0h6vwk',
    title: '황광희 BBQ 치킨 광고 찍었다 [치킨왕]',
  },
  {
    code: '7uwWPJB3crs',
    title: "🍗BBQ 핫황금올리브 TVCF 30's",
  },
  {
    code: 'dJ38gZi9PP4',
    title: 'BBQ 뱀파이어 치킨 “신사답게 주문해” 편',
  },
  {
    code: 'vF19XeD_gMU',
    title: 'BBQ x 시티포레스티벌 2019 생생 후기!',
  },
  {
    code: 'eraoTpIxdhg',
    title: 'BBQ x 시티포레스티벌 2019 생생 후기 제 2탄!',
  },
  {
    code: 'vMMxedUulvI',
    title: 'BBQ 신메뉴 삼총사가 명동점에 떴다?!',
  },
  {
    code: 'u6Q3MEdOR-I',
    title: "드라마 '봄밤'과 함께하는 BBQ!",
  },
  {
    code: 'cZKTAqZsZks',
    title: 'BBQ(비비큐) 딹 멤버십 출시!',
  },
  {
    code: 'l8n8qdlrx1s',
    title: "Let's Chicketing⭐",
  },
  {
    code: 'Hu18I2sZiqw',
    title: '[BBQ x 데드풀] 그분과 함께 돌아왔다 #BBQ #데드풀2',
  },
  {
    code: 'fds93wmGnPA',
    title: '[BBQ] New 비비큐 로고송!! #비비송 #비비큐송!! 비하인드 스토리!?',
  },
  {
    code: 'Rav1b8PncxQ',
    title: '[BBQ] New 로고송 개웃ㅋㅋㅋ #TDC #셀럽파이브 #진짜 #비비송 #비비큐송',
  },
  {
    code: 'nRRrWgbgOZc',
    title: 'BBQ TVCF(40s) 방탄소년단 - 꼬꼬넛치킨 (Song. BTS)',
  },
  {
    code: 'dKDMrV3JV20',
    title: 'BBQ TV CF 방탄소년단-큼지막한 맛이 필요할땐 BBQ 자메이카 통다리구이가 딹.',
  },
  {
    code: 'grrDKhz4fak',
    title: 'BBQ TV CF 방탄소년단-출출함에 쫓길땐 BBQ 황금올리브 속안심이 딹.',
  },
  {
    code: 'f3dYtcrM-gw',
    title: '딹 비비큐 광고 BBQ 프리런칭 15초',
  },
  {
    code: 'OR8KiMSm_VY',
    title: '[ BBQ치킨 ] 배고플때는 주문을 외워보자!! 1588-9282',
  },
  {
    code: 'lzAIsKgNC_Q',
    title: '[ BBQ 치킨 ] 황금올리브치킨 조리과정 최초공개!',
  },
  {
    code: 'mQ8xbmMConE',
    title: '[ BBQ치킨 ] 비비큐 장학금 스토리',
  },
  {
    code: '6y33xtdgoe0',
    title: '[ BBQ치킨 ]카드뉴스_치킨대학편',
  },
  {
    code: '6oi2o5ItH4Y',
    title: '[ BBQ치킨 ]카드뉴스_자메이카 통다리구이편',
  },
  {
    code: '7jYCXC4GHQM',
    title: '[ BBQ치킨 ]카드뉴스_올리브유편',
  },
  {
    code: 'PKPWV-MXvUc',
    title: '[ BBQ치킨 ]카드뉴스_성공스토리편',
  },
  {
    code: 'YGDiWaBrV7M',
    title: 'BBQ(비비큐) 이종석(Lee Jong Seok), 수지(Suzy) BBQ 달링허니송!',
  },
  {
    code: 'OJa8Tk0n7Ao',
    title: 'BBQ(비비큐)드림키즈세트 (슈렉, 쿵푸팬더, 알렉스, 드래곤) 바이럴 영상',
  },
  {
    code: '0SYAooYnfGM',
    title: 'BBQ(비비큐)드림키즈세트(슈렉, 쿵푸팬더, 알렉스, 드래곤)CF영상 30초',
  },
  {
    code: 'iwWB_AiFoRA',
    title: 'BBQ(비비큐)드림키즈세트 (슈렉, 쿵푸팬더, 알렉스, 드래곤) CF영상 15초',
  },
  {
    code: 'LHY-UxaY5UU',
    title: 'BBQ(비비큐) 이종석, 수지의 허니갈릭스&치즐링 광고 촬영 스케치 1탄',
  },
  {
    code: 'V1znewWZaBs',
    title: 'BBQ (비비큐) 이종석 메이킹영상~',
  },
  {
    code: 'ok-1OFzIkAU',
    title: 'BBQ (비비큐) 이종석, 수지의 치즐링, 허니갈릭스 CF영상~',
  },
  {
    code: 'bZUz8mGWAsg',
    title: '[MV] 류승룡의 BBQ(비비큐) 뉴욕속안심텐더',
  },
  {
    code: '3rG1tJIxxEk',
    title: '[MV] 류승룡의 BBQ(비비큐) 이스탄불치킨',
  },
  {
    code: 'Y8Jnbf9JrSE',
    title: '류승룡의 BBQ (비비큐)  빠리치킨',
  },
  {
    code: 'e3cyRhk4rI8',
    title: '류승룡의 BBQ (비비큐) 자메이카 통다리구이',
  },
  {
    code: 'GiAPNBeRuFk',
    title: 'BBQ (비비큐) 페이스북 인증샷 이벤트 good',
  },
  {
    code: 'WUGLocLZkn8',
    title: "[BBQ치킨/류현진] BBQ CF : 정류장편(30')_고화질",
  },
  {
    code: 'EWb4wiuqmNA',
    title: "[BBQ치킨/류현진] BBQ CF : 외로움편(30')_고화질",
  },
  {
    code: 'gS1vhj_cTRs',
    title: '[BBQ치킨/현아] 청춘의 답은 BBQ에 있다_반반치킨',
  },
  {
    code: 'fA62asGgFcQ',
    title: '[BBQ치킨/현아] 청춘의 답은 BBQ에 있다_클럽 Part 2.',
  },
  {
    code: '6rEeLxkZ7sI',
    title: '[BBQ치킨/현아] 청춘의 답은 BBQ에 있다_클럽 Part 1.',
  },
  {
    code: 'VQpRs9DvNiY',
    title: 'BBQ광고_30초',
  },
  {
    code: 'rx52gzpWgLQ',
    title: '한국경제TV - BBQ 열풍이 중국으로 번지고 있다',
  },
  {
    code: 'rC_way3ieQM',
    title: '0208 BBQ 양파의청춘 비스트 현승ver',
  },
  {
    code: 'pxV2uqyiJhU',
    title: '0208 BBQ 얘천재아냐 비스트 요섭 ver',
  },
  {
    code: 'GfDVyqJmyPM',
    title: 'BBQ치킨 누나는 24인치 신세경 ver',
  },
  {
    code: 'VQpRs9DvNiY',
    title: 'BBQ광고_30초',
  },
  {
    code: '8Q2WoTQksI4',
    title: '페짱과 함께하는 스트레칭.avi',
  },
  {
    code: '9RRuRFzMRaE',
    title: 'PSY싸이 - GANGNAM STYLE (강남스타일) 패러디 - BBQ 스타일',
  },
  {
    code: 'VQpRs9DvNiY',
    title: 'BBQ광고_30초',
  },
];
