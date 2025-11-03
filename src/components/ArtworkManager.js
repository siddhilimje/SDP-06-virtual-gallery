import React, { useState, useRef } from "react";
import "../styles/artwork-manager.css";

function emptyArtwork() {
  return {
    id: Date.now(),
    title: "",
    description: "",
    tags: "",
    category: "",
    image: null,
    preview: ""
  };
}

export default function ArtworkManager() {
  const [artworks, setArtworks] = useState([]);
  const [form, setForm] = useState(emptyArtwork());
  const [editingId, setEditingId] = useState(null);
  const fileRef = useRef();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if(!file) return;
    // Validate file type
    if(!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("Only JPEG, PNG, or GIF accepted.");
      return;
    }
    // Read as data URL for preview
    const reader = new FileReader();
    reader.onload = ev => {
      setForm(form => ({ ...form, image: file, preview: ev.target.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!form.title || !form.preview){
      alert("Please provide an artwork title and image.");
      return;
    }
    if(editingId) {
      setArtworks(arts =>
        arts.map(a =>
          a.id === editingId ? { ...form, id: editingId } : a
        )
      );
    } else {
      setArtworks(arts => [...arts, { ...form, id: Date.now() }]);
    }
    setForm(emptyArtwork());
    setEditingId(null);
    fileRef.current.value = null;
  }

  function handleEdit(id) {
    const art = artworks.find(a => a.id === id);
    setForm({ ...art });
    setEditingId(id);
    fileRef.current.value = null;
  }

  function handleDelete(id) {
    if(window.confirm("Are you sure you want to delete this artwork?"))
      setArtworks(arts => arts.filter(a => a.id !== id));
  }

  function handleCancel() {
    setForm(emptyArtwork());
    setEditingId(null);
    fileRef.current.value = null;
  }

  return (
    <section className="manage-artworks-section">
      <h1>Upload & Manage Your Artworks</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Artwork Image
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFile}
            ref={fileRef}
          />
        </label>
        {form.preview && (
          <div className="art-preview">
            <img src={form.preview} alt="Preview" />
          </div>
        )}

        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
        </label>

        <label>
          Tags (comma separated)
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
          />
        </label>

        <label>
          Category
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Abstract, Portrait, Nature"
          />
        </label>

        <div style={{marginTop:10, display:"flex", gap:12}}>
          <button className="btn-main" type="submit">
            {editingId ? "Update Artwork" : "Upload Artwork"}
          </button>
          {editingId && (
            <button className="btn-main btn-secondary" type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 style={{marginTop:32, marginBottom:12}}>Your Artworks</h2>
      <div className="artworks-grid">
        {artworks.length === 0 && (
          <div style={{color:"#aaa"}}>No artworks yet.</div>
        )}
        {artworks.map(art => (
          <div className="artwork-card" key={art.id}>
            <img src={art.preview} alt={art.title} className="art-img"/>
            <div className="art-info">
              <h3>{art.title}</h3>
              {art.category && <span className="art-category">{art.category}</span>}
              <p>{art.description}</p>
              {art.tags && (
                <div className="art-tags">
                  {art.tags.split(",").map((t,i) => (
                    <span key={i} className="tag">{t.trim()}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="art-actions">
              <button onClick={() => handleEdit(art.id)}>Edit</button>
              <button onClick={() => handleDelete(art.id)} className="btn-secondary">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
