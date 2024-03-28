import { useContext } from "react";
import { UidContext } from "../app.context";
import { useState } from "react";
import Bio from "./update.bio";

const Update = () => {
  const { user } = useContext(UidContext);
  const [file, setFile] = useState<File | null>(null);

  const handlePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", user?.username || "");
    data.append("userId", user ? user._id || "" : "");
    data.append("file", file as Blob);
    const response = await fetch("http://localhost:5001/api/user/upload", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center p-2 space-y-3">
        <img
          className="rounded-full  w-10 h-10 mx-2 mt-5  object-cover object-top "
          src={`./client/public/${user ? user.picture : ""}`}
          alt=""
        />
        <h1 className=" text-center text-3xl ">{user?.username}</h1>
      </div>
      <div className="my-12 text-center">
        <article className="my-3 font-black text-3xl">{user?.email}</article>
        <Bio />
      </div>
      <div>
        <form
          className=" flex flex-col  justify-center items-center space-y-5  "
          action=""
          onSubmit={handlePicture}
        >
          <img
            className="rounded-full  w-52 mx-2 mt-5  object-cover object-top "
            src={`./client/public/${user?.picture}`}
            alt=""
          />
          <button className="">
            <label
              htmlFor="file"
              className="cursor-pointer bg-custom-blue text-white px-4 py-2 rounded"
            >
              Change Profile image
            </label>
          </button>
          <input
            className="hidden"
            name="file"
            id="file"
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <button type="submit">Invia</button>
        </form>
      </div>
    </>
  );
};

export default Update;
