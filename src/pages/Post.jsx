import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setPost(data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="mb-4 text-gray-500 text-sm">by {post.author_email} on {new Date(post.created_at).toLocaleString()}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose" />
    </div>
  );
}