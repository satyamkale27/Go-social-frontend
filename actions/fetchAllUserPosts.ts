"use client";
import axios from "axios";

export const getAllUserPosts = async () => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Authorization token not found in cookies.");
    }

    const response = await axios.get(
      "http://localhost:8080/v1/posts/allUserPosts",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
