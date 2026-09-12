/**
 * FITORA Smart Recommendation Engine Controller
 * Rule-based recommendation engine for personalized clothing customization.
 * Evaluates Occasion, Weather, and Priority parameters to generate bespoke suggestions.
 */

exports.getRecommendation = async (req, res) => {
  try {
    const { occasion = 'Casual', weather = 'Moderate', priority = 'Comfort', garment = 'Shirt' } = req.body;

    let fabric = 'Cotton';
    let color = 'Blue';
    let fit = 'Regular';
    let reasonParts = [];

    // --- 1. Fabric Selection Rules ---
    if (weather === 'Hot') {
      if (priority === 'Style' || occasion === 'Formal') {
        fabric = 'Linen';
        reasonParts.push('Linen delivers premium breathability and natural temperature regulation in warm weather.');
      } else {
        fabric = 'Cotton';
        reasonParts.push('Pure Cotton offers maximum air circulation and skin-friendly softness for hot conditions.');
      }
    } else if (weather === 'Cold') {
      if (garment === 'Shirt' || garment === 'T-Shirt') {
        fabric = 'Denim';
        reasonParts.push('Denim provides robust density, thermal insulation, and an iconic structured drape in cooler weather.');
      } else {
        fabric = 'Cotton'; // Kurta in heavy weave
        reasonParts.push('Heavy-weight woven Cotton retains body warmth while staying comfortable throughout the day.');
      }
    } else { // Moderate
      if (occasion === 'Formal') {
        fabric = 'Cotton';
        reasonParts.push('Fine combed Cotton ensures crisp pressed seams and a distinguished formal finish.');
      } else if (occasion === 'Party') {
        fabric = 'Linen';
        reasonParts.push('Refined Linen delivers an effortless European sartorial texture suitable for evening gatherings.');
      } else if (priority === 'Comfort') {
        fabric = 'Cotton';
        reasonParts.push('Cotton remains the optimal everyday fabric for versatile comfort in moderate climates.');
      } else {
        fabric = 'Denim';
        reasonParts.push('Durable Denim brings contemporary style and versatility in moderate weather.');
      }
    }

    // --- 2. Fit Selection Rules ---
    if (occasion === 'Formal') {
      fit = priority === 'Comfort' ? 'Regular' : 'Slim';
      reasonParts.push(`${fit} fit ensures a sharp, tapered profile aligning with boardroom standards.`);
    } else if (occasion === 'Party') {
      fit = 'Slim';
      reasonParts.push('Slim fit sculpts the body silhouette for a sleek, evening-ready aesthetic.');
    } else if (occasion === 'College') {
      fit = priority === 'Style' ? 'Slim' : 'Regular';
      reasonParts.push(`${fit} fit delivers an effortless balance of campus mobility and modern proportion.`);
    } else { // Casual
      if (priority === 'Comfort') {
        fit = 'Loose';
        reasonParts.push('Loose relaxed fit maximizes unhindered ease-of-movement and relaxed airflow.');
      } else {
        fit = 'Regular';
        reasonParts.push('Regular fit offers the timeless standard silhouette suited for everyday wear.');
      }
    }

    // --- 3. Color Selection Rules ---
    if (occasion === 'Formal') {
      color = weather === 'Hot' ? 'White' : 'Blue';
    } else if (occasion === 'Party') {
      color = priority === 'Style' ? 'Black' : 'Red';
    } else if (occasion === 'College') {
      color = weather === 'Hot' ? 'Green' : 'Blue';
    } else { // Casual
      if (weather === 'Hot') {
        color = 'White';
      } else if (weather === 'Cold') {
        color = 'Black';
      } else {
        color = 'Blue';
      }
    }

    const fullReason = reasonParts.join(' ');

    return res.status(200).json({
      success: true,
      data: {
        fabric,
        color,
        fit,
        reason: fullReason,
        inputs: {
          garment,
          occasion,
          weather,
          priority
        }
      }
    });
  } catch (error) {
    console.error('Recommendation engine error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate recommendation. Please try again.'
    });
  }
};
