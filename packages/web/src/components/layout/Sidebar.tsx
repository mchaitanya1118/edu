'use client';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FileText, Users, Briefcase, Building2, X, GraduationCap, PenTool, Cpu, DollarSign, FolderOpen, School } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/quotes', label: 'Quotes', icon: FileText },
  { path: '/students', label: 'Students', icon: Users },
];

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const { tenant, role } = useAuth();
  const location = useLocation();

  const matchPath = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard' || location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const adminActive = location.pathname.startsWith('/admin');
  const isAdminRole = role === 'SUPER_ADMIN' || role === 'TENANT_ADMIN';

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <aside className="relative w-72 h-full bg-[#12131a] flex flex-col shadow-2xl border-r border-white/5 animate-in slide-in-from-left duration-200">
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm tracking-tight">{tenant?.name ?? 'AusEdu Connect'}</span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">Main Menu</p>
            {navItems.map((item) => {
              const active = matchPath(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={{ textDecoration: 'none' }}
                  onClick={() => onClose?.()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive ? 'bg-indigo-500/15 text-indigo-400' : 'text-white/50 hover:bg-white/5 hover:text-white'}`
                  }
                >
                  <item.icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-indigo-400' : ''}`} />
                  {item.label}
                </NavLink>
              );
            })}

            {isAdminRole && (
              <>
                <div className="mt-4 pt-4 border-t border-white/5" />
                <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">Admin</p>
                <NavLink
                  to="/admin"
                  style={{ textDecoration: 'none' }}
                  onClick={() => onClose?.()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive ? 'bg-indigo-500/15 text-indigo-400' : 'text-white/50 hover:bg-white/5 hover:text-white'}`
                  }
                >
                  <Briefcase className={`w-[18px] h-[18px] shrink-0 ${adminActive ? 'text-indigo-400' : ''}`} />
                  Admin Panel
                </NavLink>
              </>
            )}
          </nav>

          <div className="border-t border-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/15 flex items-center justify-center">
                <span className="text-xs font-semibold text-indigo-400">{(tenant?.slug?.charAt(0) ?? 'U').toUpperCase()}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">{tenant?.name ?? 'User'}</p>
                <p className="text-[10px] text-white/40 capitalize">{role?.replace(/_/g, ' ').toLowerCase()}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    );
  }

  return (
    <aside className="hidden lg:flex flex-col border-r border-white/5 bg-[#12131a] w-64 shrink-0">
      <div className="flex h-16 items-center px-5 border-b border-white/5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shrink-0 glow">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <span className="ml-3 text-white font-semibold text-sm tracking-tight whitespace-nowrap">{tenant?.name ?? 'AusEdu Connect'}</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">Main Menu</p>
        {navItems.map((item) => {
          const active = matchPath(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ textDecoration: 'none' }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive ? 'bg-indigo-500/15 text-indigo-400' : 'text-white/50 hover:bg-white/5 hover:text-white'}`
              }
            >
              <item.icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-indigo-400' : ''}`} />
              {item.label}
            </NavLink>
          );
        })}

        {isAdminRole && (
          <>
            <div className="mt-4 pt-4 border-t border-white/5" />
            <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-white/40">Admin</p>
            <NavLink
              to="/admin"
              style={{ textDecoration: 'none' }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${isActive ? 'bg-indigo-500/15 text-indigo-400' : 'text-white/50 hover:bg-white/5 hover:text-white'}`
              }
            >
              <Briefcase className={`w-[18px] h-[18px] shrink-0 ${adminActive ? 'text-indigo-400' : ''}`} />
              Admin
            </NavLink>
          </>
        )}
      </nav>

      <div className="border-t border-white/5 p-4">
        <button
          onClick={() => { localStorage.removeItem('auth_user'); window.location.replace('/login'); }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <X className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
