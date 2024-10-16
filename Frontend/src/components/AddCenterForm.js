import React, { useState } from "react";
import axios from "axios";

const AddCenterForm = ({ onClose, refreshCenters }) => {
  const [centerName, setCenterName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/centers", {
        name: centerName,
        location,
      });
      refreshCenters(); // Refresh the list of centers
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error adding center:", err);
      alert("Failed to add center");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">Add New Center</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Center Name</label>
        <input
          type="text"
          value={centerName}
          onChange={(e) => setCenterName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Center
      </button>
    </form>
  );
};

export default AddCenterForm;
