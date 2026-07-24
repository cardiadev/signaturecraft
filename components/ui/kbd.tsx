import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 select-none",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

export function KbdGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("inline-flex items-center gap-1 text-slate-500 text-[11px]", className)} {...props}>
      {children}
    </div>
  );
}
