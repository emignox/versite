import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reg from "./pages/connection";
import Home from "./pages/home";
import {
  useSetUser,
  useUser,
  useSetUid,
  useUid,
} from "./components/app.context";
import { useEffect } from "react";
import axios from "axios";
import Profile from "./pages/profile";

function App() {
  // const [user, setUser] = useState<User | null>(null);

  const setUidInCtx = useSetUid();
  const setUserInCtx = useSetUser();

  const useUidFromCtx = useUid();
  const useUserFromCtx = useUser();

  // console.log(userFromCtx, "userFromCtx");
  console.log(useUidFromCtx, "useUidFromCtx");


  useEffect(() => {
    const fetchUid = async () => {
      await axios
        .get("http://localhost:5001/jwtid", {
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
          .get(`http://localhost:5001/api/user/${useUidFromCtx}`)
          .then((res) => {
            //  setUser(res.data);
            console.log(res.data, "user");
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
