import { FormEvent, useState } from "react";
import Button from "./button";
import Svg from "./svg";
import { useNavigate } from "react-router-dom";
import ButtonLinks from "./buttonsLinks";

function Form() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          alert("authentication done!");
          Navigate("/profile");
        }
        // Salva il token nel localStorage
        localStorage.setItem("jwt", data.token);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      {" "}
      <form
        className=" mt-5 flex flex-col  justify-center text-center items-center space-y-5  text-custom-blue  lg:flex lg:justify-center lg:items-center  lg:w-1/2 lg:space-y-10  fadeIn"
        onSubmit={handleSubmit}
      >
        <div className="  flex flex-col mx-auto justify-center items-center ">
          <Svg />

          <h1 className="  text-custom-blue   opacity-50 text-2xl font-bold lg:mt-10 ">
            Log In{" "}
          </h1>
        </div>
        <label className="w-full" htmlFor="email">
          Email:
          <br />
          <input
            className="  border-black  opacity-50  border   h-12 rounded-md focus:outline-none   lg:w-2/5 w-3/5 "
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="w-full" htmlFor="password">
          Password:
          <br />
          <input
            className="  border-black  opacity-50  border   h-12 rounded-md focus:outline-none  lg:mb-20  lg:w-2/5 w-3/5 "
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>{" "}
        <Button
          value="LogIn"
          className="   border-2 border-custom-blue  py-2 px-6 w-2/5 font-bold rounded-2xl text-xl  text-custom-blue lg:w-2/5 lg:hover:text-custom-white lg:hover:bg-custom-blue transition  hover:opacity-100  duration-700"
        />
        <p
          className="underline text-center  text-custom-blue mt-5 text-lg lg:text-xl opacity-50 hover:opacity-100 transform duration-700  lg:hidden "
          onClick={() => Navigate("/signup")}
        >
          Sign Up{" "}
        </p>
        <div className="flex items-center">
          <div className="border-t border-2 border-custom-blue opacity-40 flex-grow w-20" />
          <p className="font-bold mx-2">OR</p>
          <div className="border-t border-2 border-custom-blue opacity-40 flex-grow w-20" />
        </div>
        <ButtonLinks />
      </form>
    </>
  );
}
export default Form;
