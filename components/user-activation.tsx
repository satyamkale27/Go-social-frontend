'use client';

import { User, Check, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UserActivation() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <User className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Activate Your Gopher-Social Account
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Welcome to Gopher Social! To get started and access all features, 
          please activate your account by clicking the button below.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">i</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 mb-3">What happens after activation?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Access to create and share blog posts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>View and interact with the community feed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Personalize your profile and settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Connect with other Go developers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-8">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span>Account Status: Pending Activation</span>
        </div>
        
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 text-lg">
          <Heart className="h-5 w-5 mr-2" />
          Activate My Account
        </Button>
        
        <p className="text-sm text-gray-500 mt-6">
          Need help? <a href="#" className="text-cyan-600 hover:text-cyan-700">Contact Support</a>
        </p>
      </div>
    </div>
  );
}