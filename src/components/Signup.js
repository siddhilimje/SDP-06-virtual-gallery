import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    if (name && email && pass) {
      alert("Signup success (demo)");
      nav("/login");
    } else {
      alert("Please fill all fields.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="tab-header">
          <button className="active">Sign Up</button>
          <button className="inactive" onClick={() => nav("/login")}>Login</button>
        </div>
        <form className="auth-form" onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Create Password" value={pass} onChange={e=>setPass(e.target.value)} required />
          <div className="auth-switch">
            Already have an account? <span onClick={() => nav("/login")} className="auth-link">Login</span>
          </div>
          <button type="submit" className="auth-submit">Create</button>
        </form>
      </div>
    </div>
  );
}
