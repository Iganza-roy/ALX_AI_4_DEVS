import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logout } from '../../../lib/auth';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      router.push('/auth/login'); // Redirect to login page after logout
    };

    handleLogout();
  }, [router]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default LogoutPage;