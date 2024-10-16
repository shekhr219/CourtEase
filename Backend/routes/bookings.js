const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { customerName, court, date, startTime, endTime } = req.body;

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      court,
      date,
      startTime,
    });

    if (conflictingBooking) {
      return res.status(400).json({ error: "Time slot already booked" });
    }

    const newBooking = new Booking({
      customerName,
      court,
      date,
      startTime,
      endTime,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating booking", message: err.message });
  }
});

// Get bookings for a court on a specific date
router.get("/:courtId/:date", async (req, res) => {
  try {
    const bookings = await Booking.find({
      court: req.params.courtId,
      date: new Date(req.params.date),
    });
    res.status(200).json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching bookings", message: err.message });
  }
});

module.exports = router;
