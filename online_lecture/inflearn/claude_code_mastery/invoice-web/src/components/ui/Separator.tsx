import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  orientation?: "horizontal" | "vertical";
  ref?: React.Ref<HTMLDivElement>;
}

function Separator({ className, orientation = "horizontal", ref, ...props }: SeparatorProps) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(separatorVariants({ orientation, className }))}
      {...props}
    />
  );
}
Separator.displayName = "Separator";

export { Separator };
