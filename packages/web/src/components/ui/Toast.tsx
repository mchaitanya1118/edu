import { useCallback } from 'react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export function useToast() {
  const toast = useCallback((message: string, type: ToastType = 'info') => {
    if (typeof document === 'undefined') return;
    const containerId = 'edu-toast-container';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.className =
        'fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm pointer-events-none';
      document.body.appendChild(container);
    }

    const el = document.createElement('div');
    const colorClasses =
      type === 'success'
        ? 'bg-emerald-950 text-emerald-50 border-emerald-700'
        : type === 'error'
        ? 'bg-rose-950 text-rose-50 border-rose-700'
        : 'bg-slate-900 text-white border-slate-700';

    el.className = `pointer-events-auto px-4 py-3 rounded-xl border shadow-lg text-xs font-semibold transition-all duration-200 ${colorClasses}`;
    el.textContent = message;
    container.appendChild(el);

    setTimeout(() => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 200);
    }, 3000);
  }, []);

  return { toast };
}

