import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { useUser } from "../../context/app.context";

const UpdateBio = () => {
  const [bio, setBio] = useState("");
  const [form, setForm] = useState(false);

  const userFromCtx = useUser();

  //   const [currentUser, setCurrentUser] = useState(user);
  //   const [editing, setEditing] = useState(false);
  //   useEffect(() => {
  //     async () => {
  //       const response = await fetch(
  //         `http://localhost:5001/api/user/${user?._id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ bio }),
  //         }
  //       );

  //       if (!response.ok) {
  //         const message = `An error has occured: ${response.status}`;
  //         throw new Error(message);
  //       }
  //     };
  //     console.log(Response);
  //   }, [bio]);

  //   const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setBio(e.target.value);
  //   };

  // [TODO]: Use axios instead of fetch here.
  // remain consistent with the rest of the codebase
  const handleBioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `https://whisper-server.vercel.app/user/${userFromCtx?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio }),
      }
    );

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    if (userFromCtx) {
      userFromCtx.bio = bio;
      setForm(false);
    }
  };

  // [NOTE]: Simplify the logic here a bit but after handling all the success and the erorr states
  // too many conditional rendering can be confusing to read
  return (
    <div>
      {form ? (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleBioSubmit}
        >
          <label htmlFor="bio">Bio:</label>
          <textarea
            className="w-full h-8 p-2 my-2 border-black "
            id="bio"
            onChange={(e) => setBio(e.target.value)}
            maxLength={150}
          ></textarea>
          <div className="flex items-center justify-center gap-3 ">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-custom-blue"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded"
              onClick={() => setForm(false)}
            >
              cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-center gap-2 my-5 font-medium rounded ">
          <h1>Bio:</h1>
          {userFromCtx?.bio}
          <FaPencilAlt onClick={() => setForm(true)} />
        </div>
      )}
    </div>
  );
};

export default UpdateBio;
