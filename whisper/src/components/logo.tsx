import logo from "/w.png";
import bell from "/bell.png";
import { useUser } from "../context/app.context";

const Logo = () => {
  const userFromCtx = useUser();

  return (
    <ul className="flex justify-between items-center fixed top-0 left-0 w-full shadow-2xl lg:shadow-none  bg-custom-white z-50">
      <img className="w-16 p-2" src={logo} alt="" />
      <div className=" flex justify-center items-center">
        <div>
          {userFromCtx ? (
            <h1 className="text-xl font-bold">
              Welcome, {userFromCtx?.username}!
            </h1>
          ) : (
            <h1>Welcome!</h1>
          )}
        </div>
        <div>
          <img
            className="w-12  p-2 rounded-full"
            src={`./client/public/${userFromCtx?.picture} `}
            alt=""
          />
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
