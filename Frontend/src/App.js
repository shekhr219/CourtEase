import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CentersPage from "./components/CentersPage";
import SchedulePage from "./components/SchedulePage";

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
