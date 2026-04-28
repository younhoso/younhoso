/**
 * 견적서 서비스 타입 정의
 * 노션 데이터베이스의 Properties를 앱 내부 타입으로 매핑
 */

/** 견적서 개별 품목 */
export type InvoiceItem = {
  id: string;
  name: string;       // 품목명
  quantity: number;   // 수량
  unitPrice: number;  // 단가 (원)
  amount: number;     // 금액 = 수량 × 단가
};

/** 견적서 전체 데이터 */
export type Invoice = {
  id: string;                               // 노션 페이지 ID
  title: string;                            // 견적서 제목
  clientName: string;                       // 클라이언트명
  issueDate: string;                        // 발행일 (YYYY-MM-DD)
  validUntil: string;                       // 유효기간 (YYYY-MM-DD)
  items: InvoiceItem[];                     // 품목 목록
  subtotal: number;                         // 소계
  tax: number;                              // 부가세 (10%)
  total: number;                            // 총액
  note: string;                             // 비고
  status: "draft" | "sent" | "accepted";   // 견적서 상태
};
