const mongoose = require('mongoose');
const Design = require('../models/Design');

// Helper to calculate verified price on server
const calculateVerifiedPrice = (data) => {
  let price = 600; // default base shirt
  if (data.garment === 'T-Shirt') price = 450;
  if (data.garment === 'Kurta') price = 750;

  if (data.sizeType === 'custom') {
    price += 100;
  }

  const fabric = data.design?.fabric || 'Cotton';
  if (fabric === 'Cotton') price += 50;
  else if (fabric === 'Linen') price += 100;
  else if (fabric === 'Denim') price += 120;
  else if (fabric === 'Polyester') price += 0;

  const pockets = Number(data.design?.pockets) || 0;
  if (pockets === 2) {
    price += 50;
  }

  return price;
};

// Helper to determine production time
const calculateProductionTime = (data) => {
  const isCustom = data.sizeType === 'custom';
  const isHeavyFabric = data.design?.fabric === 'Denim' || data.design?.fabric === 'Linen';
  const extraPockets = Number(data.design?.pockets) >= 2;

  if (isCustom && (isHeavyFabric || extraPockets)) {
    return '7–10 Days';
  } else if (isCustom) {
    return '5–7 Days';
  }
  return '3–5 Days';
};

// Check DB connection helper
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Create and save a new garment design specification
// @route   POST /api/designs
exports.createDesign = async (req, res) => {
  try {
    const { garment, sizeType, size, measurements, design, preferences, recommendation } = req.body;

    // 1. Validate Garment
    if (!garment || typeof garment !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid garment type (e.g. Shirt, T-Shirt, or Kurta).'
      });
    }

    // 2. Validate Measurements
    if (sizeType === 'custom') {
      if (!measurements) {
        return res.status(400).json({
          success: false,
          message: 'Custom measurements are required when custom sizing is selected.'
        });
      }

      const { chest, shoulder, waist, sleeve, length } = measurements;
      const fields = [
        { name: 'chest', val: chest, min: 50, max: 180 },
        { name: 'shoulder', val: shoulder, min: 25, max: 75 },
        { name: 'waist', val: waist, min: 45, max: 180 },
        { name: 'sleeve', val: sleeve, min: 15, max: 100 },
        { name: 'length', val: length, min: 40, max: 150 }
      ];

      for (const field of fields) {
        if (field.val === undefined || field.val === null || isNaN(Number(field.val))) {
          return res.status(400).json({
            success: false,
            message: `Please enter a valid ${field.name} measurement.`
          });
        }
        const num = Number(field.val);
        if (num <= 0) {
          return res.status(400).json({
            success: false,
            message: `Measurement for ${field.name} must be greater than zero.`
          });
        }
        if (num < field.min || num > field.max) {
          return res.status(400).json({
            success: false,
            message: `Measurement for ${field.name} (${num} cm) is outside the realistic tailoring range (${field.min}–${field.max} cm).`
          });
        }
      }
    }

    // Calculate dynamic price and production time
    const calculatedPrice = calculateVerifiedPrice(req.body);
    const calculatedProductionTime = calculateProductionTime(req.body);

    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently unreachable. Please ensure MongoDB is running or verify MONGO_URI in .env.'
      });
    }

    const newDesign = new Design({
      garment: garment.trim(),
      sizeType: sizeType || 'standard',
      size: size || 'M',
      measurements: measurements || {},
      design: design || {},
      preferences: preferences || {},
      recommendation: recommendation || {},
      estimatedPrice: calculatedPrice,
      productionTime: calculatedProductionTime
    });

    const savedDesign = await newDesign.save();

    return res.status(201).json({
      success: true,
      message: 'Garment design specification saved successfully.',
      data: savedDesign
    });
  } catch (error) {
    console.error('Error creating design:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save design specification due to an internal server error.'
    });
  }
};

// @desc    Get all saved designs
// @route   GET /api/designs
exports.getAllDesigns = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently unreachable. Please check MongoDB connection.'
      });
    }

    const designs = await Design.find().sort({ createdAt: -1 }).limit(25);

    return res.status(200).json({
      success: true,
      count: designs.length,
      data: designs
    });
  } catch (error) {
    console.error('Error fetching designs:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve designs at this time.'
    });
  }
};

// @desc    Get a single design by ID
// @route   GET /api/designs/:id
exports.getDesignById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid design ID format.'
      });
    }

    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently unreachable.'
      });
    }

    const design = await Design.findById(id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design specification not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: design
    });
  } catch (error) {
    console.error('Error fetching design by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve design details.'
    });
  }
};

// @desc    Update an existing design
// @route   PUT /api/designs/:id
exports.updateDesign = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid design ID format.'
      });
    }

    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently unreachable.'
      });
    }

    const updatedPrice = calculateVerifiedPrice(req.body);
    const updatedProductionTime = calculateProductionTime(req.body);

    const updatedData = {
      ...req.body,
      estimatedPrice: updatedPrice,
      productionTime: updatedProductionTime
    };

    const updatedDesign = await Design.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!updatedDesign) {
      return res.status(404).json({
        success: false,
        message: 'Design not found to update.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Design specification updated successfully.',
      data: updatedDesign
    });
  } catch (error) {
    console.error('Error updating design:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to update design specification.'
    });
  }
};

// @desc    Delete a design
// @route   DELETE /api/designs/:id
exports.deleteDesign = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid design ID format.'
      });
    }

    if (!isDatabaseConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently unreachable.'
      });
    }

    const design = await Design.findByIdAndDelete(id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found to delete.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Design specification deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting design:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to delete design specification.'
    });
  }
};
