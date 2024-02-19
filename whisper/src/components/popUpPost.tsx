import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./button";
interface Props {
  closePopup: () => void;
}

function PostForm({ closePopup }: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("picture", image);
    }

    try {
      const response = await fetch("/your-endpoint", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex    items-center">
      <form
        className="flex flex-col justify-around mx-auto w-3/4  space-y-3 text-custom-blue font-bold   text-center h-2/6 rounded-xl height-1/2  bg-custom-white p-4 z-50"
        onSubmit={handleSubmit}
      >
        <label className="opacity-70" htmlFor="title">
          title:
          <br />
          <input
            className=" rounded-lg w-4/5"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="opacity-70" htmlFor="">
          content:
          <br />
          <textarea
            className="w-4/5 h-1/2 rounded-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <input type="file" onChange={handleImageChange} />
        <button className="text-black" type="button" onClick={closePopup}>
          Close
        </button>
        <Button
          value="Send "
          className="text-custom-white border border-custom-blue bg-custom-blue rounded-md w-1/2  mx-auto "
        />
      </form>
    </div>
  );
}

export default PostForm;
