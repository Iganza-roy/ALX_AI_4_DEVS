import AuthForm from '../../../components/AuthForm';

export default function Register() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl font-bold mb-8'>Register</h1>
      <AuthForm type='register' />
    </div>
  );
}
