import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Introduction, Simulation, PeriodicTable, Quiz } from "./pages";
import { Header } from "./components/organisms";
import "./styles/input.css";

const App = () => {
  return (
    <Router>
      <Header /> {/* You can highlight active tab inside Header based on pathname */}
      <Routes>
        <Route path="/" element={<Navigate to="/intro" replace />} />
        <Route path="/intro" element={<Introduction />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/periodic" element={<PeriodicTable />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<Navigate to="/intro" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
