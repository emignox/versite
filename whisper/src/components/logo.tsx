import logo from "/w.png";
import bell from "/bell.png";
import { useContext } from "react";
import { UidContext } from "./app.context";

const Logo = () => {
  const { user } = useContext(UidContext);

  return (
    <ul className=" flex  justify-between items-center">
      <img className="w-16 p-2" src={logo} alt="" />
      <div className=" flex justify-center items-center">
        <div>
          {user ? <h1>Welcome, {user.username}!</h1> : <h1>Welcome!</h1>}
        </div>
        <div>
          {user ? (
            <img
              className="w-12  p-2 rounded-full"
              src={`./client/public/${user ? user.picture : ""}`}
              alt=""
            />
          ) : (
            <img alt="" />
          )}
        </div>
      </div>

      <div className="relative">
        <img className="w-12  p-2" src={bell} alt="" />
        <span className="absolute top-8 right-8 w-6 h-6 p-1 bg-red-500 flex items-center justify-center rounded-full text-xs">
          1
        </span>
      </div>
    </ul>
  );
};
export default Logo;
