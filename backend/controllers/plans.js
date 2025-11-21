const { BasePlans } = require("../models");

const getPlans = async (req, res) => {
  try {
    const plans = await BasePlans.findAll();

    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch" });
  }
};

module.exports = { getPlans };
