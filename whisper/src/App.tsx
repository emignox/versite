import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reg from "./pages/connection";
import Home from "./pages/home";
import {
  UidProvider,
  // useSetUser,
  // useUser,
  //  useUid,
  useSetUid,
  useUid,
} from "./components/app.context";
import { useEffect } from "react";
import axios from "axios";
import Profile from "./pages/profile";

function App() {
  //const [uid, setUid] = useState<string | null>(null);
  // const [user, setUser] = useState<User | null>(null);

  // const userFromCtx = useUser();
  // const setUserInCtx = useSetUser();

  const useUidFromCtx = useUid();
  const setUidInCtx = useSetUid();

  console.log(setUidInCtx, "setUidInCtx");

  // console.log(userFromCtx, "userFromCtx");
  console.log(useUidFromCtx, "useUidFromCtx");

  // useEffect(() => {
  //   const fetchUid = async () => {
  //     await axios({
  //       method: "get",
  //       url: "http://localhost:5001/jwtid",
  //       withCredentials: true,
  //     }).then((res) => {
  //       console.log(res.data, "uid");
  //       setUidInCtx(res.data);
  //       // setUid(res.data);
  //     });
  //   };

  //   fetchUid();
  // }, []);

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

  // useEffect(() => {
  //   if (useUidFromCtx !== null) {
  //     const fetchUser = async () => {
  //       await axios({
  //         method: "get",
  //         // url: `http://localhost:5001/api/user/${uid}`,
  //         url: `http://localhost:5001/api/user/${useUidFromCtx}`,
  //       }).then((res) => {
  //         //  setUser(res.data);
  //         console.log(res.data, "user");
  //         setUserInCtx(res.data);
  //       });
  //     };
  //     fetchUser();
  //   }
  // }, []);

  return (
    <UidProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Reg />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UidProvider>
  );
}

export default App;
