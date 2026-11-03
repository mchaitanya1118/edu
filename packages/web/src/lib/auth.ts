import { useState, useEffect } from 'react';

export type PortalRoleType = 'agent' | 'school_admin' | 'super_admin';

export interface AuthUser {
  name: string;
  email: string;
  organization: string;
  role: PortalRoleType;
  avatar: string;
}

const DEFAULT_USERS: Record<PortalRoleType, AuthUser> = {
  agent: {
    name: 'Sarah Chen',
    email: 'agent@ause.edu',
    organization: 'StudyMATE Global Agency',
    role: 'agent',
    avatar: 'SC',
  },
  school_admin: {
    name: 'Dr. Yuki Tanaka',
    email: 'school@ause.edu',
    organization: 'Australian Pacific College',
    role: 'school_admin',
    avatar: 'YT',
  },
  super_admin: {
    name: 'Elena Rostova',
    email: 'admin@ause.edu',
    organization: 'AusEdu Connect HQ',
    role: 'super_admin',
    avatar: 'ER',
  },
};

function readStoredUser(): AuthUser {
  if (typeof window === 'undefined') return DEFAULT_USERS.school_admin;
  try {
    const raw = localStorage.getItem('auth_user');
    if (!raw) return DEFAULT_USERS.school_admin;
    const parsed = JSON.parse(raw);
    const rawRole = String(parsed.role || '').toUpperCase();
    let role: PortalRoleType = 'school_admin';
    if (rawRole.includes('AGENT') || rawRole.includes('COUNSELOR') || parsed.role === 'agent') {
      role = 'agent';
    } else if (rawRole.includes('SUPER') || parsed.role === 'super_admin') {
      role = 'super_admin';
    } else {
      role = 'school_admin';
    }
    const name = parsed.user?.fullName || parsed.name || DEFAULT_USERS[role].name;
    const email = parsed.user?.email || parsed.email || DEFAULT_USERS[role].email;
    const organization = parsed.tenant?.name || parsed.organization || DEFAULT_USERS[role].organization;
    const initials = name
      .split(' ')
      .map((part: string) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    return {
      name,
      email,
      organization,
      role,
      avatar: initials || DEFAULT_USERS[role].avatar,
    };
  } catch {
    return DEFAULT_USERS.school_admin;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser>(() => readStoredUser());

  useEffect(() => {
    const handleStorage = () => setUser(readStoredUser());
    window.addEventListener('storage', handleStorage);
    window.addEventListener('auth-role-change', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('auth-role-change', handleStorage);
    };
  }, []);

  const switchRole = (role: PortalRoleType) => {
    const target = DEFAULT_USERS[role];
    localStorage.setItem(
      'auth_user',
      JSON.stringify({
        user: { email: target.email, fullName: target.name },
        tenant: { slug: 'aus-edu-platform', name: target.organization },
        role:
          role === 'agent'
            ? 'AGENCY_COUNSELOR'
            : role === 'super_admin'
            ? 'SUPER_ADMIN'
            : 'SCHOOL_ADMIN',
      })
    );
    setUser(target);
    window.dispatchEvent(new Event('auth-role-change'));
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    window.dispatchEvent(new Event('auth-role-change'));
  };

  return { user, switchRole, logout };
}

