import { WINNER } from './winnerConst';

export const MEMBER_BENEFIT = 'benefit';

// const EVENT_ALL = 'all';
const EVENT_ING = 'ing';
const EVENT_END = 'end';
// const EVENT_END = 'ending';

export const eventTabList = [
  // {
  //   label: '전체보기',
  //   value: EVENT_ALL,
  // },
  {
    label: '진행중인 이벤트',
    value: EVENT_ING,
  },
  {
    label: '종료된 이벤트',
    value: EVENT_END,
  },
  { label: '당첨자 발표', value: WINNER },
  { label: '회원 혜택', value: MEMBER_BENEFIT },
];
