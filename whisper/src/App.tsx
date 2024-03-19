import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reg from "./pages/connection";
import Home from "./pages/home";
import { UidContext } from "./components/app.context";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchUid = async () => {
      await axios({
        method: "get",
        url: "http://localhost:5001/jwtid",
        withCredentials: true,
      }).then((res) => {
        console.log(res.data);
        setUid(res.data);
      });
    };

    fetchUid();
  }, []);

  return (
    <div>
      <UidContext.Provider value={uid}>
        <Router>
          <Routes>
            <Route path="/" element={<Reg />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </UidContext.Provider>
    </div>
  );
}

export default App;
