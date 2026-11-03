import { NavLink } from 'react-router-dom';

export function ResponsiveNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </NavLink>
  );
}
