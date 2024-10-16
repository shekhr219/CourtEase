// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CentersPage from "./pages/CentersPage";
import SchedulePage from "./pages/SchedulePage"; // You'll create this next

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CentersPage />} />
        <Route path="/center/:centerId" element={<SchedulePage />} />
      </Routes>
    </Router>
  );
}

export default App;
