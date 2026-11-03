import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Building2, BookOpen, FileText, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function AgentLayout() {
  const { user, login, logout, role } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { label: 'Dashboard', href: '/agent/dashboard', icon: Building2 },
    { label: 'Explore Schools', href: '/agent/schools', icon: MapPin },
    { label: 'Browse Courses', href: '/agent/courses', icon: BookOpen },
    { label: 'My Quotes', href: '/agent/quotes', icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white shadow-lg lg:hidden">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-primary-text text-base">AusEdu Connect</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600 p-1"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {navItems.map(item => (
                <NavLink key={item.href} to={item.href} onClick={() => setSidebarOpen(false)} style={{ textDecoration: 'none' }}
                  className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <item.icon className="w-4 h-4 shrink-0" />{item.label}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-gray-100 p-3">
              <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4 shrink-0" />Sign Out
              </button>
            </div>
          </aside>
        </>
      )}

      <aside className="hidden lg:flex w-72 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-primary-text text-base truncate">AusEdu Connect</h1>
            <p className="text-xs text-muted-foreground truncate">{user?.fullName || 'Agent'} · {role}</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.href} to={item.href} style={{ textDecoration: 'none' }}
              className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <item.icon className="w-4 h-4 shrink-0" />{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-100 p-3">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4 shrink-0" />Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"><Menu className="w-5 h-5" /></button>
            <h2 className="text-lg font-semibold text-primary-text hidden sm:block">Agent Portal</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold">{(user?.fullName || 'A').charAt(0).toUpperCase()}</div>
              <span className="text-sm font-medium text-gray-700">{user?.fullName || 'Agent'}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
