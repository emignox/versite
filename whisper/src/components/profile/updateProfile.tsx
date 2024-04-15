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
    const response = await fetch(
      `https://whisper-server.vercel.app/user/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      alert("Profile picture updated");
      window.location.reload();
    }
  };

  return (
    <>
      <Logo />
      <div className="flex flex-col items-center justify-center mt-12 ">
        <div className="flex items-center justify-center p-2 space-y-3 "></div>
        <Follow />
        <form
          className="flex flex-col items-center justify-center my-5 space-y-8 "
          action=""
          onSubmit={handlePicture}
        >
          <img
            className="w-2/6 mx-2 mt-5 rounded-full h-2/6 -z-50 "
            src={`./client/public/${userFromCtx?.picture}`}
            alt=""
          />
          <button className="">
            <label
              htmlFor="file"
              className="px-4 py-2 text-white rounded cursor-pointer bg-custom-blue hover:bg-custom-dark-blue"
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
              <div className="flex gap-3 ">
                <button
                  className="px-4 py-2 text-white rounded bg-custom-blue"
                  type="submit"
                >
                  Send
                </button>

                <button
                  className="px-4 py-2 text-white bg-gray-500 rounded"
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
