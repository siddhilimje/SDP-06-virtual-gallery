import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("vg_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem('vg_token') || null; } catch (e) { return null; }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("vg_fav");
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  });
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("vg_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem("vg_user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem("vg_fav", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("vg_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (token) localStorage.setItem('vg_token', token); else localStorage.removeItem('vg_token');
  }, [token]);

  function login(userObj, jwtToken) {
    setUser(userObj);
    setToken(jwtToken || null);
  }

  function logout() {
    setUser(null);
    setToken(null);
    setFavorites([]);
    setCart([]);
    localStorage.removeItem("vg_user");
    localStorage.removeItem("vg_fav");
    localStorage.removeItem("vg_cart");
    localStorage.removeItem('vg_token');
  }

  function addFavorite(item) {
    setFavorites(prev => {
      if (prev.find(p => p.id === item.id)) return prev;
      return [...prev, item];
    });
  }

  function removeFavorite(id) {
    setFavorites(prev => prev.filter(p => p.id !== id));
  }

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) return prev.map(p => p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    favorites,
    cart,
    login,
    logout,
    addFavorite,
    removeFavorite,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
