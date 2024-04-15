import { useState } from "react";
import Plus from "/plus.png";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";
import { useUser } from "../context/app.context";

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [video, setVideo] = useState("");
  const userFromCtx = useUser();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (userFromCtx) {
      formData.append("posterId", userFromCtx._id);
      formData.append("message", message);
      formData.append("video", video);
      if (file) {
        formData.append("file", file);
      }

      fetch("https://whisper-server.vercel.app/post", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            setIsOpen(false);
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };
  return (
    <div className="flex items-center justify-center">
      <img
        src={Plus}
        alt="Aggiungi post"
        className="w-10 cursor-pointer"
        onClick={handleClick}
      />

      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full h-auto p-4 mx-3 space-y-5 bg-white rounded lg:w-1/2"
          >
            <h1 className="text-center">Create a post </h1>

            <div className="flex items-end justify-end ">
              <button onClick={handleClick}>
                <IoCloseOutline />
              </button>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Messagge"
                required
                className="mb-2"
                onChange={handleMessageChange}
              />

              <input
                type="text"
                placeholder="URL del video"
                className="mb-2"
                onChange={handleVideoChange}
              />
            </div>
            <div className="flex flex-col items-center justify-between ">
              <h1 className="text-xl ">choose a picture</h1>
              <label htmlFor="uploadFile">
                <AiOutlinePicture className="text-3xl" />
              </label>
              <input
                type="file"
                id="uploadFile"
                className="hidden mb-2"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-end">
                {file && (
                  <img
                    className="w-12"
                    src={URL.createObjectURL(file)}
                    alt="Anteprima"
                  />
                )}
                {file && <span>{file.name}</span>}
              </div>
            </div>
            <div className="flex justify-end ">
              <button
                type="submit"
                className="w-20 h-10 mb-2 text-white transition duration-300 ease-in-out border rounded-lg bg-custom-blue hover:bg-custom-white hover:text-black"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
