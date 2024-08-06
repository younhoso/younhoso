const BBQ_NAME = '제너시스비비큐 유통';
const BBQ_ADDRESS = '대표자 : 윤경주   |   주소 : 서울특별시 송파구 중대로 64';
const BBQ_CALL = '대표전화 : 1588-9282';
const BBQ_TIME = '평일 오전 11시 - 오후 5시, 점심시간 오후 1시 - 오후 2시';
const BBQ_CLOSE = '주말 및 공휴일 휴무';
const BBQ_REGISTRATION_NUMBER = '사업자 등록번호 : 102-85-08362';
const BBQ_REGISTRATION_INFO = '통신판매업 : 제 2017-서울송파-0087 호';
const BBQ_PRIVACY = '개인정보관리책임자 : BBQ DX팀장 이상삼 상무 (sslee@bbq.co.kr)';

export const PC_FOOTER_INFO = [
  `법인명 (주) : ${BBQ_NAME}`,
  BBQ_ADDRESS,
  `${BBQ_CALL} (${BBQ_TIME}, ${BBQ_CLOSE})`,
  `${BBQ_REGISTRATION_NUMBER}  |  ${BBQ_REGISTRATION_INFO}`,
  BBQ_PRIVACY,
];

export const MOBILE_FOOTER_INFO = [
  `(주)${BBQ_NAME}`,
  BBQ_ADDRESS,
  BBQ_CALL,
  BBQ_TIME,
  BBQ_CLOSE,
  BBQ_REGISTRATION_NUMBER,
  BBQ_REGISTRATION_INFO,
  BBQ_PRIVACY,
];
