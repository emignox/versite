import logo from "/logoClaire.png";
import connect from "/friend.jpeg";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";

interface Props {
  switchView: (arg0: boolean) => void;
  className: string;
}

const Register: React.FC<Props> = ({ switchView, className }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isChecked) {
      alert("You must accept the terms and conditions");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5001/api/user/register`,
        {
          username,
          email,
          password,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
          <div className="absolute top-0 left-0 right-0 flex flex-col justify-center space-y-2 items-center h-screen">
            <img className="w-4/5" src={logo} alt="" />
            <div className="flex flex-col text-custom-white items-center justify-center rounded-xl h-auto mx-3 p-3">
              <h1 className="text-3xl font-bold my-12">Register</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center text-center text-xl font-medium"
              >
                <label>Username:</label>
                <input
                  className="outline-none bg-transparent border-b-2 border-custom-white h-10"
                  type="text"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="mt-12">Email:</label>
                <input
                  className="outline-none bg-transparent border-b-2 border-custom-white h-10"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="mt-12">Password:</label>
                <input
                  className="outline-none bg-transparent border-b-2 border-custom-white h-10"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <section className=" flex flex-col justify-center items-center">
                  <label className="mt-12" htmlFor="uploadFile">
                    Profile Picture:
                    <AiOutlinePicture className="text-3xl inline mx-3" />
                  </label>
                  <input
                    className="outline-none bg-transparent border-b-2 border-custom-white h-10 hidden"
                    type="file"
                    id="uploadFile"
                    name="picture"
                  />
                </section>
                <div className=" flex justify-center items-center my-3 ">
                  {" "}
                  <input
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className=" my-3 mx-3"
                    type="checkbox"
                  />
                  <p className=" text-xs text-custom-white">
                    I agree to the{" "}
                    <a className="text-blue-500 underline" href="/">
                      terms and conditions
                    </a>{" "}
                  </p>
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-white text-custom-blue my-3 hover:bg-custom-blue hover:text-white transition duration-300 ease-in-out h-8 lg:h-12"
                >
                  SignUp
                </button>
                <button
                  className=" group  hover:translate-x-1 transition-transform duration-200"
                  onClick={() => switchView(true)}
                >
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
