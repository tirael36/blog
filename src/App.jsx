import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./UserContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchRole();
    } else {
      setRole(null);
    }
  }, [user]);

  async function fetchRole() {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    setRole(data?.role ?? "user");
  }

  function logout() {
    supabase.auth.signOut();
    setUser(null);
    setRole(null);
    navigate("/");
  }

  return (
    <UserContext.Provider value={{ user, role }}>
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <Link to="/" className="font-bold text-lg">Video Game Blog</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">{user.email} ({role})</span>
              {(role === "admin" || role === "author") && (
                <Link to="/editor" className="mr-4">New Post</Link>
              )}
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </UserContext.Provider>
  );
}