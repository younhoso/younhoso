/**
 * 견적서 렌더링 컴포넌트
 * 레이아웃: 헤더(공급자 정보) → 클라이언트 정보 → 품목 테이블 → 비고
 */

import { Badge } from "@/components/ui/Badge";
import { Separator } from "@/components/ui/Separator";
import { InvoiceTable } from "@/components/invoice/InvoiceTable";
import { PdfDownloadButton } from "@/components/invoice/PdfDownloadButton";
import { formatDate } from "@/lib/notion";
import type { Invoice } from "@/types/invoice";

interface InvoiceViewProps {
  invoice: Invoice;
}

/** 견적서 상태 뱃지 스타일 매핑 */
const statusConfig = {
  draft: { label: "초안", variant: "secondary" as const },
  sent: { label: "발송됨", variant: "default" as const },
  accepted: { label: "수락됨", variant: "outline" as const },
};

export function InvoiceView({ invoice }: InvoiceViewProps) {
  const status = statusConfig[invoice.status];

  return (
    <div className="max-w-3xl mx-auto">
      {/* 인쇄 시 숨겨지는 액션 영역 */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-foreground">견적서</h1>
        <PdfDownloadButton />
      </div>

      {/* 견적서 본문 — 인쇄 시에는 이 영역만 출력됨 */}
      <div
        id="invoice-content"
        className="bg-white text-foreground border border-border rounded-lg p-8 print:border-none print:p-0 print:rounded-none"
      >
        {/* ── 상단: 제목 + 상태 ── */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm text-muted-foreground mb-1">견적서</p>
            <h2 className="text-2xl font-bold">{invoice.title}</h2>
          </div>
          <Badge variant={status.variant} className="print:hidden">
            {status.label}
          </Badge>
        </div>

        <Separator className="mb-8" />

        {/* ── 발행 정보 + 클라이언트 정보 ── */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* 공급자 정보 */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              공급자
            </p>
            <p className="font-semibold">
              {process.env.NEXT_PUBLIC_SUPPLIER_NAME ?? "공급자명을 입력하세요"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {process.env.NEXT_PUBLIC_SUPPLIER_EMAIL ?? ""}
            </p>
          </div>

          {/* 클라이언트 정보 */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              수신인
            </p>
            <p className="font-semibold">{invoice.clientName}</p>
          </div>
        </div>

        {/* ── 날짜 정보 ── */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              발행일
            </p>
            <p className="text-sm font-medium">
              {formatDate(invoice.issueDate)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              유효기간
            </p>
            <p className="text-sm font-medium">
              {formatDate(invoice.validUntil)}
            </p>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* ── 품목 테이블 ── */}
        <InvoiceTable
          items={invoice.items}
          subtotal={invoice.subtotal}
          tax={invoice.tax}
          total={invoice.total}
        />

        {/* ── 비고 ── */}
        {invoice.note && (
          <>
            <Separator className="mt-8 mb-4" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                비고
              </p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {invoice.note}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
