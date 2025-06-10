import { Navigation } from '@/components/navigation';
import { SignInForm } from '@/components/signin-form';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SignInForm />
    </div>
  );
}