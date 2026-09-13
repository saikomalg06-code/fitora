const express = require('express');
const router = express.Router();
const designController = require('../controllers/designController');

const { optionalAuth } = require('../middleware/authMiddleware');

// /api/designs
router.post('/', optionalAuth, designController.createDesign);
router.get('/', optionalAuth, designController.getAllDesigns);
router.get('/:id', designController.getDesignById);
router.put('/:id', optionalAuth, designController.updateDesign);
router.delete('/:id', optionalAuth, designController.deleteDesign);

module.exports = router;
