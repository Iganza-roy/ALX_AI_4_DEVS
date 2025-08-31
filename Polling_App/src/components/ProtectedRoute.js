'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const protectedRoutes = [
  '/polls',
  '/polls/create',
  '/polls/[pollId]',
  '/auth/profile',
]; // Define your protected routes here

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return; // Wait for auth state to load

    const isProtectedRoute = protectedRoutes.some((route) => {
      // For dynamic routes like /polls/[pollId], we need to check if the pathname starts with the base protected route
      if (route.includes('[') && route.includes(']')) {
        const baseRoute = route.split('[')[0];
        return pathname.startsWith(baseRoute);
      }
      return pathname === route;
    });

    if (isProtectedRoute && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return <div>Loading authentication...</div>; // Or a more elaborate loading spinner
  }

  return children;
}
