"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Hash,
  Edit3,
  Eye,
  Save,
  Send,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/actions/fetchAllUserPosts";
import { toast } from "@/hooks/use-toast";

export function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  console.log(tags);

  const createPostHandler = async () => {
    try {
      const payload = {
        title: title,
        content: content,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };

      const response = createPost(payload);
      if (!response) throw new Error("Error in creating post");
      toast({
        title: "success",
        description: "Post created",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
  };

  const popularTags = [
    "go",
    "backend",
    "api",
    "tutorial",
    "beginner",
    "testing",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:text-cyan-600">
            Home
          </Link>
          <span>›</span>
          <span>Create Post</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Create New Post
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Share your Go programming knowledge with the community
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Hash className="h-5 w-5 text-cyan-500" />
            <h3 className="text-lg font-semibold text-gray-900">Post Title</h3>
          </div>
          <Input
            placeholder="Enter your post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base sm:text-lg"
          />
          <p className="text-sm text-gray-500 mt-2">
            Choose a clear, descriptive title for your post
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Edit3 className="h-5 w-5 text-cyan-500" />
            <h3 className="text-lg font-semibold text-gray-900">Content</h3>
          </div>
          <Textarea
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[250px] sm:min-h-[300px] resize-none text-sm sm:text-base"
          />
          <p className="text-sm text-gray-500 mt-2">
            Share your knowledge, tips, or experiences with Go programming
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Hash className="h-5 w-5 text-cyan-500" />
            <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
          </div>
          <Input
            placeholder="Enter tags separated by commas (e.g., go, backend, api)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="text-sm sm:text-base"
          />
          <p className="text-sm text-gray-500 mt-2">
            Add relevant tags to help others discover your post
          </p>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Popular tags:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    const currentTags = tags
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean);
                    if (!currentTags.includes(tag)) {
                      setTags(currentTags.length > 0 ? `${tags}, ${tag}` : tag);
                    }
                  }}
                  className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm hover:bg-cyan-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              className="bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center space-x-2 w-full sm:w-auto"
              onClick={createPostHandler}
            >
              <Send className="h-4 w-4" />
              <span>Publish Post</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
