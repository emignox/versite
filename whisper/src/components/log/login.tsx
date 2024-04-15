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
        `https://whisper-server.vercel.app/user/login`,
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
            className="object-cover h-screen overflow-y-hidden"
            style={{ filter: "brightness(30%)" }}
            src={connect}
            alt=""
          />
          <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-screen space-y-12">
            <img className="w-4/5" src={logo} alt="" />
            <div className="flex flex-col items-center justify-center h-auto p-3 mx-3 text-custom-white rounded-xl">
              <h1 className="my-12 text-3xl font-bold">Log In </h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center text-xl font-medium text-center"
              >
                <label className="mt-12">Email:</label>
                <input
                  className="h-10 bg-transparent border-b-2 outline-none border-custom-white"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <div className="text-red-500 ">{emailError}</div>
                )}
                <label className="mt-12">Password:</label>
                <input
                  className="h-10 bg-transparent border-b-2 outline-none border-custom-white"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
                {passwordError && (
                  <div className="text-red-500 ">{passwordError}</div>
                )}
                <button
                  type="submit"
                  className="h-8 my-12 transition duration-300 ease-in-out bg-white rounded-full text-custom-blue hover:bg-custom-blue hover:text-white lg:h-12"
                >
                  SignIn
                </button>
                <button
                  className="transition-transform duration-200 group hover:-translate-x-1"
                  onClick={() => switchView(false)}
                >
                  <FaArrowLeft className="inline mx-2 transition-transform duration-200 group-hover:-translate-x-1" />
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
