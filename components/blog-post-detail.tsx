"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function BlogPostDetail({ id }: { id: string }) {
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(45);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        {/* Post Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1"
              alt="User #166"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                User #166
              </h3>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>April 21, 2025</span>
                <span>•</span>
                <span>Version 0</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark
                className={`h-4 w-4 ${
                  isBookmarked ? "fill-cyan-500 text-cyan-500" : "text-gray-400"
                }`}
              />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Post Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Working with JSON in Go
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm">
            command-line
          </span>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm">
            json
          </span>
        </div>

        {/* Post Content */}
        <div className="prose max-w-none mb-6 sm:mb-8">
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            This post introduces Go's built-in testing package and shows how to
            write and run unit tests.
          </p>

          <div className="bg-cyan-50 border-l-4 border-cyan-400 p-4 sm:p-6 mb-4 sm:mb-6">
            <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
              JSON (JavaScript Object Notation) is a lightweight
              data-interchange format that's easy for humans to read and write.
              In Go, working with JSON is straightforward thanks to the built-in
              encoding/json package.
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            The encoding/json package provides functions to marshal Go data
            structures into JSON and unmarshal JSON into Go data structures.
            This makes it perfect for building APIs and handling configuration
            files.
          </p>
        </div>

        {/* Post Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-t border-gray-200 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={handleLike}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart
                className={`h-4 w-4 sm:h-5 sm:w-5 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span className="text-sm sm:text-base">{likes} likes</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">12 comments</span>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Post ID: #207</div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mt-4 sm:mt-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          Comments
        </h2>

        {/* Add Comment */}
        <div className="flex items-start space-x-3 mb-4 sm:mb-6">
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1"
            alt="Current user"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <Textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[60px] sm:min-h-[80px] resize-none text-sm sm:text-base"
            />
            <div className="flex justify-end mt-3">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-sm sm:text-base">
                Post Comment
              </Button>
            </div>
          </div>
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
