import React from "react";
import "../styles/about.css";

export default function About() {
  return (
    <section className="about-page">
      <div className="about-card">
        <h1>About ArtConnect</h1>
        <p>
          ArtConnect is a virtual art gallery designed to bring artists and art enthusiasts together.<br />
          Our platform celebrates artistic expression by showcasing diverse artworks, from traditional paintings to modern digital creations.<br />
          <br />
          <b>With ArtConnect, we aim to:</b>
        </p>
        <ul>
          <li>
            <b>Empower Artists:</b> Provide a digital stage where both emerging and established artists can display their work to a global audience.
          </li>
          <li>
            <b>Engage Viewers:</b> Offer immersive ways to explore and connect with artworks anytime, anywhere.
          </li>
          <li>
            <b>Encourage Collaboration:</b> Build a community where creativity thrives, and meaningful connections are formed between creators and collectors.
          </li>
          <li>
            <b>Simplify Art Access:</b> Make discovering, appreciating, and purchasing art easy and user-friendly.
          </li>
        </ul>
        <p>
          Whether you’re here to admire, collect, or create, ArtConnect is your bridge to a world of creativity.
        </p>
        <div className="about-contact">
          Contact us: <b>XXXXXXXXXX</b> | ArtConnect2025@gmail.com
        </div>
      </div>
    </section>
  );
}
