import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reg from "./pages/connection";
import Home from "./pages/home";
import { UidContext, type User } from "./components/app.context";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/profile";

function App() {
  const [uid, setUid] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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

  useEffect(() => {
    if (uid) {
      const fetchUser = async () => {
        await axios({
          method: "get",
          url: `http://localhost:5001/api/user/${uid}`,
        }).then((res) => {
          setUser(res.data);
        });
      };
      fetchUser();
    }
  }, [uid]);

  return (
    <div>
      <UidContext.Provider value={{ uid, user, setUid }}>
        <Router>
          <Routes>
            <Route path="/" element={<Reg />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </UidContext.Provider>
    </div>
  );
}

export default App;
