"use client";

/**
 * PDF 다운로드 버튼 컴포넌트 (Client Component)
 * window.print()를 트리거하여 브라우저 인쇄 기능으로 PDF 저장
 * @media print CSS에서 헤더/푸터/버튼은 자동으로 숨김 처리됨
 */

import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

interface PdfDownloadButtonProps {
  /** 접근성용 레이블 (기본값: "PDF 다운로드") */
  label?: string;
}

export function PdfDownloadButton({
  label = "PDF 다운로드",
}: PdfDownloadButtonProps) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <Button
      onClick={handleDownload}
      className="print:hidden"
      aria-label={label}
    >
      <Download className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}
