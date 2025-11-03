import React, { useState } from "react";

import "../styles/purchase.css";

const PAINTINGS = [
  {
    id: 1,
    title: "Starry Night",
    artist: "Vincent van Gogh",
    price: 32000,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Scenery",
    artist: "Leonardo da Vinci",
    price: 40000,
    img: "https://tse1.mm.bing.net/th/id/OIP.I9afelB1o--7pyXew_AXnAHaE7?pid=Api&P=0&h=180"
  },
  {
    id: 3,
    title: "The Scream",
    artist: "Edvard Munch",
    price: 24500,
    img: "http://paintingandframe.com/art-imgs/edvard_munch/the_scream-35723.jpg"
  },
  {
    id: 4,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    price: 17800,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/960px-The_Night_Watch_-_HD.jpg"
  },
  {
    id: 5,
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    price: 15500,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/500px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg"
  },
  {
    id: 6,
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    price: 20000,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Whistlers_Mother_high_res.jpg/960px-Whistlers_Mother_high_res.jpg"
  }
];

export default function Purchase() {
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [paymentData, setPaymentData] = useState({
    name: "",
    card: "",
    expiry: "",
    cvv: ""
  });

  function openPayment(painting) {
    setSelectedPainting(painting);
    setShowModal(true);
    setSuccessMsg("");
    setPaymentData({
      name: "",
      card: "",
      expiry: "",
      cvv: ""
    });
  }

  function closeModal() {
    setShowModal(false);
    setSelectedPainting(null);
    setSuccessMsg("");
  }

  function handleChange(e) {
    setPaymentData({...paymentData, [e.target.name]: e.target.value});
  }

  function handlePay(e) {
    e.preventDefault();
    // Simulate validation, in real apps validate/input error handling here
    if(paymentData.name && paymentData.card && paymentData.expiry && paymentData.cvv){
      setSuccessMsg("Payment successful! Thank you for your purchase.");
      setTimeout(() => {
        setShowModal(false);
        setSuccessMsg("");
        setSelectedPainting(null);
      }, 2200);
    } else {
      setSuccessMsg("Please fill in all fields.");
    }
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
            <button className="purchase-btn" onClick={() => openPayment(p)}>
              Purchase
            </button>
          </div>
        ))}
      </div>
      
      {/* Payment Modal */}
      {showModal && selectedPainting && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <h2>Payment for "{selectedPainting.title}"</h2>
            <p><b>Artist:</b> {selectedPainting.artist} <br/>
            <b>Price:</b> ₹{selectedPainting.price.toLocaleString()}</p>
            <form onSubmit={handlePay} className="payment-form">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={paymentData.name}
                onChange={handleChange}
                autoFocus
                required
              />
              <input
                name="card"
                type="text"
                maxLength={16}
                minLength={12}
                pattern="[0-9]*"
                placeholder="Card Number"
                value={paymentData.card}
                onChange={handleChange}
                required
              />
              <div style={{display:"flex", gap:8}}>
                <input
                  name="expiry"
                  type="text"
                  maxLength={5}
                  placeholder="MM/YY"
                  value={paymentData.expiry}
                  onChange={handleChange}
                  required
                  style={{flex:1}}
                />
                <input
                  name="cvv"
                  type="password"
                  maxLength={4}
                  placeholder="CVV"
                  value={paymentData.cvv}
                  onChange={handleChange}
                  required
                  style={{flex:1}}
                />
              </div>
              <button type="submit" className="purchase-btn" style={{width: "100%", marginTop: 12}}>
                Pay Now
              </button>
              {successMsg && (
                <p className="payment-success" style={{
                  marginTop: 12,
                  color: successMsg.includes("successful") ? "green" : "red"
                }}>{successMsg}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
