"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, setTokenInCookies } from "@/actions/auth";
import { toast } from "@/hooks/use-toast"; // Import the toast function

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state
  const router = useRouter();

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and include a number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email and password before proceeding
    if (emailError || passwordError) {
      toast({
        title: "Error",
        description: "Please fix the validation errors before submitting.",
      });
      return;
    }

    setLoading(true); // Show loader

    try {
      const token = await login(email, password); // Fetch token
      setTokenInCookies(token); // Store token in cookies
      window.location.href = "/";
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description:
            "Unable to log in. Please check your credentials and try again.",
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
        });
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-16">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Sign in to your Gopher Social account
          </p>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validatePassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg flex items-center justify-center"
            disabled={loading} // Disable button while loading
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-cyan-600 hover:text-cyan-700 font-medium"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
