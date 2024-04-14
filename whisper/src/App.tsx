import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import Reg from "./pages/connection";
import Home from "./pages/home";
import { useSetUser, useSetUid, useUid } from "./context/app.context";
import Profile from "./pages/profile";

function App() {
  const setUidInCtx = useSetUid();
  const setUserInCtx = useSetUser();

  const useUidFromCtx = useUid();

  useEffect(() => {
    const fetchUid = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/jwtid`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data, "uid");
          setUidInCtx(res.data);
        });
    };

    fetchUid();

    return () => {
      return;
    };
  }, [setUidInCtx]);

  useEffect(() => {
    if (useUidFromCtx !== null) {
      const fetchUser = async () => {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/user/${useUidFromCtx}`)
          .then((res) => {
            setUserInCtx(res.data);
          });
      };
      fetchUser();
    }
  }, [useUidFromCtx, setUserInCtx]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Reg />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
