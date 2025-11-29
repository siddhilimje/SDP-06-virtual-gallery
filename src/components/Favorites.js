import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites, removeFavorite, addToCart } = useContext(AuthContext);

  return (
    <section style={{maxWidth:900, margin:'28px auto', padding:12}}>
      <h1>Your Favorites</h1>
      {favorites.length === 0 && <div style={{color:'#777'}}>You have no favorite artworks yet.</div>}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16, marginTop:12}}>
        {favorites.map(a => (
          <div key={a.id} style={{background:'#fff', padding:12, borderRadius:10, boxShadow:'0 2px 8px #eee'}}>
            <img src={a.preview} alt={a.title} style={{width:'100%', height:150, objectFit:'cover', borderRadius:8}} />
            <h3 style={{marginTop:8}}>{a.title}</h3>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              <button className="btn-main" onClick={() => addToCart(a)}>Add to Cart</button>
              <button className="btn-main btn-secondary" onClick={() => removeFavorite(a.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:18}}>
        <Link to="/purchase">Proceed to Purchase</Link>
      </div>
    </section>
  );
}
