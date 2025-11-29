import React, { useState, useContext } from "react";
import "../styles/home.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const ARTWORKS = [
  {
    id: 1,
    title: "Starry Night",
    artist: "Vincent van Gogh",
    desc: "A masterpiece of swirling night skies and vibrant colors.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/960px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    wiki: "https://en.wikipedia.org/wiki/The_Starry_Night"
  },
  {
    id: 2,
    title: "Mona Lisa",
    artist: "Leonardo da Vinci",
    desc: "Known for her enigmatic smile, the most famous portrait in the world.",
    img: "https://www.artchive.com/wp-content/uploads/2023/04/Mona-Lisa-Leonardo-da-Vinci-c.-1503-4-4-scaled.jpg",
    wiki: "https://en.wikipedia.org/wiki/Mona_Lisa"
  },
  {
    id: 3,
    title: "The Scream",
    artist: "Edvard Munch",
    desc: "An iconic expression of human emotion and anxiety.",
    img: "http://paintingandframe.com/art-imgs/edvard_munch/the_scream-35723.jpg",
    wiki: "https://en.wikipedia.org/wiki/The_Scream"
  },
  {
  id: 4,
  title: "The Night Watch",
  artist: "Rembrandt van Rijn",
  desc: "A grand and dramatic group portrait of a city militia in Amsterdam.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/960px-The_Night_Watch_-_HD.jpg",
  wiki: "https://en.wikipedia.org/wiki/The_Night_Watch_(painting)"
},
{
  id: 5,
  title: "American Gothic",
  artist: "Grant Wood",
  desc: "An iconic depiction of rural American life, symbolizing strength and resilience.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/500px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
  wiki: "https://en.wikipedia.org/wiki/American_Gothic"
},
{
  id: 6,
  title: "Whistler’s Mother",
  artist: "James McNeill Whistler",
  desc: "A solemn portrait often seen as a symbol of motherhood and dignity.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Whistlers_Mother_high_res.jpg/960px-Whistlers_Mother_high_res.jpg"
},
{
  id: 7,
  title: "Liberty Leading the People",
  artist: "Eugène Delacroix",
  desc: "A powerful symbol of revolution and freedom during the July Revolution of 1830.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/La_Libert%C3%A9_guidant_le_peuple_-_Eug%C3%A8ne_Delacroix_-_Mus%C3%A9e_du_Louvre_Peintures_RF_129_-_apr%C3%A8s_restauration_2024.jpg/960px-La_Libert%C3%A9_guidant_le_peuple_-_Eug%C3%A8ne_Delacroix_-_Mus%C3%A9e_du_Louvre_Peintures_RF_129_-_apr%C3%A8s_restauration_2024.jpg"
},
{
  id: 8,
  title: "Las Meninas",
  artist: "Diego Velázquez",
  desc: "A complex and mysterious composition blending royal portraiture and self-reference.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/500px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg"
},
{
  id: 9,
  title: "The Great Wave off Kanagawa",
  artist: "Hokusai",
  desc: "A famous Japanese woodblock print showing a towering wave over boats near Mount Fuji.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/960px-Tsunami_by_hokusai_19th_century.jpg"
},
{
  id: 10,
  title: "The Garden of Earthly Delights",
  artist: "Hieronymus Bosch",
  desc: "A surreal triptych exploring heaven, earth, and hell with intricate detail.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/The_Garden_of_earthly_delights.jpg/1200px-The_Garden_of_earthly_delights.jpg"
},
{
  id: 11,
  title: "The Creation of Adam",
  artist: "Michelangelo",
  desc: "A defining fresco from the Sistine Chapel ceiling showing the moment of divine touch.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/500px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg"
},
{
  id: 12,
  title: "The Arnolfini Portrait",
  artist: "Jan van Eyck",
  desc: "A detailed and symbolic portrayal of a wealthy couple, rich in hidden meaning.",
  img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/The_Arnolfini_portrait_%281434%29.jpg/500px-The_Arnolfini_portrait_%281434%29.jpg"
}

];

export default function Home() {
  const [search, setSearch] = useState("");
  const { addFavorite, addToCart, isAuthenticated } = useContext(AuthContext);
  const nav = useNavigate();

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
            <a 
              href={art.wiki} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="know-more-link"
            >
              Know more
            </a>
            <div style={{marginTop:8, display:'flex', gap:8}}>
              <button className="btn-main" onClick={() => {
                if(!isAuthenticated) return nav('/login');
                addToCart({ id: art.id, title: art.title, preview: art.img });
              }}>Add to Cart</button>
              <button className="btn-main btn-secondary" onClick={() => {
                if(!isAuthenticated) return nav('/login');
                addFavorite({ id: art.id, title: art.title, preview: art.img });
              }}>♡ Favorite</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
