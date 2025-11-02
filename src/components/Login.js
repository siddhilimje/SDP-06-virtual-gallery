import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      alert("Login success (demo)");
      nav("/");
    } else {
      alert("Please enter E-mail and Password.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="tab-header">
          <button className="inactive" onClick={() => nav("/signup")}>Sign Up</button>
          <button className="active">Login</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <div className="auth-switch">
            New user? <span onClick={() => nav("/signup")} className="auth-link">Sign Up</span>
          </div>
          <button type="submit" className="auth-submit">Login</button>
        </form>
      </div>
    </div>
  );
}
