import React from "react";
import "../styles/artists.css";

const ARTISTS = [
  {
    name: "Vincent van Gogh",
    lifespan: "30 March 1853 – 29 July 1890",
    desc:
      "Dutch Post-Impressionist painter, one of the most famous and influential in the history of art.",
    img: "https://images.unsplash.com/photo-1542343639-7959bc5a159c?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Raja Ravi Varma",
    lifespan: "29 April 1848 – 2 October 1906",
    desc:
      "Indian painter renowned for Indian sensibility and iconography, making art more accessible.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  }
];


export default function Artists() {
  return (
    <section className="artists-page">
      <h1>Featured Artists</h1>
      <div className="artists-grid">
        {ARTISTS.map(a => (
          <div className="artist-card" key={a.name}>
            <img src={a.img} alt={a.name} className="artist-img" />
            <div className="artist-info">
              <h2>{a.name}</h2>
              <span className="lifespan">{a.lifespan}</span>
              <p>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
