import { Navigation } from '@/components/navigation';
import { FeedView } from '@/components/feed-view';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <FeedView />
    </div>
  );
}