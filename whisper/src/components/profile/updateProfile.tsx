import { useUser } from "../../context/app.context";
import { useState } from "react";
import Bio from "./update.bio";
import UpdateData from "./updateData";
import Nav from "../nav";
import Logo from "../logo";
import Follow from "./follow";

const Update = () => {
  const [file, setFile] = useState<File | null>(null);
  const userFromCtx = useUser();
  const [fileName, setFileName] = useState("");

  const handlePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userFromCtx?.username || "");
    data.append("userId", userFromCtx?._id || "");
    data.append("file", file as Blob);
    const response = await fetch("http://localhost:5001/api/user/upload", {
      method: "POST",
      body: data,
    });
    if (response.ok) {
      alert("Profile picture updated");
      window.location.reload();
    }
  };

  return (
    <>
      <Logo />
      <div className=" flex justify-center  flex-col items-center mt-12   ">
        <div className=" flex justify-center items-center p-2 space-y-3"></div>
        <Follow />
        <form
          className=" flex flex-col  justify-center items-center space-y-8 my-5  "
          action=""
          onSubmit={handlePicture}
        >
          <img
            className="rounded-full  w-2/6  h-2/6  mx-2 mt-5 -z-50   "
            src={`./client/public/${userFromCtx?.picture}`}
            alt=""
          />
          <button className="">
            <label
              htmlFor="file"
              className="cursor-pointer bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-dark-blue"
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
                setFileName(e.target.files[0].name);
              }
            }}
          />

          {fileName && (
            <>
              <p>File selezionato: {fileName}</p>
              <div className=" flex  gap-3">
                <button
                  className="bg-custom-blue text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Send
                </button>

                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile(null);
                    setFileName("");
                  }}
                >
                  Annulla
                </button>
              </div>
            </>
          )}
        </form>
        <div className="my-12 text-center">
          <Bio />
          <UpdateData />
        </div>
      </div>
      <Nav />
    </>
  );
};

export default Update;
