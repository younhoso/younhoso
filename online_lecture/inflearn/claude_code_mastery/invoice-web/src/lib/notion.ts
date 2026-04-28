/**
 * 노션 API 클라이언트 및 데이터 파싱 함수
 *
 * 사전 설치 필요:
 *   npm install @notionhq/client
 *
 * 환경변수 설정 필요 (.env.local):
 *   NOTION_API_KEY=secret_xxxxx
 */

// @notionhq/client 설치 후 아래 주석을 해제하세요
// import { Client } from "@notionhq/client";
// import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import type { Invoice, InvoiceItem } from "@/types/invoice";

// ─────────────────────────────────────────────
// 노션 클라이언트 초기화
// ─────────────────────────────────────────────

/**
 * 노션 API 클라이언트 싱글톤
 * Server Component에서만 호출 — NOTION_API_KEY는 클라이언트 번들에 노출되지 않음
 *
 * @notionhq/client 설치 후 아래 코드를 사용하세요:
 *
 * const notion = new Client({
 *   auth: process.env.NOTION_API_KEY,
 * });
 */

// ─────────────────────────────────────────────
// 노션 Properties → 내부 타입 파싱
// ─────────────────────────────────────────────

/**
 * 노션 페이지 ID로 견적서 데이터를 조회하고 내부 타입으로 변환
 *
 * @param pageId - 노션 페이지 ID (URL 파라미터에서 추출)
 * @returns Invoice 객체 또는 null (페이지 없음/권한 없음)
 *
 * 실제 구현 예시 (@notionhq/client 설치 후):
 *
 * export async function getInvoice(pageId: string): Promise<Invoice | null> {
 *   try {
 *     const page = await notion.pages.retrieve({ page_id: pageId }) as PageObjectResponse;
 *     return parseInvoicePage(page);
 *   } catch (error: unknown) {
 *     if (error instanceof Error && "code" in error) {
 *       const notionError = error as { code: string };
 *       if (notionError.code === "object_not_found") return null;
 *       if (notionError.code === "unauthorized") return null;
 *     }
 *     throw error;
 *   }
 * }
 */
export async function getInvoice(pageId: string): Promise<Invoice | null> {
  // TODO: @notionhq/client 설치 후 실제 API 호출로 교체
  // 현재는 개발용 목업 데이터 반환
  console.log(`[notion] getInvoice 호출 - pageId: ${pageId}`);

  // 개발 환경에서 UI 확인을 위한 목업 데이터
  const mockInvoice: Invoice = {
    id: pageId,
    title: "웹사이트 리뉴얼 프로젝트 견적서",
    clientName: "홍길동 대표님",
    issueDate: "2026-04-28",
    validUntil: "2026-05-28",
    items: [
      {
        id: "item-1",
        name: "기획 및 디자인",
        quantity: 1,
        unitPrice: 1500000,
        amount: 1500000,
      },
      {
        id: "item-2",
        name: "프론트엔드 개발",
        quantity: 1,
        unitPrice: 3000000,
        amount: 3000000,
      },
      {
        id: "item-3",
        name: "백엔드 API 개발",
        quantity: 1,
        unitPrice: 2000000,
        amount: 2000000,
      },
      {
        id: "item-4",
        name: "유지보수 (1개월)",
        quantity: 3,
        unitPrice: 300000,
        amount: 900000,
      },
    ],
    subtotal: 7400000,
    tax: 740000,
    total: 8140000,
    note: "계약금 50% 선납 후 작업 시작, 잔금은 납품 완료 후 지급",
    status: "sent",
  };

  return mockInvoice;
}

// ─────────────────────────────────────────────
// 내부 유틸 함수
// ─────────────────────────────────────────────

/**
 * 노션 PageObjectResponse의 Properties를 Invoice 타입으로 변환
 *
 * @notionhq/client 설치 후 아래 함수를 구현하세요:
 *
 * function parseInvoicePage(page: PageObjectResponse): Invoice {
 *   const props = page.properties;
 *
 *   const title = props["title"]?.type === "title"
 *     ? props["title"].title[0]?.plain_text ?? ""
 *     : "";
 *
 *   const clientName = props["client_name"]?.type === "rich_text"
 *     ? props["client_name"].rich_text[0]?.plain_text ?? ""
 *     : "";
 *
 *   const issueDate = props["issue_date"]?.type === "date"
 *     ? props["issue_date"].date?.start ?? ""
 *     : "";
 *
 *   const validUntil = props["valid_until"]?.type === "date"
 *     ? props["valid_until"].date?.start ?? ""
 *     : "";
 *
 *   const note = props["note"]?.type === "rich_text"
 *     ? props["note"].rich_text[0]?.plain_text ?? ""
 *     : "";
 *
 *   const status = props["status"]?.type === "select"
 *     ? (props["status"].select?.name ?? "draft") as Invoice["status"]
 *     : "draft";
 *
 *   // 품목은 하위 블록(테이블)에서 파싱 — getInvoiceItems() 별도 구현 필요
 *   const items: InvoiceItem[] = [];
 *   const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
 *   const tax = Math.floor(subtotal * 0.1);
 *   const total = subtotal + tax;
 *
 *   return {
 *     id: page.id,
 *     title,
 *     clientName,
 *     issueDate,
 *     validUntil,
 *     items,
 *     subtotal,
 *     tax,
 *     total,
 *     note,
 *     status,
 *   };
 * }
 */

/** 금액을 한국 원화 형식으로 포맷 (예: 1500000 → "1,500,000") */
export function formatAmount(amount: number): string {
  return amount.toLocaleString("ko-KR");
}

/** 날짜 문자열을 한국 형식으로 포맷 (예: "2026-04-28" → "2026년 04월 28일") */
export function formatDate(dateString: string): string {
  if (!dateString) return "-";
  const [year, month, day] = dateString.split("-");
  return `${year}년 ${month}월 ${day}일`;
}

// 타입 재사용을 위해 re-export
export type { Invoice, InvoiceItem };
