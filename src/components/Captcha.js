import React, { useEffect, useRef, useState } from 'react';
import '../styles/auth.css';

function randomText(length = 5) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i = 0; i < length; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

export default function Captcha({ length = 5, onChange }) {
  const canvasRef = useRef(null);
  const [code, setCode] = useState(() => randomText(length));
  const [input, setInput] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => draw(), [code]);

  useEffect(() => {
    const isValid = input.trim().toLowerCase() === code.trim().toLowerCase();
    setValid(isValid);
    if (onChange) onChange(isValid);
  }, [input, code, onChange]);

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 160;
    const h = canvas.height = 50;

    // background
    ctx.fillStyle = '#f3eef9';
    ctx.fillRect(0, 0, w, h);

    // noise lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random()*120)},${Math.floor(Math.random()*80)},${Math.floor(Math.random()*160)},0.25)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.lineTo(Math.random() * w, Math.random() * h);
      ctx.stroke();
    }

    // draw text with random rotation per char
    const txt = code;
    const fontSize = 26;
    ctx.textBaseline = 'middle';
    for (let i = 0; i < txt.length; i++) {
      const ch = txt.charAt(i);
      const x = 12 + i * (w - 24) / txt.length;
      const y = h / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() * 0.4 - 0.2);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `rgb(${60 + Math.random()*120}, ${30 + Math.random()*80}, ${80 + Math.random()*80})`;
      ctx.font = `${fontSize + Math.floor(Math.random()*6-3)}px serif`;
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    }

    // dots
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random()*0.15})`;
      ctx.beginPath();
      ctx.arc(Math.random()*w, Math.random()*h, Math.random()*2, 0, Math.PI*2);
      ctx.fill();
    }
  }

  function refresh() {
    setCode(randomText(length));
    setInput('');
  }

  return (
    <div className="captcha-container">
      <canvas ref={canvasRef} className="captcha-canvas" aria-label="captcha image" />
      <div className="captcha-controls">
        <input
          className="captcha-input"
          placeholder="Enter characters"
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label="Enter captcha text"
        />
        <button type="button" className="captcha-refresh" onClick={refresh} title="Refresh captcha">↻</button>
      </div>
      <div className="captcha-hint">{valid ? <span className="captcha-valid">Verified</span> : <span className="captcha-invalid">Type the characters shown above</span>}</div>
    </div>
  );
}
