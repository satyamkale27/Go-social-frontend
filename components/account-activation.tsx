"use client";

import { useEffect, useState } from "react";
import { User, Check, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { activateUserByToken } from "@/actions/auth";

export function AccountActivation({ id }: { id: string }) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const activate = async () => {
      setStatus("loading");
      try {
        await activateUserByToken(id);
        setStatus("success");
      } catch (err: any) {
        // Handle Axios or fetch-style error with status code
        const statusCode = err?.response?.status || err?.status;

        if (statusCode === 401) {
          setErrorMsg(
            "Activation link is invalid or has expired. Please request a new one."
          );
        } else {
          setErrorMsg("Something went wrong. Please contact the Admin.");
        }

        setStatus("error");
      }
    };

    activate();
  }, [id]);

  const renderStatusMessage = () => {
    if (status === "loading") {
      return (
        <p className="text-sm text-gray-500 mt-4">Activating your account...</p>
      );
    }

    if (status === "success") {
      return (
        <div className="flex items-center justify-center gap-2 text-green-600 mt-6">
          <Check className="w-5 h-5" />
          <span>Your account has been successfully activated!</span>
        </div>
      );
    }

    if (status === "error" && errorMsg) {
      return (
        <div className="flex items-center justify-center gap-2 text-red-600 mt-6">
          <XCircle className="w-5 h-5" />
          <span>{errorMsg}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
          <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Activate Your Gopher-Social Account
        </h1>

        {renderStatusMessage()}
      </div>
    </div>
  );
}
