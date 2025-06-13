"use client";
import axios from "axios";
import { Toast } from "@/components/ui/toast";

export const fetchUserFeed = async (params: object) => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Authorization token not found in cookies.");
    }

    const response = await axios.get("http://localhost:8080/v1/users/feed", {
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
