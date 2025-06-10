'use client';

import { Code, User, HelpCircle, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/my-posts', label: 'My Posts' },
    { href: '/create', label: 'Create Post' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-cyan-500 p-2 rounded-lg">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Gopher Social</span>
            <span className="text-lg font-bold text-gray-900 sm:hidden">GS</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-gray-600 hover:text-cyan-600 transition-colors duration-200 whitespace-nowrap",
                  pathname === item.href && "text-cyan-600 font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>
            <Link 
              href="/signin"
              className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              Login
            </Link>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link 
              href="/signin"
              className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors text-sm"
            >
              Login
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-gray-600 hover:text-cyan-600 transition-colors duration-200 py-2 px-4 rounded-md",
                    pathname === item.href && "text-cyan-600 font-medium bg-cyan-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between px-4 pt-2 border-t border-gray-200">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <HelpCircle className="h-5 w-5" />
                </button>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}