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

export const deleteUserPostById = async (id: string) => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Authorization token not found in cookies.");
    }

    const response = await axios.delete(
      `http://localhost:8080/v1/posts/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status != 204) throw new Error("Error in deleting post");
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (id: string) => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Authorization token not found in cookies.");
    }

    const response = await axios.get(`http://localhost:8080/v1/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status != 200) throw new Error("Error in Fetching post");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followUserById = async (id: string) => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Authorization token not found in cookies.");
    }

    const response = await axios.put(
      `http://localhost:8080/v1/users/${id}/follow`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const createComment = async (id: string, content: string) => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    if (!token) {
      throw new Error("Authorization token not found in cookies.");
    }

    const response = await axios.post(
      `http://localhost:8080/v1/posts/${id}/comment`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status != 201) throw new Error("Error in creating comment");
    return response.data;
  } catch (error) {
    throw error;
  }
};
