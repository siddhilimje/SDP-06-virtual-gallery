import React, { useEffect, useRef, useState } from 'react';
import '../styles/chatbot.css';

const BOT_NAME = 'ArtConnect Bot';

const cannedReply = (text) => {
  const t = text.toLowerCase();
  if (/hi|hello|hey/.test(t)) return `Hello! I'm ${BOT_NAME}. How can I help you today? Try "artists", "home", or "buy".`;
  if (/artist|artists/.test(t)) return 'You can explore our artists here: /artists';
  if (/home|gallery/.test(t)) return 'Open the gallery: /';
  if (/buy|purchase|price/.test(t)) return 'To purchase an artwork, visit the Purchase page: /purchase';
  if (/contact|email/.test(t)) return 'You can contact us at ArtConnect2025@gmail.com';
  return null;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: `Hi — I'm ${BOT_NAME}. Ask me about artworks, artists, or navigation.` }
  ]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  async function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(m => [...m, userMsg]);
    setInput('');

    // quick canned match
    const canned = cannedReply(text);
    if (canned) {
      setTimeout(() => setMessages(m => [...m, { id: Date.now()+1, sender: 'bot', text: canned }]), 400);
      return;
    }

    // Try calling a backend API (optional). If not available, fallback.
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data.reply || 'Sorry, I could not generate a response.';
        setMessages(m => [...m, { id: Date.now()+2, sender: 'bot', text: reply }]);
      } else {
        throw new Error('no api');
      }
    } catch (err) {
      // fallback reply
      setMessages(m => [...m, { id: Date.now()+3, sender: 'bot', text: "Sorry, I couldn't fetch an answer. Try asking about 'artists', 'home' or 'purchase'." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className={`chatbot-root ${open ? 'open' : ''}`}>
      <div className="chatbot-panel" aria-hidden={!open}>
        <div className="chatbot-header">
          <strong>{BOT_NAME}</strong>
          <button className="chatbot-close" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="chatbot-list" ref={listRef}>
          {messages.map(m => (
            <div key={m.id} className={`chat-msg ${m.sender}`}>
              <div className="chat-text">{m.text.split(/\n/).map((line,i)=>(<span key={i}>{line}<br/></span>))}</div>
            </div>
          ))}
          {loading && <div className="chat-msg bot"><div className="chat-text">Thinking…</div></div>}
        </div>
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
      </div>

      <button className="chatbot-toggle" onClick={() => setOpen(o => !o)} aria-label="Open chat">
        💬
      </button>
    </div>
  );
}
