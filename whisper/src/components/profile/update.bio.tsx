// import { useContext } from "react";
// import { useUser } from "../app.context";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

const UpdateBio = () => {
  //const { user } = useContext(UidContext);
  // const userFromCtx = useUser();

  const userFromCtx = null;
  // console.log(userFromCtx, "userFromCtx 2");

  const [bio, setBio] = useState("");
  const [form, setForm] = useState(false);

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
      `http://localhost:5001/api/user/${userFromCtx?._id}`,
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
      {userFromCtx?.bio ? (
        <div className=" flex  justify-center items-center  gap-2  ">
          {userFromCtx.bio}
          <FaPencilAlt onClick={() => setForm(true)} />
        </div>
      ) : null}

      {form && (
        <form
          onSubmit={handleBioSubmit}
          className="flex flex-col justify-center items-center"
        >
          <label htmlFor="bio">Bio:</label>
          <input
            className="w-1/2 rounded-md border-2 border-transparent my-2 p-2"
            id="bio"
            type="text"
            onChange={(e) => setBio(e.target.value)}
          ></input>
          <button
            type="submit"
            className="bg-custom-blue text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateBio;
