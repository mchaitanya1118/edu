'use client';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Settings, ChevronRight, Menu, Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem { label: string; href?: string }

function getPageBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === '/' || pathname === '/dashboard') return [{ label: 'Dashboard' }];
  if (pathname.startsWith('/courses')) return [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Courses' }];
  if (pathname.startsWith('/quotes')) return [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Quotes' }];
  if (pathname.startsWith('/students')) return [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Students' }];
  if (pathname.startsWith('/admin')) return [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Admin' }];
  const last = pathname.split('/').filter(Boolean).pop();
  return [
    { label: 'Dashboard', href: '/dashboard' },
    { label: last ? decodeURIComponent(last).replace(/-/g, ' ') : 'Page' },
  ];
}

export function Header({ onMobileToggle }: { onMobileToggle?: () => void }) {
  const { tenant, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const breadcrumbs = getPageBreadcrumbs(location.pathname);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const email = localStorage.getItem('auth_user');
  const parsed = email ? JSON.parse(email) : null;
  const initials = (parsed?.user?.email ?? 'U').charAt(0).toUpperCase();

  return (
    <header className="bg-[#12131a]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={onMobileToggle}
            className="lg:hidden p-1.5 rounded-xl hover:bg-white/5 transition-colors text-white"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden sm:flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3 text-white/30 shrink-0" />}
                {crumb.href ? (
                  <Link to={crumb.href} className="text-white/40 hover:text-white transition-colors whitespace-nowrap">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium whitespace-nowrap">{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="search"
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-white/5 bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 placeholder:text-white/20 w-40 lg:w-56 transition-all"
              />
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 p-1 pr-2.5 rounded-xl hover:bg-white/5 transition-colors"
            aria-expanded={menuOpen}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <span className="text-[11px] font-bold text-white">{initials}</span>
            </div>
            <span className="text-sm font-semibold text-white max-w-[160px] truncate">{tenant?.name ?? 'User'}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-48 bg-[#12131a] rounded-xl border border-white/5 shadow-2xl py-1 z-50 backdrop-blur-md">
              <button
                onClick={() => { setMenuOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-white/5"
              >
                <Settings className="w-4 h-4 text-white/40" />
                Settings
              </button>
              <div className="my-1 border border-white/5" />
              <button
                onClick={() => { setMenuOpen(false); logout(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
