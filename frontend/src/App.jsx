import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/homepage";

function App() {
  return (
    <Routes>
      {/* Default root route */}
      <Route index element={<LandingPage />} />

      {/* Explicit routes */}
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/dashboard" element={<Homepage />} />
    </Routes>
  );
}

export default App;
