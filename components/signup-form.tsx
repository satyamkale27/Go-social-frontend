"use client";

import { useState } from "react";
import { UserPlus, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { registerUser } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and include a number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (emailError || passwordError) {
      toast({
        title: "Error",
        description: "Please fix the validation errors before submitting.",
      });
      return;
    }

    setLoading(true);

    try {
      const userDetails = { email, password, username };
      const response = await registerUser(userDetails);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      router.push("/signin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description:
            err.message ||
            "An error occurred while creating your account. Please try again.",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

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

        <form className="space-y-4 sm:space-y-6" onSubmit={handleSignUp}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
              className="w-full"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validatePassword(e.target.value)}
              className="w-full"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <Button
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* 🔔 Email verification note */}
          <div className="mt-3 text-sm text-gray-600 text-center">
            After creating your account, please verify your email by clicking
            the link sent to you. <br className="hidden sm:block" />
            <span className="font-medium text-gray-800">
              Check your spam or junk folder if you don't see it.
            </span>
          </div>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
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
