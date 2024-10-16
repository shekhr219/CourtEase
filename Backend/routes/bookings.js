const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Court = require("../models/Court");

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const { customerName, court, date, startTime, endTime } = req.body;

    // Parse the date correctly
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      court,
      date: parsedDate,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } }, // Overlaps start
        { endTime: { $gt: startTime, $lte: endTime } }, // Overlaps end
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } }, // Encloses the new booking
      ],
    });

    if (conflictingBooking) {
      return res.status(400).json({ error: "Time slot already booked" });
    }

    const newBooking = new Booking({
      customerName,
      court,
      date: parsedDate,
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

// Get bookings for a specific court on a specific date
router.get("/:courtId/:date", async (req, res) => {
  try {
    const { courtId, date } = req.params;

    // Convert the date string to a Date object
    const parsedDate = new Date(date + "T00:00:00.000Z");
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const bookings = await Booking.find({
      court: courtId,
      date: parsedDate,
    });
    res.status(200).json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching bookings", message: err.message });
  }
});

// Get bookings for a specific sport on a specific date
router.get("/sport/:sportId/:date", async (req, res) => {
  try {
    const { sportId, date } = req.params;

    // Convert the date string to a Date object, setting the time to the start of the day (UTC)
    const parsedDate = new Date(date + "T00:00:00.000Z");
    if (isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Fetch courts for the sport
    const courts = await Court.find({ sport: sportId }).select("_id");
    const courtIds = courts.map((court) => court._id);

    // Fetch bookings for all courts associated with the given sport on the specified date
    const bookings = await Booking.find({
      court: { $in: courtIds },
      date: parsedDate,
    }).populate("court");

    res.status(200).json(bookings);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching bookings", message: err.message });
  }
});

module.exports = router;
