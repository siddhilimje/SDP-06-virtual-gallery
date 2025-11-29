import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Home from "./components/Home";
import Artists from "./components/Artists";
import Purchase from "./components/Purchase";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ArtworkManager from "./components/ArtworkManager";
import Favorites from "./components/Favorites";
import Cart from "./components/Cart";
import "./styles/global.css";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import DarkModeProvider from "./context/DarkModeContext";

function Protected({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<Artists />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/favorites" element={
        <Protected>
          <Favorites />
        </Protected>
      } />
      <Route path="/cart" element={
        <Protected>
          <Cart />
        </Protected>
      } />
      <Route path="/manage-artworks" element={
        <Protected>
          <ArtworkManager />
        </Protected>
      } />
    </Routes>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Chatbot />
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;