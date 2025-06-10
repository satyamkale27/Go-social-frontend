import { Navigation } from '@/components/navigation';
import { AccountActivation } from '@/components/account-activation';

export default function ActivateAccount() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <AccountActivation />
    </div>
  );
}