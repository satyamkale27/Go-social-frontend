'use client';

import { Users, Calendar, Tag, ExternalLink, Trash2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MyPostsView() {
  const posts = [
    {
      id: 251,
      title: "Writing Unit Tests in Go",
      date: "21/04/2025",
      version: "v2",
      description: "A collection of practical tips and tricks that can level up your Go development experience. This comprehensive guide covers everything from basic test structure to advanced testing patterns.",
      tags: ["testing", "golang", "unit-tests", "beginner"]
    },
    {
      id: 207,
      title: "Working with JSON in Go",
      date: "20/04/2025",
      version: "v1",
      description: "This post introduces Go's built-in JSON package and shows how to marshal and unmarshal JSON data effectively in your applications.",
      tags: ["json", "golang", "data-processing"]
    },
    {
      id: 189,
      title: "Go Concurrency Patterns",
      date: "18/04/2025",
      version: "v3",
      description: "Explore advanced concurrency patterns in Go including worker pools, fan-out/fan-in, and pipeline patterns for building robust concurrent applications.",
      tags: ["golang", "concurrency", "patterns"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Posts</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage and view all your published posts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-1">3</div>
            <div className="text-gray-600 text-sm sm:text-base">Total Posts</div>
          </div>
          <div className="text-center bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">0</div>
            <div className="text-gray-600 text-sm sm:text-base">This Week</div>
          </div>
          <div className="text-center bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">3</div>
            <div className="text-gray-600 text-sm sm:text-base">Latest Version</div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">{post.title}</h3>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
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
              
              <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">{post.description}</p>
              
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
                <Button variant="outline" className="text-cyan-600 border-cyan-200 hover:bg-cyan-50 w-full sm:w-auto">
                  View Details
                </Button>
              </div>
            </div>
          ))}
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