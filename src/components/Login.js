import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import Captcha from "./Captcha";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHuman, setIsHuman] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!isHuman) newErrors.captcha = 'Please complete the CAPTCHA.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // Simulate success (local client-side auth)
    setSuccess('Login successful — redirecting...');
    login({ email, name: email.split("@")[0] || "User" });
    setTimeout(() => nav('/'), 900);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="tab-header">
          <button className="inactive" onClick={() => nav("/signup")}>Sign Up</button>
          <button className="active">Login</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e=>{ setEmail(e.target.value); setErrors(err=>({ ...err, email: undefined })); }} />
          {errors.email && <div className="input-error">{errors.email}</div>}
          <input type="password" placeholder="Password" value={password} onChange={e=>{ setPassword(e.target.value); setErrors(err=>({ ...err, password: undefined })); }} />
          {errors.password && <div className="input-error">{errors.password}</div>}
          <Captcha onChange={setIsHuman} />
          {errors.captcha && <div className="input-error">{errors.captcha}</div>}
          {errors.form && <div className="input-error">{errors.form}</div>}
          {success && <div className="form-success">{success}</div>}
          <div className="auth-switch">
            New user? <span onClick={() => nav("/signup")} className="auth-link">Sign Up</span>
          </div>
          <button type="submit" className="auth-submit">Login</button>
        </form>
      </div>
    </div>
  );
}
