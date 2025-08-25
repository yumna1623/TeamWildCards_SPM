import { Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroPage />} />
      <Route path="/create" element={<div>Create Team Page</div>} />
      <Route path="/join" element={<div>Join Team Page</div>} />
    </Routes>
  );
}

export default App;
