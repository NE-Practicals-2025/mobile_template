import axios from "axios";
import { useState, useEffect } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
        );
        setPosts(response.data);
      } catch {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const createPost = async (post: Omit<Post, "id">) => {
    try {
      const response = await axios.post<Post>(
        "https://jsonplaceholder.typicode.com/posts",
        post,
      );
      setPosts((prev) => [response.data, ...prev]);
    } catch {
      setError("Failed to create post");
    }
  };

  const deletePost = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch {
      setError("Failed to delete post");
    }
  };

  return { posts, loading, error, createPost, deletePost };
};

export default usePosts;
