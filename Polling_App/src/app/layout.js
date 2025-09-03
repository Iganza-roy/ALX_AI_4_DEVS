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
          <nav className='bg-gray-800 p-4 shadow-md'>
            <ul className='flex items-center justify-center gap-8'>
              <li>
                <Link
                  href='/'
                  className='text-white transition-colors hover:text-gray-300'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/polls/create'
                  className='text-white transition-colors hover:text-gray-300'
                >
                  Create Poll
                </Link>
              </li>
              <li>
                <Link
                  href='/auth/login'
                  className='text-white transition-colors hover:text-gray-300'
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href='/auth/register'
                  className='text-white transition-colors hover:text-gray-300'
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
          <main className='p-4'>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
