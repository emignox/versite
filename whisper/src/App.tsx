import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reg from "./pages/connection";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Reg />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
