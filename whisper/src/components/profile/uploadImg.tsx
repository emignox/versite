import { useState, FormEvent, ChangeEvent } from "react";
import { UidContext } from "../app.context";
import { useContext } from "react";

const UploadImg = () => {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useContext(UidContext);

  const handlePicture = (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", user?.username || "");
    data.append("userId", user ? user._id || "" : "");
    data.append("file", file as Blob);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (file) setFile(e.target.files ? e.target.files[0] : null);
  };

  return (
    <div>
      <form className="" onSubmit={handlePicture}>
        <label htmlFor="file">Change image</label>
        <input
          onChange={handleFileChange}
          type="file"
          name="file"
          id="file"
          accept=".jpg, .jpeg, .png"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadImg;
