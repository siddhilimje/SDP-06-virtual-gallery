import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(AuthContext);

  const totalItems = cart.reduce((s,i)=> s + (i.qty||1), 0);

  return (
    <section style={{maxWidth:900, margin:'28px auto', padding:12}}>
      <h1>Your Cart</h1>
      {cart.length === 0 && <div style={{color:'#777'}}>Your cart is empty.</div>}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16, marginTop:12}}>
        {cart.map(item => (
          <div key={item.id} style={{background:'#fff', padding:12, borderRadius:10, boxShadow:'0 2px 8px #eee'}}>
            <img src={item.preview} alt={item.title} style={{width:'100%', height:150, objectFit:'cover', borderRadius:8}} />
            <h3 style={{marginTop:8}}>{item.title}</h3>
            <div>Quantity: {item.qty || 1}</div>
            <div style={{display:'flex', gap:8, marginTop:8}}>
              <button className="btn-main btn-secondary" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{marginTop:18, display:'flex', gap:12, alignItems:'center'}}>
          <div style={{fontWeight:600}}>Items: {totalItems}</div>
          <button className="btn-main" onClick={() => alert('Checkout flow not implemented.')}>Checkout</button>
          <button className="btn-main btn-secondary" onClick={() => clearCart()}>Clear Cart</button>
        </div>
      )}
    </section>
  );
}
