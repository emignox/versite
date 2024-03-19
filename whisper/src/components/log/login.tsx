import logo from "/logoClaire.png";
import connect from "/friend.jpeg";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  switchView: (arg0: boolean) => void;
  className: string;
}

const Login: React.FC<Props> = ({ switchView, className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5001/api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data.errors;
        if (errors.email) {
          setEmailError(errors.email);
        }
        if (errors.password) {
          setPasswordError(errors.password);
        }
      } else if (error instanceof Error) {
        console.error("Error", error.message);
      }
    }
  };

  return (
    <>
      {" "}
      <div className={`flex justify-center items-center ${className} `}>
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
              <h1 className="text-3xl font-bold my-12">Log In </h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center text-center text-xl font-medium"
              >
                <label className="mt-12">Email:</label>
                <input
                  className="outline-none bg-transparent border-b-2 border-custom-white h-10"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <div className=" text-red-500">{emailError}</div>
                )}
                <label className="mt-12">Password:</label>
                <input
                  className="outline-none bg-transparent border-b-2 border-custom-white h-10"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
                {passwordError && (
                  <div className=" text-red-500">{passwordError}</div>
                )}
                <button
                  type="submit"
                  className="rounded-full bg-white text-custom-blue my-12 hover:bg-custom-blue hover:text-white transition duration-300 ease-in-out h-8 lg:h-12"
                >
                  SignIn
                </button>
                <button
                  className=" group hover:-translate-x-1 transition-transform duration-200"
                  onClick={() => switchView(false)}
                >
                  <FaArrowLeft className="inline mx-2 group-hover:-translate-x-1 transition-transform duration-200" />
                  Switch to Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
