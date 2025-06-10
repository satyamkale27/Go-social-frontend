import { Navigation } from '@/components/navigation';
import { ProfileView } from '@/components/profile-view';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <ProfileView />
    </div>
  );
}