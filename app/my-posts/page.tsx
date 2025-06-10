import { Navigation } from '@/components/navigation';
import { MyPostsView } from '@/components/my-posts-view';

export default function MyPosts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <MyPostsView />
    </div>
  );
}