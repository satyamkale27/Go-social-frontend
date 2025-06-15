import { Navigation } from "@/components/navigation";
import { BlogPostDetail } from "@/components/blog-post-detail";

interface PostDetailProps {
  params: { id: string };
}

export default function PostDetail({ params }: PostDetailProps) {
  const { id } = params;
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <BlogPostDetail id={id} />
    </div>
  );
}
