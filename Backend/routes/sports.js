const express = require("express");
const router = express.Router();
const Sport = require("../models/Sport");
const Center = require("../models/Center");

// Create a new sport in a center
router.post("/:centerId", async (req, res) => {
  try {
    const { name } = req.body;
    const sport = new Sport({ name, center: req.params.centerId });
    await sport.save();

    // Add sport to the center
    await Center.findByIdAndUpdate(req.params.centerId, {
      $push: { sports: sport._id },
    });
    res.status(201).json(sport);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating sport", message: err.message });
  }
});

// Get all sports in a center
router.get("/:centerId", async (req, res) => {
  try {
    const sports = await Sport.find({ center: req.params.centerId });
    res.status(200).json(sports);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching sports", message: err.message });
  }
});

module.exports = router;
