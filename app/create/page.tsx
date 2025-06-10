import { Navigation } from '@/components/navigation';
import { CreatePostForm } from '@/components/create-post-form';

export default function CreatePost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <CreatePostForm />
    </div>
  );
}