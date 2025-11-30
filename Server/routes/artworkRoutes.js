const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.get('/', artworkController.getAllArtworks);
router.get('/:id', artworkController.getArtworkById);

// Only Artists and Admins can create artworks
router.post('/', verifyToken, checkRole(['artist', 'admin']), artworkController.createArtwork);

// Only Artists and Admins can delete
router.delete('/:id', verifyToken, checkRole(['artist', 'admin']), artworkController.deleteArtwork);

module.exports = router;