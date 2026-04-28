/**
 * 견적서 품목 테이블 컴포넌트
 * 번호, 품목명, 수량, 단가, 금액 컬럼과 합계 행을 표시
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Separator } from "@/components/ui/Separator";
import { formatAmount } from "@/lib/notion";
import type { InvoiceItem } from "@/types/invoice";

interface InvoiceTableProps {
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export function InvoiceTable({
  items,
  subtotal,
  tax,
  total,
}: InvoiceTableProps) {
  return (
    <div className="mt-8">
      {/* 품목 테이블 */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12 text-center">번호</TableHead>
              <TableHead>품목명</TableHead>
              <TableHead className="w-20 text-right">수량</TableHead>
              <TableHead className="w-32 text-right">단가 (원)</TableHead>
              <TableHead className="w-32 text-right">금액 (원)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                >
                  품목이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatAmount(item.unitPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatAmount(item.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Separator className="my-4" />

      {/* 합계 섹션 */}
      <div className="flex flex-col items-end gap-2 text-sm">
        <div className="flex justify-between w-full max-w-xs">
          <span className="text-muted-foreground">소계</span>
          <span>{formatAmount(subtotal)} 원</span>
        </div>
        <div className="flex justify-between w-full max-w-xs">
          <span className="text-muted-foreground">부가세 (10%)</span>
          <span>{formatAmount(tax)} 원</span>
        </div>
        <Separator className="w-full max-w-xs" />
        <div className="flex justify-between w-full max-w-xs font-bold text-base">
          <span>총액</span>
          <span className="text-primary">{formatAmount(total)} 원</span>
        </div>
      </div>
    </div>
  );
}
