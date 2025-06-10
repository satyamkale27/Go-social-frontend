'use client';

import { useState } from 'react';
import { Edit, Eye, Save, Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function EditPostForm() {
  const [title, setTitle] = useState('ayush dixit post');
  const [content, setContent] = useState('started learning go lang');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
            <Edit className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Post</h1>
            <p className="text-gray-600 text-sm sm:text-base">Update your blog post content</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base sm:text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] sm:min-h-[400px] resize-none text-sm sm:text-base"
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 space-y-1 sm:space-y-0">
              <p className="text-sm text-gray-500">
                Write your thoughts, tutorials, or insights about Go programming
              </p>
              <span className="text-sm text-gray-500">
                {content.length} characters
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 border-t border-gray-200 space-y-3 sm:space-y-0">
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" className="flex items-center justify-center space-x-2 w-full sm:w-auto">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </Button>
              <Button variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 flex items-center justify-center space-x-2 w-full sm:w-auto">
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center space-x-2 w-full sm:w-auto">
                <Check className="h-4 w-4" />
                <span>Update Post</span>
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