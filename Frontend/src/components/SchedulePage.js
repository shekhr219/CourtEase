import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddBookingForm from "./AddBookingForm";
import AddBookingModal from "./AddBookingModal";

const SchedulePage = () => {
  const { centerId } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [courts, setCourts] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [sports, setSports] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [centerName, setCenterName] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const timeSlots = [
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
  ];

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportsRes = await axios.get(
          `http://localhost:5000/api/sports/${centerId}`
        );
        setSports(sportsRes.data);

        // Automatically select the first sport if available
        if (sportsRes.data.length > 0) {
          setSelectedSport(sportsRes.data[0]._id);
        }
      } catch (err) {
        console.error("Error fetching sports:", err);
      }
    };

    const fetchCenter = async () => {
      try {
        const centerRes = await axios.get(
          `http://localhost:5000/api/centers/${centerId}`
        );
        setCenterName(centerRes.data.name);
      } catch (err) {
        console.error("Error fetching center:", err);
      }
    };

    fetchSports();
    fetchCenter();
  }, [centerId]);

  useEffect(() => {
    if (selectedSport) {
      fetchSchedule();
    }
  }, [selectedSport, selectedDate]);

  const fetchSchedule = async () => {
    if (selectedSport) {
      try {
        const courtsRes = await axios.get(
          `http://localhost:5000/api/courts/${selectedSport}`
        );
        setCourts(courtsRes.data);

        const scheduleRes = await axios.get(
          `http://localhost:5000/api/bookings/sport/${selectedSport}/${selectedDate}`
        );
        setSchedule(scheduleRes.data);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    }
  };

  const checkIfBooked = (courtId, timeSlot) => {
    return schedule.some((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0];
      const bookingHour = parseInt(booking.startTime.split(":")[0]);
      const bookingPeriod = bookingHour < 12 ? "AM" : "PM";
      const formattedBookingTime = `${bookingHour % 12 || 12} ${bookingPeriod}`;
      const bookingCourtId =
        typeof booking.court === "object"
          ? booking.court._id.toString()
          : booking.court;

      return (
        bookingCourtId === courtId &&
        bookingDate === selectedDate &&
        formattedBookingTime === timeSlot
      );
    });
  };
  const getBookingName = (courtId, timeSlot) => {
    const booking = schedule.find((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0];
      const bookingHour = parseInt(booking.startTime.split(":")[0]);
      const bookingPeriod = bookingHour < 12 ? "AM" : "PM";
      const formattedBookingTime = `${bookingHour % 12 || 12} ${bookingPeriod}`;
      const bookingCourtId =
        typeof booking.court === "object"
          ? booking.court._id.toString()
          : booking.court;

      return (
        bookingCourtId === courtId &&
        bookingDate === selectedDate &&
        formattedBookingTime === timeSlot
      );
    });
    return booking ? booking.customerName : null; // Assuming `customerName` is the field in your booking object
  };

  const handleSportClick = (sportId) => {
    setSelectedSport(sportId);
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  const handleBooking = () => {
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
  };

  const handleAddCourt = async () => {
    const courtName = prompt("Enter the name of the new court:");
    if (courtName) {
      try {
        await axios.post(`http://localhost:5000/api/courts/${selectedSport}`, {
          name: courtName,
        });
        alert("Court added successfully!");
        fetchSchedule(); // Refresh courts after adding a new one
      } catch (err) {
        console.error("Error adding court:", err);
        alert("Error adding court");
      }
    }
  };

  const handleAddSport = async () => {
    const sportName = prompt("Enter the name of the new sport:");
    if (sportName) {
      try {
        await axios.post(`http://localhost:5000/api/sports/${centerId}`, {
          name: sportName,
        });
        alert("Sport added successfully!");
        const sportsRes = await axios.get(
          `http://localhost:5000/api/sports/${centerId}`
        );
        setSports(sportsRes.data);
      } catch (err) {
        console.error("Error adding sport:", err);
        alert("Error adding sport");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {centerName} Schedule
      </h1>

      <div className="flex space-x-4 mb-4 justify-center">
        {sports.map((sport) => (
          <button
            key={sport._id}
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              selectedSport === sport._id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handleSportClick(sport._id)}
          >
            {sport.name}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 mb-4 justify-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 shadow-sm"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
          onClick={handleBooking}
        >
          Add Booking
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
          onClick={handleAddCourt}
        >
          Add Court
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          onClick={handleAddSport}
        >
          Add Sport
        </button>
      </div>

      <AddBookingModal
        isOpen={showBookingForm}
        onClose={handleCloseBookingForm}
      >
        <AddBookingForm
          centerId={centerId}
          selectedSport={selectedSport}
          fetchSchedule={fetchSchedule}
          onClose={handleCloseBookingForm}
        />
      </AddBookingModal>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Time Slots</th>
              {courts.map((court, index) => (
                <th key={court._id} className="px-4 py-2 border">
                  Court {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{slot}</td>
                {courts.map((court) => {
                  const isBooked = checkIfBooked(court._id, slot);
                  const bookingName = getBookingName(court._id, slot); // Get the customer's name

                  return (
                    <td key={court._id} className="px-4 py-2 border">
                      <div
                        className={`p-2 rounded-md text-center font-semibold ${
                          isBooked ? "bg-red-300" : "bg-green-200"
                        }`}
                      >
                        {isBooked ? (
                          <>
                            <span>Booked</span>
                            <div className="text-sm">{bookingName}</div>
                          </>
                        ) : (
                          "Available"
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePage;
