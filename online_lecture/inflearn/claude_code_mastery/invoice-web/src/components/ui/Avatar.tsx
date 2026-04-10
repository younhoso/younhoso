import * as React from "react";
import { cn } from "@/lib/utils";

// 아바타 컨테이너
function Avatar({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}
Avatar.displayName = "Avatar";

// 아바타 이미지
function AvatarImage({
  className,
  alt = "",
  ref,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & { ref?: React.Ref<HTMLImageElement> }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}
AvatarImage.displayName = "AvatarImage";

// 이미지 로드 실패 시 표시되는 폴백 (이니셜 등)
function AvatarFallback({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
