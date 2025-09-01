import AuthForm from '../../../src/components/AuthForm';

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      <AuthForm type='register' />
    </div>
  );
}
