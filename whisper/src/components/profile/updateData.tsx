import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { useUser } from "../../context/app.context";

const UpdateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [formUsername, setFormUsername] = useState(false);
  const [formEmail, setFormEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userFromCtx = useUser();
  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/api/user/${userFromCtx?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.message.code === 11000) {
          // Imposta il messaggio di errore
          setErrorMessage("Username already taken");
          console.log("Username already taken");
        } else {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
      } else {
        if (userFromCtx) {
          userFromCtx.username = username;
          setFormUsername(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = JSON.stringify({ email });
    console.log(body);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/${userFromCtx?._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    if (userFromCtx) {
      userFromCtx.email = email;
      setFormEmail(false);
    }
  };

  return (
    <div>
      {formUsername ? (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleUsernameSubmit}
        >
          <label htmlFor="username">Username:</label>
          <input
            className="w-1/2 p-2 my-2 border-2 border-transparent rounded-md"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            maxLength={30}
          ></input>
          {errorMessage && (
            <p className="my-1 font-medium text-red-500 ">{errorMessage}</p>
          )}

          <div className="flex gap-3 ">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-custom-blue"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded"
              onClick={() => setFormUsername(false)}
            >
              cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-center gap-2 my-5 font-bold ">
          <h1>Username:</h1>
          {userFromCtx?.username}
          <FaPencilAlt onClick={() => setFormUsername(true)} />
        </div>
      )}
      {formEmail ? (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleEmailSubmit}
        >
          <label htmlFor="email">Email:</label>
          <input
            className="w-1/2 p-2 my-2 border-2 border-transparent rounded-md"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            maxLength={30}
          ></input>
          <div className="flex gap-3 ">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded bg-custom-blue"
            >
              Submit
            </button>
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded"
              onClick={() => setFormEmail(false)}
            >
              cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-center gap-2 font-bold ">
          <h1>Email:</h1>
          {userFromCtx?.email}
          <FaPencilAlt onClick={() => setFormEmail(true)} />
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
