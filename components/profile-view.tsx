"use client";

import { User, Mail, Calendar, Edit, LogOut, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAllUserPosts, getUserById } from "@/actions/fetchAllUserPosts";
import { toast } from "@/hooks/use-toast";
import { removeTokenInCookies } from "@/actions/auth";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  date: string;
  version: string;
  description: string;
  tags: string[];
};

export function ProfileView() {
  const router = useRouter();
  type user = {
    id?: string;
    username?: string;
    email?: string;
    created_at?: string;
    roleid?: string;
  };
  const [user, setUser] = useState<user>({});
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    handelGetUserById("241");
    fetchPosts();
  }, []);

  const handelGetUserById = async (id: string) => {
    try {
      const response = await getUserById(id);
      const roleid = response.data.role.id;

      setUser({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        created_at: response.data.created_at,
        roleid: roleid,
      });
      if (!response) throw new Error("failed to fetch user");
    } catch (error) {
      toast({
        title: "error",
        description: `${error}`,
      });
    }
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  function calculateAccountAge(createdAt: string) {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    const differenceInMilliseconds =
      currentDate.getTime() - createdDate.getTime();

    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  }

  function handleLogOut() {
    removeTokenInCookies();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/signin");
  }

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 ">
      <div className="mb-6 sm:mb-8 ">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Profile
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Manage your account settings and information
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {user.username}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span className="break-all">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {user.created_at ? formatDate(user.created_at) : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Information
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">User ID</span>
                  <span className="font-medium">{user.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Role ID</span>
                  <span className="font-medium">{user.roleid}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Status</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Statistics
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-medium text-cyan-600">
                    {posts.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Age</span>
                  <span className="font-medium">
                    {user.created_at
                      ? calculateAccountAge(user.created_at)
                      : "N/A"}{" "}
                    days
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Activity</span>
                  <span className="font-medium">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mt-4 sm:mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Account Actions
          </h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Manage your account settings and preferences
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Button
              variant="destructive"
              className="flex items-center space-x-2 w-full sm:w-auto"
              onClick={handleLogOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
