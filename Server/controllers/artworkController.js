const db = require('../config/db');

// Get all artworks (Public)
exports.getAllArtworks = async (req, res) => {
    try {
        const [artworks] = await db.query('SELECT * FROM artworks');
        res.json(artworks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get artwork by ID
exports.getArtworkById = async (req, res) => {
    try {
        const [artwork] = await db.query('SELECT * FROM artworks WHERE id = ?', [req.params.id]);
        if (artwork.length === 0) return res.status(404).json({ message: 'Artwork not found' });
        res.json(artwork[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create Artwork (Artist only)
exports.createArtwork = async (req, res) => {
    try {
        const { title, description, image_url, price, category } = req.body;
        const artist_id = req.user.id; // From middleware

        const [result] = await db.query(
            'INSERT INTO artworks (title, description, image_url, price, category, artist_id) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, image_url, price, category, artist_id]
        );

        res.status(201).json({ message: 'Artwork created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Artwork (Artist or Admin)
exports.deleteArtwork = async (req, res) => {
    try {
        const artworkId = req.params.id;
        const userId = req.user.id;
        const userRole = req.user.role;

        // Check ownership
        const [artwork] = await db.query('SELECT artist_id FROM artworks WHERE id = ?', [artworkId]);
        if (artwork.length === 0) return res.status(404).json({ message: 'Artwork not found' });

        if (userRole !== 'admin' && artwork[0].artist_id !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this artwork' });
        }

        await db.query('DELETE FROM artworks WHERE id = ?', [artworkId]);
        res.json({ message: 'Artwork deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};