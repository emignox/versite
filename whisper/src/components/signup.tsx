import { useState } from "react";
import Svg from "./svg";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import message from "/hello.png";

function Registration() {
  const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage(e.target.files?.[0] || null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    } else {
      alert("Please choose a profile image");
      return;
    }
    formData.append("description", description);
    formData.append("occupation", occupation);

    try {
      const response = await fetch("http://localhost:3000/api/create-user", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      alert("you need to fill all the fields to sign up!");
      Navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="lg:flex lg:w-2/2 lg:h-screen lg:justify-around lg:items-center  ">
        <img
          className="lg:w-1/2 lg:h-screen  lg:object-contain  fadeIn lg:block hidden   "
          src={message}
          alt=""
        />
        <form
          className="flex flex-col text-center items-center space-y-9  text-custom-blue lg:w-1/2   my-5 fadeIn"
          onSubmit={handleSubmit}
        >
          <div className="  flex flex-col  justify-center items-center">
            <Svg />

            <h1 className="  text-custom-blue   opacity-50 text-2xl font-bold ">
              Sign Up{" "}
            </h1>
          </div>
          <label
            htmlFor="file"
            className="flex flex-col justify-center items-center px-4 py-2  bg-white rounded-2xl text-custom-blue text-center transition duration-500 hover:text-white hover:bg-custom-blue  shadow-lg"
          >
            <span className=" text-base leading-normal">
              choose you profile image
            </span>
            <input
              type="file"
              className="hidden"
              id="file"
              onChange={handleFileChange}
            />
          </label>{" "}
          <label className="w-full" htmlFor="name">
            Name:
            <br />
            <input
              className="  border-black  opacity-50  border   h-12 rounded-md focus:outline-none   lg:w-2/5 w-3/5 "
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="w-full" htmlFor="lastname">
            Last Name:
            <br />
            <input
              className="  border-black  opacity-50  border   h-12 rounded-md focus:outline-none   lg:w-2/5 w-3/5 "
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
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
              className="  border-black  opacity-50  border   h-12 rounded-md focus:outline-none   lg:w-2/5 w-3/5 "
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex">
            <label className="w-full" htmlFor="description ">
              Description:
              <br />
              <textarea
                className=" border-b-2 rounded-md  opacity-50  focus:outline-none focus:border-none shadow-lg   w-4/5"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="w-full" htmlFor="occupation">
              Occupation:
              <br />
              <textarea
                className=" border-b-2  opacity-50 rounded-md  focus:outline-none focus:border-none shadow-lg   w-4/5"
                id="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </label>
          </div>
          <Button
            value="submit"
            className="  text-white py-2 px-6 w-2/5 font-bold rounded-2xl text-xl fillEffect shadow-lg  border border-custom-blue  "
          />
          <p
            className="underline text-center  text-custom-blue mt-5 text-lg cursor-pointer"
            onClick={() => Navigate("/login")}
          >
            login
          </p>
        </form>
      </div>
    </>
  );
}

export default Registration;
