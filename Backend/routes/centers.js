const express = require("express");
const router = express.Router();
const Center = require("../models/Center");

// Create a new center
router.post("/", async (req, res) => {
  try {
    const { name, location } = req.body;
    const newCenter = new Center({ name, location });
    await newCenter.save();
    res.status(201).json(newCenter);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating center", message: err.message });
  }
});

// Get all centers
router.get("/", async (req, res) => {
  try {
    const centers = await Center.find();
    res.status(200).json(centers);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching centers", message: err.message });
  }
});

// Get a center by ID
router.get("/:id", async (req, res) => {
  try {
    const center = await Center.findById(req.params.id).populate("sports");
    if (!center) return res.status(404).json({ error: "Center not found" });
    res.status(200).json(center);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching center", message: err.message });
  }
});

// Update a center
router.put("/:id", async (req, res) => {
  try {
    const { name, location } = req.body;
    const updatedCenter = await Center.findByIdAndUpdate(
      req.params.id,
      { name, location },
      { new: true }
    );
    if (!updatedCenter)
      return res.status(404).json({ error: "Center not found" });
    res.status(200).json(updatedCenter);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating center", message: err.message });
  }
});

// Delete a center
router.delete("/:id", async (req, res) => {
  try {
    const deletedCenter = await Center.findByIdAndDelete(req.params.id);
    if (!deletedCenter)
      return res.status(404).json({ error: "Center not found" });
    res.status(200).json({ message: "Center deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting center", message: err.message });
  }
});

module.exports = router;
