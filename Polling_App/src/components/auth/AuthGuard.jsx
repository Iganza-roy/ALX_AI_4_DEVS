import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

const AuthGuard = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AuthGuard;