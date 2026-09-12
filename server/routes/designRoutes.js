const express = require('express');
const router = express.Router();
const designController = require('../controllers/designController');

// /api/designs
router.post('/', designController.createDesign);
router.get('/', designController.getAllDesigns);
router.get('/:id', designController.getDesignById);
router.put('/:id', designController.updateDesign);
router.delete('/:id', designController.deleteDesign);

module.exports = router;
