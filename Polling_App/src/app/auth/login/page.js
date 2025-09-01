import AuthForm from '../../../src/components/AuthForm';

export default function LoginPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <AuthForm type='login' />
    </div>
  );
}
