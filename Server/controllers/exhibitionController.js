const db = require('../config/db');

// Get all exhibitions
exports.getAllExhibitions = async (req, res) => {
    try {
        const [exhibitions] = await db.query('SELECT * FROM exhibitions');
        res.json(exhibitions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create Exhibition (Curator or Admin)
exports.createExhibition = async (req, res) => {
    try {
        const { title, description, start_date, end_date } = req.body;
        const curator_id = req.user.id;

        const [result] = await db.query(
            'INSERT INTO exhibitions (title, description, start_date, end_date, curator_id) VALUES (?, ?, ?, ?, ?)',
            [title, description, start_date, end_date, curator_id]
        );

        res.status(201).json({ message: 'Exhibition created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};