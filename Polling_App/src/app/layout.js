import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../hooks/useAuth';
import ProtectedRoute from '../components/ProtectedRoute';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Polling App',
  description: 'A simple polling application',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <nav className='bg-gray-800 p-4'>
            <ul className='flex space-x-4'>
              <li>
                <Link href='/' className='text-white'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/polls/create' className='text-white'>
                  Create Poll
                </Link>
              </li>
              <li>
                <Link href='/auth/login' className='text-white'>
                  Login
                </Link>
              </li>
              <li>
                <Link href='/auth/register' className='text-white'>
                  Register
                </Link>
              </li>
            </ul>
          </nav>
          <ProtectedRoute>{children}</ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
