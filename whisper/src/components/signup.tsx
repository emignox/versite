import { useState } from "react";
import Svg from "./svg";
import Button from "./button";

function Registration() {
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="  flex flex-col mx-auto justify-center items-center">
        <Svg />

        <h1 className="  text-custom-blue   opacity-50 text-2xl font-bold my-10">
          Sign Up{" "}
        </h1>
      </div>
      <form
        className="flex flex-col text-center items-center space-y-9  text-custom-blue   "
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="file"
          className="flex flex-col justify-center items-center px-4 py-2  bg-white rounded-2xl text-custom-blue text-center hover:text-white hover:bg-custom-blue "
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
            className=" border-b-2  border-black bg-transparent focus:outline-none focus:border-none w-3/5"
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
            className=" border-b-2  border-black bg-transparent focus:outline-none focus:border-none   w-3/5"
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
            className=" border-b-2  border-black bg-transparent focus:outline-none focus:border-none   w-3/5"
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
            className=" border-b-2  border-black bg-transparent focus:outline-none focus:border-none  w-3/5 "
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="w-full" htmlFor="description ">
          Description:
          <br />
          <input
            className=" border-b-2  border-black bg-transparent focus:outline-none focus:border-none   w-3/5"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="w-full" htmlFor="occupation">
          Occupation:
          <br />
          <input
            className=" border-b-2  border-black bg-transparent focus:outline-none focus:border-none   w-3/5"
            id="occupation"
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </label>
        <Button value="submit" />
      </form>
      <p className="underline text-center  text-custom-blue mt-5 text-lg">
        login
      </p>
    </>
  );
}

export default Registration;
