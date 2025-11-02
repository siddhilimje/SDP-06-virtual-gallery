import React, { useState } from "react";
import "../styles/home.css";

const ARTWORKS = [
  {
    id: 1,
    title: "Starry Night",
    artist: "Vincent van Gogh",
    desc: "A masterpiece of swirling night skies and vibrant colors.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    desc: "Known for her enigmatic smile, the most famous portrait in the world.",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "The Scream",
    artist: "Edvard Munch",
    desc: "An iconic expression of human emotion and anxiety.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
  }
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = ARTWORKS.filter(
    art =>
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="gallery-page">
      <h1>Welcome to ArtConnect!</h1>
      <p className="subtitle">Experience art in a virtual world</p>
      <p className="info">Browse, collect, and explore artworks from anywhere.</p>
      <input
        className="home-search"
        type="text"
        placeholder="Search artworks or artists..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="gallery-grid">
        {filtered.map(art => (
          <div className="gallery-card" key={art.id}>
            <img src={art.img} alt={art.title} className="gallery-img" />
            <h2>{art.title}</h2>
            <span className="artist">{art.artist}</span>
            <p>{art.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
