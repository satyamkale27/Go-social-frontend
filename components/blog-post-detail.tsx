"use client";

import { useState, useEffect } from "react";
import { Bookmark, Share, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getPostById } from "@/actions/fetchAllUserPosts";
import { toast } from "@/hooks/use-toast";

export function BlogPostDetail({ id }: { id: string }) {
  const [post, setPost] = useState<{
    id: number;
    content: string;
    title: string;
    user_id: number;
    tags: string[];
    created_at: string;
    updated_at: string;
    version: number;
    comment: [];
  } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        console.log(data.data.comments);
        if (data !== undefined && data !== null) {
          setPost(data.data);
        } else {
          throw new Error("No post data returned from getPostById");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `${error}`,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleShare = () => {
    const url = `${window.location.origin}/my-posts/post/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err);
      });
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <p className="text-gray-500 text-center text-lg sm:text-xl font-semibold">
            Something went wrong. Please verify the existence of the post.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        {/* Post Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <img
              src={`https://robohash.org/${post.user_id}.png?size=50x50`}
              alt={`User #${post.user_id}`}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                User #{post.user_id}
              </h3>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>Version {post.version}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-sm sm:text-base">
              Follow
            </Button>
            <Button variant="ghost" size="sm">
              <Bookmark className="h-4 w-4 text-gray-400" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Post Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          {post.tags && post.tags.length > 0 ? (
            post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm"
              >
                {tag}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm sm:text-base">
              No tags available for this post.
            </p>
          )}
        </div>

        {/* Post Content */}
        <div className="prose max-w-none mb-6 sm:mb-8">
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            {post.content}
          </p>
        </div>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <Button
          size="icon"
          className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg"
        >
          <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
    </div>
  );
}
