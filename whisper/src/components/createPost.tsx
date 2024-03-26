import { useState } from "react";
import Plus from "/plus.png";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";
import axios from "axios";

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("message", message);

    if (video) formData.append("video", video);

    try {
      const response = await axios.post(
        `http://localhost:5001/api/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errors = error.response?.data.errors;
        console.error(errors);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <img
        src={Plus}
        alt="Aggiungi post"
        className="w-10 cursor-pointer"
        onClick={handleClick}
      />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <form
            action=""
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded mx-3 h-auto space-y-5 w-full lg:w-1/2"
          >
            <h1 className="text-center">Create a post </h1>

            <div className=" flex items-end justify-end ">
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
            <div className=" flex flex-col justify-between items-center">
              <h1 className=" text-xl">choose a picture</h1>
              <label htmlFor="uploadFile">
                <AiOutlinePicture className="text-3xl" />
              </label>
              <input
                type="file"
                id="uploadFile"
                className="mb-2 hidden"
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
            <div className=" flex justify-end ">
              <button
                type="submit"
                className="mb-2  bg-custom-blue text-white h-10 w-20 border rounded-lg hover:bg-custom-white hover:text-black transition duration-300 ease-in-out"
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
