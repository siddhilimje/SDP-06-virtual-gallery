import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import Captcha from "./Captcha";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const nav = useNavigate();
  const { login } = useContext(AuthContext);
  const [isHuman, setIsHuman] = useState(false);

  function handleSignup(e) {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = 'Full name is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email.';
    if (!pass) newErrors.pass = 'Password is required.';
    else if (pass.length < 6) newErrors.pass = 'Password must be at least 6 characters.';
    if (!isHuman) newErrors.captcha = 'Please complete the CAPTCHA.';
    if (!confirmPass) newErrors.confirm = 'Please confirm your password.';
    if (pass && confirmPass && pass !== confirmPass) newErrors.confirm = 'Passwords do not match.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    // Simulate signup success (local client-side behavior)
    setSuccess('Signup successful — redirecting...');
    login({ email, name });
    setTimeout(() => nav('/'), 900);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="tab-header">
          <button className="active">Sign Up</button>
          <button className="inactive" onClick={() => nav("/login")}>Login</button>
        </div>
        <form className="auth-form" onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={name} onChange={e=>{ setName(e.target.value); setErrors(err=>({ ...err, name: undefined })); }} />
          {errors.name && <div className="input-error">{errors.name}</div>}
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          {errors.email && <div className="input-error">{errors.email}</div>}
          <input type="password" placeholder="Create Password" value={pass} onChange={e=>{ setPass(e.target.value); setErrors(err=>({ ...err, pass: undefined })); }} required />
          {errors.pass && <div className="input-error">{errors.pass}</div>}
          <input type="password" placeholder="Confirm Password" value={confirmPass} onChange={e=>{ setConfirmPass(e.target.value); setErrors(err=>({ ...err, confirm: undefined })); }} required />
          {errors.confirm && <div className="input-error">{errors.confirm}</div>}
          <Captcha onChange={setIsHuman} />
          {errors.captcha && <div className="input-error">{errors.captcha}</div>}
          {errors.form && <div className="input-error">{errors.form}</div>}
          {success && <div className="form-success">{success}</div>}
          <div className="auth-switch">
            Already have an account? <span onClick={() => nav("/login")} className="auth-link">Login</span>
          </div>
          <button type="submit" className="auth-submit">Create</button>
        </form>
      </div>
    </div>
  );
}
