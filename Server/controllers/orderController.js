const db = require('../config/db');

// Place an order (Visitor)
exports.placeOrder = async (req, res) => {
    try {
        const { artwork_id } = req.body;
        const buyer_id = req.user.id;

        // Get artwork price
        const [artwork] = await db.query('SELECT price, status FROM artworks WHERE id = ?', [artwork_id]);
        
        if (artwork.length === 0) return res.status(404).json({ message: 'Artwork not found' });
        if (artwork[0].status === 'sold') return res.status(400).json({ message: 'Artwork already sold' });

        const amount = artwork[0].price;

        // Create Order
        await db.query(
            'INSERT INTO orders (buyer_id, artwork_id, amount) VALUES (?, ?, ?)',
            [buyer_id, artwork_id, amount]
        );

        // Update Artwork Status
        await db.query('UPDATE artworks SET status = "sold" WHERE id = ?', [artwork_id]);

        res.status(201).json({ message: 'Order placed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};