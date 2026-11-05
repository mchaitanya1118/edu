import * as React from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'dashed'
  | 'destructive'
  | 'success'
  | 'white'
  | 'glass';
type ButtonSize = 'default' | 'sm' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const variants: Record<ButtonVariant, string> = {
      default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs shadow-blue-600/15',
      secondary:
        'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300 shadow-2xs',
      ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      outline:
        'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300 shadow-2xs',
      dashed:
        'border border-dashed border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:border-blue-400',
      destructive: 'bg-rose-600 text-white hover:bg-rose-700 shadow-xs shadow-rose-600/15',
      success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs shadow-emerald-600/15',
      white: 'bg-white hover:bg-slate-100 text-slate-900 border-0 shadow-md font-bold',
      glass: 'bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md shadow-xs',
    };

    const sizes: Record<ButtonSize, string> = {
      default: 'px-4 py-2.5 text-sm',
      sm: 'px-3.5 py-2 text-xs',
      lg: 'px-5 py-2.5 text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export { Button };
