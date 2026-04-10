import * as React from "react";
import { cn } from "@/lib/utils";

// 로딩 상태를 표시하는 스켈레톤 컴포넌트
// className으로 너비/높이를 커스터마이징
function Skeleton({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
Skeleton.displayName = "Skeleton";

export { Skeleton };
