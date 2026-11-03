import { useState, useEffect } from 'react';

// Read auth state synchronously to avoid redirect loops on first render
function getInitialAuth() {
  try {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('auth_user') : null;
    if (stored) {
      const data = JSON.parse(stored);
      return { user: data.user ?? null, tenant: data.tenant ?? null, role: data.role ?? '', loading: false };
    }
  } catch {
    try { localStorage.removeItem('auth_user'); } catch {}
  }
  return { user: null, tenant: null, role: '', loading: false };
}


export type UserRole = string;

const AGENT_ROLES: UserRole[] = ['AGENCY_OWNER', 'AGENCY_COUNSELOR'];
const SCHOOL_ROLES: UserRole[] = ['SCHOOL_ADMIN', 'SCHOOL_STAFF', 'PLATFORM_ADMIN', 'SUPER_ADMIN'];

export function isAgent(role: UserRole) {
  return AGENT_ROLES.includes(role);
}

export function isSchoolAdmin(role: UserRole) {
  return SCHOOL_ROLES.includes(role);
}


export function useAuth() {
  const [user, setUser] = useState<any>(getInitialAuth().user);
  const [tenant, setTenant] = useState<any>(getInitialAuth().tenant);
  const [role, setRole] = useState<string>(getInitialAuth().role);
  const [loading, setLoading] = useState(getInitialAuth().loading);

  // Re-sync only if localStorage might have changed since mount
  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored && !user) {
      try {
        const data = JSON.parse(stored);
        setUser(data.user);
        setTenant(data.tenant);
        setRole(data.role);
      } catch {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const login = (user: any, tenant: any, role: string) => {
    setUser(user);
    setTenant(tenant);
    setRole(role);
    localStorage.setItem('auth_user', JSON.stringify({ user, tenant, role }));
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
    setRole('');
    localStorage.removeItem('auth_user');
  };

  return { user, tenant, role, loading, login, logout };
}
