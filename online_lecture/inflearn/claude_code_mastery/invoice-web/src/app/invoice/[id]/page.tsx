/**
 * 견적서 공개 페이지 (Server Component)
 * 라우트: /invoice/[id]
 *
 * - 노션 페이지 ID를 URL 파라미터로 받아 견적서를 렌더링
 * - NOTION_API_KEY는 서버 사이드에서만 사용 → 클라이언트 번들에 노출 없음
 * - draft 상태는 공개 차단
 * - 존재하지 않는 ID → 404
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getInvoice } from "@/lib/notion";
import { InvoiceView } from "@/components/invoice/InvoiceView";

// Next.js 15 fetch 캐싱: 60초마다 재검증
export const revalidate = 60;

interface InvoicePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: InvoicePageProps): Promise<Metadata> {
  const { id } = await params;
  const invoice = await getInvoice(id);

  if (!invoice) {
    return { title: "견적서를 찾을 수 없습니다" };
  }

  return {
    title: `${invoice.title} | 견적서`,
    description: `${invoice.clientName}님의 견적서 - 발행일: ${invoice.issueDate}`,
  };
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { id } = await params;
  const invoice = await getInvoice(id);

  // 존재하지 않는 ID → 404
  if (!invoice) {
    notFound();
  }

  // draft 상태는 공개 차단
  if (invoice.status === "draft") {
    return (
      <div className="container mx-auto py-24 text-center">
        <p className="text-2xl font-semibold text-muted-foreground">
          준비 중인 견적서입니다.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          견적서가 확정되면 다시 확인해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <InvoiceView invoice={invoice} />
    </div>
  );
}
