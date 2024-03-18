import logo from "/logoClaire.png";
import connect from "/friend.jpeg";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  switchView: (arg0: boolean) => void;
  className: string;
}
const Register: React.FC<Props> = ({ switchView, className }) => {
  return (
    <>
      <div className={` flex justify-center items-center ${className}`}>
        <div className="relative">
          <img
            className="h-screen overflow-y-hidden object-cover"
            style={{ filter: "brightness(30%)" }}
            src={connect}
            alt=""
          />
          <div className="absolute top-0 left-0 right-0 flex flex-col justify-center space-y-12 items-center h-screen">
            <img className="w-4/5" src={logo} alt="" />
            <div className="flex flex-col text-custom-white items-center justify-center rounded-xl h-auto mx-3 p-3">
              <h1 className="text-3xl font-bold my-12">Register</h1>
              <form className="flex flex-col justify-center text-center text-xl font-medium">
                <label>Username:</label>
                <input
                  className="outline-none bg-transparent border-b-2 border-custom-white h-10"
                  type="text"
                  name="username"
                />
                <label className="mt-12">Email:</label>
                <input
                  className="outline-none bg-transparent border-b-2 border-custom-white h-10"
                  type="email"
                  name="email"
                />
                <label className="mt-12">Password:</label>
                <input
                  className="outline-none bg-transparent border-b-2 border-custom-white h-10"
                  type="password"
                  name="password"
                />
                <button className="rounded-full bg-white text-custom-blue my-12 hover:bg-custom-blue hover:text-white transition duration-300 ease-in-out h-8 lg:h-12">
                  SignUp
                </button>
                <button className=" group " onClick={() => switchView(false)}>
                  Switch to Login{" "}
                  <FaArrowRight className="inline mx-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
