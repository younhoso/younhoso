import * as React from "react";
import { cn } from "@/lib/utils";

// 폼 레이블 컴포넌트
// peer-disabled 상태에서 비활성화 스타일 자동 적용
function Label({
  className,
  ref,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { ref?: React.Ref<HTMLLabelElement> }) {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
}
Label.displayName = "Label";

export { Label };
