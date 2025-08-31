import AuthForm from '../../components/AuthForm';

export default function Login() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl font-bold mb-8'>Login</h1>
      <AuthForm type='login' />
    </div>
  );
}
