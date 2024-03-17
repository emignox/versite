import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Log from "./pages/log";
import Registration from "./pages/sign";
import Intro from "./components/introPage";
import Profile from "./components/profile";
import MobileNav from "./components/mobileNav";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<Log />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/MobileNav" element={<MobileNav />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
