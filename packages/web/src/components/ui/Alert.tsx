import { ReactNode } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  children?: ReactNode;
  className?: string;
}

const config: Record<AlertVariant, { icon: React.ElementType; bg: string; border: string; text: string; heading: string }> = {
  default: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', heading: 'text-blue-800' },
  destructive: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', heading: 'text-red-800' },
  success: { icon: CheckCircle2, bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', heading: 'text-green-800' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', heading: 'text-amber-800' },
  info: { icon: Info, bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', heading: 'text-sky-800' },
};

export function Alert({ variant = 'default', children, className = '' }: AlertProps) {
  const c = config[variant];
  const Icon = c.icon;
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${c.bg} ${c.border} ${className}`} role="alert">
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${c.text}`} />
      <div className="flex-1 min-w-0">
        {typeof children === 'string' ? <p className={`text-sm font-medium ${c.heading}`}>{children}</p> : children}
      </div>
    </div>
  );
}

interface AlertDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export function AlertDescription({ children, className = '' }: AlertDescriptionProps) {
  return (
    <div className={`text-sm opacity-90 ${className}`}>
      {children}
    </div>
  );
}
