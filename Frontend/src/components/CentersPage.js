import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddCenterForm from "./AddCenterForm";
import AddCenterModel from "./AddCenterModel";

const CentersPage = () => {
  const [centers, setCenters] = useState([]);
  const [showAddCenterModal, setShowAddCenterModal] = useState(false);
  const navigate = useNavigate();

  const fetchCenters = async () => {
    try {
      const response = await axios.get(
        "https://courtease-backend.onrender.com/api/centers"
      );
      setCenters(response.data);
    } catch (err) {
      console.error("Error fetching centers:", err);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  const handleCardClick = (centerId) => {
    navigate(`/center/${centerId}`);
  };

  const refreshCenters = () => {
    fetchCenters();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
        CourtEase
      </h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowAddCenterModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Center
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {centers.map((center) => (
          <div
            key={center._id}
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-xl"
            onClick={() => handleCardClick(center._id)}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {center.name}
            </h2>
            <p className="text-gray-500">{center.location}</p>
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddCenterModel
        isOpen={showAddCenterModal}
        onClose={() => setShowAddCenterModal(false)}
      >
        <AddCenterForm
          onClose={() => setShowAddCenterModal(false)}
          refreshCenters={refreshCenters}
        />
      </AddCenterModel>
    </div>
  );
};

export default CentersPage;
