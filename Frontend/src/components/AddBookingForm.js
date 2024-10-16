import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBookingForm = ({ centerId, selectedSport, fetchSchedule }) => {
  const [customerName, setCustomerName] = useState("");
  const [courtId, setCourtId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:00");
  const [courts, setCourts] = useState([]);

  // Fetch courts based on the selected sport
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await axios.get(
          `https://courtease-backend.onrender.com/api/courts/${selectedSport}`
        );
        setCourts(res.data);
      } catch (err) {
        console.error("Error fetching courts:", err);
      }
    };

    fetchCourts();
  }, [selectedSport]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://courtease-backend.onrender.com/api/bookings", {
        customerName,
        court: courtId,
        date,
        startTime,
        endTime,
      });

      alert("Booking added successfully!");
      fetchSchedule(); // Refresh the schedule after booking
    } catch (err) {
      console.error("Error adding booking:", err);
      alert("Error adding booking");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Add Booking</h2>
      <div className="mb-4">
        <label className="block mb-1">Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="border p-2 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Court:</label>
        <select
          value={courtId}
          onChange={(e) => setCourtId(e.target.value)}
          required
          className="border p-2 rounded-md w-full"
        >
          <option value="">Select a court</option>
          {courts.map((court) => (
            <option key={court._id} value={court._id}>
              {court.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="border p-2 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="border p-2 rounded-md w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Booking
      </button>
    </form>
  );
};

export default AddBookingForm;
