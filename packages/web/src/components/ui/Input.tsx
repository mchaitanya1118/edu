import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    const inputEl = (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-600 disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        {...props}
      />
    );

    if (!label) return inputEl;

    return (
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700">{label}</label>
        {inputEl}
      </div>
    );
  }
);
Input.displayName = 'Input';
export { Input };
