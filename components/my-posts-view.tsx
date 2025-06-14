"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  Tag,
  ExternalLink,
  Trash2,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllUserPosts } from "@/actions/fetchAllUserPosts";
import { deleteUserPostById } from "@/actions/fetchAllUserPosts";
import { toast } from "@/hooks/use-toast";

type Post = {
  id: string;
  title: string;
  date: string;
  version: string;
  description: string;
  tags: string[];
};

export function MyPostsView() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllUserPosts();

        const postsData = response.data;

        if (Array.isArray(postsData)) {
          setPosts(
            postsData.map((post) => ({
              id: post.id,
              title: post.title,
              date: new Date(post.created_at).toLocaleDateString(),
              version: `v${post.version}`,
              description: post.content.substring(0, 150) + "...",
              tags: post.tags,
            }))
          );
        } else {
          toast({
            title: "Error",
            description: "Unexpected response format from the server.",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `${
            error instanceof Error ? error.message : "An unknown error occurred"
          }`,
        });
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id: string) => {
    try {
      await deleteUserPostById(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: `${
          error instanceof Error ? error.message : "An unknown error occurred"
        }`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              My Posts
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage and view all your published posts
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                {post.title}
              </h3>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeletePost(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Tag className="h-4 w-4" />
                <span>{post.version}</span>
              </div>
              <span>ID: {post.id}</span>
            </div>

            <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-xs sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                className="text-cyan-600 border-cyan-200 hover:bg-cyan-50 w-full sm:w-auto"
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
