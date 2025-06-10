import { Navigation } from '@/components/navigation';
import { EditPostForm } from '@/components/edit-post-form';

export default function EditPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <EditPostForm />
    </div>
  );
}