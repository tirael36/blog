import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else navigate("/login");
  }

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-xl mb-4 font-bold">Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}