import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loginUser, logoutUser, registerUser } from '../lib/auth';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const userData = await fetch('/api/auth/user');
            if (userData) {
                setUser(userData);
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async (email, password) => {
        const userData = await loginUser(email, password);
        setUser(userData);
        router.push('/polls');
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        router.push('/auth/login');
    };

    const register = async (email, password) => {
        const userData = await registerUser(email, password);
        setUser(userData);
        router.push('/polls');
    };

    return { user, loading, login, logout, register };
};