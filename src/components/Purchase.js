import React, { useState } from "react";
import "../styles/purchase.css";

// Sample paintings data with random web images
const PAINTINGS = [
  {
    id: 1,
    title: "Starry Night",
    artist: "Vincent van Gogh",
    price: 32000000,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    price: 40000000,
    img: "https://images.unsplash.com/photo-1465101178521-cce3f49234c2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "The Scream",
    artist: "Edvard Munch",
    price: 24500000,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    price: 17800000,
    img: "https://images.unsplash.com/photo-1533089860892-a7f992034fec?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    price: 15500000,
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80"
  }
];

export default function Purchase() {
  const [cart, setCart] = useState([]);

  function handleBuy(id) {
    if (!cart.includes(id)) setCart([...cart, id]);
  }

  return (
    <section className="purchase-page">
      <h1>Buy Paintings</h1>
      <div className="purchase-grid">
        {PAINTINGS.map(p => (
          <div className="purchase-card" key={p.id}>
            <img src={p.img} alt={p.title} className="purchase-img" />
            <h2>{p.title}</h2>
            <span className="purchase-artist">{p.artist}</span>
            <span className="purchase-price">₹{p.price.toLocaleString()}</span>
            <button
              className="purchase-btn"
              onClick={() => handleBuy(p.id)}
              disabled={cart.includes(p.id)}
            >
              {cart.includes(p.id) ? "In Cart" : "Buy"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
