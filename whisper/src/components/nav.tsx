import house from "/home.png";
import profile from "/account.png";
import CreatePost from "./createPost";
import Logout from "./log/logout";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-x-0 bottom-0 bg-custom-white p-0 m-0  z-50 lg:z-40  shadow-2xl lg:shadow-none lg:top-52 lg:left-32 lg:w-1/6">
      <ul className="flex justify-around items-center h-14 lg:flex-col lg:w-12  lg:space-y-12 lg:items-start">
        <li className=" hover:cursor-pointer">
          <button
            onClick={() => navigate("/home")}
            className="lg:focus:outline-none lg:focus:border-l-4 lg:border-custom-blue hover:cursor-pointer"
          >
            <img src={house} alt="Casa" className="w-10  " />
          </button>
        </li>
        <li className=" hover:cursor-pointer">
          <CreatePost />
        </li>
        <li className=" cursor-pointer">
          <button
            onClick={() => navigate("/profile")}
            className="lg:focus:outline-none lg:focus:border-l-4 lg:border-custom-blue hover:cursor-pointer"
          >
            <img src={profile} alt="Profilo" className="w-10  " />
          </button>
        </li>
        <Logout />
      </ul>
    </div>
  );
};

export default Nav;
