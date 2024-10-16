import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getSportsByCenter = async (centerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sports/${centerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sports:", error);
    throw error;
  }
};

export const createSport = async (centerId, sportData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/sports/${centerId}`,
      sportData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating sport:", error);
    throw error;
  }
};
