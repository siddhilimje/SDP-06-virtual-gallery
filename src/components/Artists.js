import React from "react";
import "../styles/artists.css";

const ARTISTS = [
  {
    name: "Vincent van Gogh",
    lifespan: "30 March 1853 – 29 July 1890",
    desc: "Dutch Post-Impressionist painter, one of the most famous and influential in the history of art.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/500px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
    wiki: "https://en.wikipedia.org/wiki/Vincent_van_Gogh"
  },
  {
    name: "Raja Ravi Varma",
    lifespan: "29 April 1848 – 2 October 1906",
    desc: "Indian painter renowned for Indian sensibility and iconography, making art more accessible.",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Ravivarma1b.jpg",
    wiki: "https://en.wikipedia.org/wiki/Raja_Ravi_Varma"
  },
  {
    name: "Leonardo da Vinci",
    lifespan: "15 April 1452 – 2 May 1519",
    desc: "Italian polymath of the Renaissance known for the Mona Lisa and The Last Supper.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/500px-Francesco_Melzi_-_Portrait_of_Leonardo.png",
    wiki: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci"
  },
  {
    name: "Claude Monet",
    lifespan: "14 November 1840 – 5 December 1926",
    desc: "French painter, founder of Impressionism, known for his series on water lilies and gardens.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Claude_Monet_1899_Nadar_crop.jpg/500px-Claude_Monet_1899_Nadar_crop.jpg",
    wiki: "https://en.wikipedia.org/wiki/Claude_Monet"
  },
  {
    name: "Frida Kahlo",
    lifespan: "6 July 1907 – 13 July 1954",
    desc: "Mexican artist known for her vivid self-portraits and exploration of identity and pain.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/500px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
    wiki: "https://en.wikipedia.org/wiki/Frida_Kahlo"
  },
  {
    name: "Pablo Picasso",
    lifespan: "25 October 1881 – 8 April 1973",
    desc: "Spanish painter and sculptor, co-founder of Cubism, one of the most influential artists of the 20th century.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/500px-Pablo_picasso_1.jpg",
    wiki: "https://en.wikipedia.org/wiki/Pablo_Picasso"
  },
  {
    name: "Amrita Sher-Gil",
    lifespan: "30 January 1913 – 5 December 1941",
    desc: "Indian-Hungarian painter, known for blending Western and Indian styles with strong emotion.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Amrita_Sher-Gil_2.jpg/500px-Amrita_Sher-Gil_2.jpg",
    wiki: "https://en.wikipedia.org/wiki/Amrita_Sher-Gil"
  },
  {
    name: "Salvador Dalí",
    lifespan: "11 May 1904 – 23 January 1989",
    desc: "Spanish surrealist known for his striking and bizarre dreamlike images, especially The Persistence of Memory.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Salvador_Dal%C3%AD_1939.jpg/500px-Salvador_Dal%C3%AD_1939.jpg",
    wiki: "https://en.wikipedia.org/wiki/Salvador_Dal%C3%AD"
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
              <a 
                href={a.wiki} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="know-more-link"
              >
                Know more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
