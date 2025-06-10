'use client';

import { useState } from 'react';
import { UserPlus, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <UserPlus className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Join Gopher Social
          </h1>
          
          <p className="text-gray-600 text-sm sm:text-base">
            Create your account to start sharing
          </p>
        </div>

        <form className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3">
            Create Account
          </Button>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-cyan-600 hover:text-cyan-700 font-medium">
              Sign In
            </Link>
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