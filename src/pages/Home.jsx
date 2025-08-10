import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id,title,created_at,author_email")
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts(data || []));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recent Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2">
            <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline text-lg">
              {post.title}
            </Link>
            <div className="text-xs text-gray-500">by {post.author_email} on {new Date(post.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}