import { useContext } from "react";
import { UidContext } from "../app.context";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

const UpdateBio = () => {
  const { user } = useContext(UidContext);
  const [form, setForm] = useState(false);
  const [bio, setBio] = useState("");

  console.log(user);

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

  const handleBioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:5001/api/user/${user?._id}`,
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

    if (response.ok) {
      alert("Bio updated");
      window.location.reload();
    }
  };

  return (
    // <form
    //   className="flex flex-col justify-center items-center"
    // //   onSubmit={handleBioSubmit}
    // >
    //   <label htmlFor="bio">Bio:</label>
    //   {currentUser && currentUser.bio && !editing ? (
    //     <div className="flex justify-center items-center mx-2">
    //       <h1>{currentUser.bio}</h1>
    //       <FaPencilAlt className="mx-3" onClick={() => setEditing(true)} />
    //     </div>
    //   ) : (
    //     <>
    //       <input
    //         className="w-1/2 rounded-md border-2 border-transparent my-2 p-2"
    //         id="bio"
    //         type="text"
    //         value={bio}
    //         onChange={handleBioChange}
    //       />
    //       <button className="bg-custom-blue text-white px-4 py-2 rounded">
    //         Submit
    //       </button>
    //     </>
    //   )}
    // </form>
    // <div>{user ? <pre>{JSON.stringify(user, null, 2)}</pre> : <h1> </h1>}</div>
    <div>
      {form ? (
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleBioSubmit}
        >
          <label htmlFor="bio">Bio:</label>
          <input
            className="w-1/2 rounded-md border-2 border-transparent my-2 p-2"
            id="bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={150}
          ></input>
          <div className=" flex  gap-3">
            <button
              type="submit"
              className="bg-custom-blue text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              className=" py-2 px-4 rounded text-white  bg-gray-600 hovrt:bg-gray-800 "
              onClick={() => setForm(false)}
            >
              cancel
            </button>
          </div>
        </form>
      ) : (
        <div className=" flex flex-col  justify-center items-center ">
          <h1 className=" text-center text-3xl">{user?.bio}</h1>
          <div className="group relative">
            <FaPencilAlt className="mx-3" onClick={() => setForm(true)} />
            <span className="hidden group-hover:block absolute  bg-gray-200 text-black px-2 py-1 text-sm rounded z-10 top-8 left-8">
              change bio
            </span>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default UpdateBio;
