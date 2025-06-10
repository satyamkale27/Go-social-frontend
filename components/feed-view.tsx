'use client';

import { useState } from 'react';
import { Search, ChevronDown, Heart, MessageCircle, Share, Bookmark, HelpCircle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function FeedView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const popularTags = ['beginner', 'fan-out', 'testing', 'performance'];

  const posts = [
    {
      id: 1,
      user: {
        id: 112,
        name: 'User #112',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      date: 'April 21, 2025',
      title: 'Writing Unit Tests in Go',
      content: 'A collection of practical tips and tricks that can level up your Go development experience.',
      tags: ['fan-out', 'beginner'],
      likes: 24,
      comments: 8,
      bookmarked: false
    },
    {
      id: 2,
      user: {
        id: 89,
        name: 'User #89',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      date: 'April 20, 2025',
      title: 'Optimizing Go Performance',
      content: 'Learn how to profile and optimize your Go applications for better performance and memory usage.',
      tags: ['performance', 'optimization'],
      likes: 42,
      comments: 15,
      bookmarked: true
    },
    {
      id: 3,
      user: {
        id: 156,
        name: 'User #156',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      date: 'April 19, 2025',
      title: 'Concurrency Patterns in Go',
      content: 'Explore advanced concurrency patterns and best practices for building scalable Go applications.',
      tags: ['concurrency', 'patterns'],
      likes: 67,
      comments: 23,
      bookmarked: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters & Search</span>
          </Button>
        </div>

        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Filters & Search</h2>
            
            <div className="space-y-4 lg:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Posts
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort Order
                </label>
                <Select defaultValue="newest">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Tags
                </label>
                <Input
                  placeholder="Enter tags (comma-separated)"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                />
                
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Popular tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          const currentTags = tagFilter.split(',').map(t => t.trim()).filter(Boolean);
                          if (!currentTags.includes(tag)) {
                            setTagFilter(currentTags.length > 0 ? `${tagFilter}, ${tag}` : tag);
                          }
                        }}
                        className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-sm hover:bg-cyan-200 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posts per page
                </label>
                <Select defaultValue="20">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 posts</SelectItem>
                    <SelectItem value="20">20 posts</SelectItem>
                    <SelectItem value="50">50 posts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3">
          <div className="mb-4 lg:mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Feed</h1>
            <p className="text-gray-600 text-sm sm:text-base">Discover the latest Go programming insights and tips</p>
          </div>

          <div className="space-y-4 lg:space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <img
                      src={post.user.avatar}
                      alt={post.user.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{post.user.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <Bookmark className={`h-4 w-4 ${post.bookmarked ? 'fill-cyan-500 text-cyan-500' : 'text-gray-400'}`} />
                  </Button>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 leading-tight">{post.title}</h2>
                <p className="text-gray-700 mb-4 text-sm sm:text-base leading-relaxed">{post.content}</p>

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

                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 mt-6 lg:mt-8">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
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