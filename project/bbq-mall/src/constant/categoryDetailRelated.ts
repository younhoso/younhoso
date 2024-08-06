export const productStatus = [
  'product_description',
  'product_guide',
  'product_review_frame',
  'product_qna_frame',
] as const;

export const categoryDetailTabs = ({
  reviewTotal = 0,
  qnaTotal = 0,
}: {
  reviewTotal?: number;
  qnaTotal?: number;
}) => {
  return [
    {
      label: '상품설명',
      currentValue: productStatus[0],
    },
    {
      label: '상세정보',
      currentValue: productStatus[1],
    },
    {
      label: `상품리뷰(${reviewTotal})`,
      currentValue: productStatus[2],
    },
    {
      label: `상품문의(${qnaTotal})`,
      currentValue: productStatus[3],
    },
  ];
};

export const DEFAULT = 'DEFAULT';
export const COMBINATION = 'COMBINATION';
export const modalOpenMessege = {
  messageLogin: '로그인하셔야 본 서비스를 이용하실수 있습니다.',
  messageCart: '상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?',
  messageCartAlready:
    '장바구니에 이미 담은 상품이 있어 수량이 추가 되었습니다. 장바구니로 이동하시겠습니까?',
  messageOrderSelcet: '주문하실 상품을 선택해주세요.',
  messageQnaRegistration: '문의가 정상적으로 등록되었습니다.',
  messageQnaCancel: '상품 문의 취소 하시겠습니까?',
  messageQnaDelete: '상품 문의를 정말 삭제 하시겠습니까?',
  messageQnaRepliedAlreadyUpdate: '이미 답변이 등록되어 수정할 수 없습니다.',
  messageQnaRepliedAlreadyDelete: '이미 답변이 등록되어 삭제할 수 없습니다.',
  messageQnaSecret: '비밀글 입니다.',
};

export const datailReviewPointData = {
  textReview: 100,
  photoReview: 500,
};

export const detailOptionSortList = [
  { label: '최신순', value: 3, orderBy: 'REGISTER_YMDT', orderDirection: 'ASC' },
  { label: '평점 높은순', value: 2, orderBy: 'RATING', orderDirection: 'DESC' },
  { label: '평점 낮은순', value: 1, orderBy: 'RATING', orderDirection: 'ASC' },
];
