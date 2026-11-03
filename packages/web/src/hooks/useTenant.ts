import { useEffect, useState } from 'react';

export function useTenant() {
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setTenant(data.tenant);
      } catch {}
    }
    setLoading(false);
  }, []);

  return { tenant, loading };
}
