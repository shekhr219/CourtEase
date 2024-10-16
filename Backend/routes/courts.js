const express = require("express");
const router = express.Router();
const Court = require("../models/Court");
const Sport = require("../models/Sport");

// Create a new court for a sport
router.post("/:sportId", async (req, res) => {
  try {
    const { name } = req.body;
    const court = new Court({ name, sport: req.params.sportId });
    await court.save();

    // Add court to the sport
    await Sport.findByIdAndUpdate(req.params.sportId, {
      $push: { courts: court._id },
    });
    res.status(201).json(court);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating court", message: err.message });
  }
});

// Get all courts for a sport
router.get("/:sportId", async (req, res) => {
  try {
    const courts = await Court.find({ sport: req.params.sportId });
    res.status(200).json(courts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching courts", message: err.message });
  }
});

module.exports = router;
