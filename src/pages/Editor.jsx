import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { UserContext } from "../UserContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor() {
  const { user, role } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!(role === "admin" || role === "author")) {
    return <div className="p-4 text-red-500">Access denied.</div>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await supabase.from("posts").insert([
      {
        title,
        content,
        author_email: user.email
      }
    ]);
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <ReactQuill theme="snow" value={content} onChange={setContent} className="mb-4" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}