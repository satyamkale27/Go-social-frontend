import { Navigation } from '@/components/navigation';
import { SignUpForm } from '@/components/signup-form';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SignUpForm />
    </div>
  );
}