import * as React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'purple';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-blue-50 text-blue-700 border-blue-200/80',
  secondary: 'bg-slate-100 text-slate-700 border-slate-200/80',
  outline: 'bg-white text-slate-700 border-slate-200',
  destructive: 'bg-rose-50 text-rose-700 border-rose-200/80',
  error: 'bg-rose-50 text-rose-700 border-rose-200/80',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  warning: 'bg-amber-50 text-amber-800 border-amber-200/80',
  info: 'bg-sky-50 text-sky-700 border-sky-200/80',
  purple: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-tight transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
