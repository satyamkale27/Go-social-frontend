"use client";

import { useState, useEffect } from "react";
import { Bookmark, Share, HelpCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { followUserById, getPostById } from "@/actions/fetchAllUserPosts";
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github";

// register language
SyntaxHighlighter.registerLanguage("javascript", js);

type Post = {
  user_id: string | number;
  created_at: string;
  version: string | number;
  title: string;
  tags?: string[];
  content: string;
  comment: string[]; // Added comment field
};
type Comment = {
  id: string | number;
  user: {
    username: string;
  };
  content: string;
  created_at: string;
};

export function BlogPostDetail({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        if (data?.data) {
          setPost(data.data);
          setComments(data.data.comment || []);
        } else {
          throw new Error("No post data returned");
        }
      } catch (error) {
        toast({ title: "Error", description: `${error}` });
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: Date.now(),
          user: { username: "You" },
          content: newComment,
          created_at: new Date().toISOString(),
        },
      ]);
      setNewComment("");
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/my-posts/post/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy URL:", err));
  };

  const handleFollow = async (id: string) => {
    try {
      await followUserById(id);
      toast({ title: "Success", description: "Followed successfully" });
    } catch {
      toast({ title: "Error", description: "Already Followed user" });
    }
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <p className="text-gray-500 text-center text-lg font-semibold">
            Something went wrong. Please verify the existence of the post.
          </p>
        </div>
      </div>
    );
  }

  const MarkdownRender = () => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        code({ className, children }) {
          const language = className?.replace("language-", "") || "plaintext";

          const handleCopy = () => {
            navigator.clipboard.writeText(String(children));
            toast({ title: "Copied", description: "Code copied to clipboard" });
          };

          return (
            <div className="relative my-4">
              <button
                className="absolute top-2 right-2 bg-gray-100 p-1 rounded shadow"
                onClick={handleCopy}
              >
                <Copy size={14} />
              </button>
              <SyntaxHighlighter
                language={language}
                style={github}
                className="rounded-lg"
              >
                {String(children).trim()}
              </SyntaxHighlighter>
            </div>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 underline"
            >
              {children}
            </a>
          );
        },
      }}
    >
      {post.content}
    </ReactMarkdown>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={`https://robohash.org/${post.user_id}.png?size=50x50`}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                User #{post.user_id}
              </h3>
              <div className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()} • Version{" "}
                {post.version}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              className="bg-cyan-500"
              onClick={() => handleFollow(post.user_id.toString())}
            >
              Follow
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="prose max-w-none text-gray-700">
          <MarkdownRender />
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-100 rounded-lg p-3 text-gray-700 text-sm"
                >
                  <p className="font-semibold text-gray-900">
                    {comment.user.username}
                  </p>
                  <p className="text-gray-700">{comment.content}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 text-sm"
            />
            <Button
              className="mt-2 bg-cyan-500 hover:bg-cyan-600 text-sm"
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-4 right-4">
        <Button
          size="icon"
          className="bg-blue-600 rounded-full shadow-lg w-12 h-12"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
