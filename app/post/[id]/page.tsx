import { Navigation } from '@/components/navigation';
import { BlogPostDetail } from '@/components/blog-post-detail';

export default function PostDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <BlogPostDetail />
    </div>
  );
}