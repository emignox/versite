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
        `${process.env.REACT_APP_API_URL}/user/register`,
        {
          username,
          email,
          password,
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("User registered successfully");
        switchView(true); // Cambia la vista al componente di login
      } else {
        console.log(response.data);
      }
    } catch (error) {
      alert("There was an error!");
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={` h-screen flex justify-center items-center ${className}`}
      >
        <div className="relative">
          <img
            className="object-cover h-screen overflow-y-hidden"
            style={{ filter: "brightness(30%)" }}
            src={connect}
            alt=""
          />
          <div className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-screen space-y-2">
            <img className="w-4/5" src={logo} alt="" />
            <div className="flex flex-col items-center justify-center h-auto p-3 mx-3 text-custom-white rounded-xl">
              <h1 className="my-12 text-3xl font-bold">Register</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center text-xl font-medium text-center"
              >
                <label>Username:</label>
                <input
                  className="h-10 bg-transparent border-b-2 outline-none border-custom-white"
                  type="text"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="mt-12">Email:</label>
                <input
                  className="h-10 bg-transparent border-b-2 outline-none border-custom-white"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="mt-12">Password:</label>
                <input
                  className="h-10 bg-transparent border-b-2 outline-none border-custom-white"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <section className="flex flex-col items-center justify-center ">
                  <label className="mt-12" htmlFor="uploadFile">
                    Profile Picture:
                    <AiOutlinePicture className="inline mx-3 text-3xl" />
                  </label>
                  <input
                    className="hidden h-10 bg-transparent border-b-2 outline-none border-custom-white"
                    type="file"
                    id="uploadFile"
                    name="picture"
                  />
                </section>
                <div className="flex items-center justify-center my-3 ">
                  {" "}
                  <input
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mx-3 my-3 "
                    type="checkbox"
                  />
                  <p className="text-xs  text-custom-white">
                    I agree to the{" "}
                    <a className="text-blue-500 underline" href="/">
                      terms and conditions
                    </a>{" "}
                  </p>
                </div>
                <button
                  type="submit"
                  className="h-8 my-3 transition duration-300 ease-in-out bg-white rounded-full text-custom-blue hover:bg-custom-blue hover:text-white lg:h-12"
                >
                  SignUp
                </button>
                <button
                  className="transition-transform duration-200  group hover:translate-x-1"
                  onClick={() => switchView(true)}
                >
                  Switch to Login{" "}
                  <FaArrowRight className="inline mx-2 transition-transform duration-200 group-hover:translate-x-1" />
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
