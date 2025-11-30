const express = require('express');
const router = express.Router();
const exhibitionController = require('../controllers/exhibitionController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.get('/', exhibitionController.getAllExhibitions);

// Only Curators and Admins can create exhibitions
router.post('/', verifyToken, checkRole(['curator', 'admin']), exhibitionController.createExhibition);

module.exports = router;