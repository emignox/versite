import { useState, useEffect } from "react";
import { useUser } from "../../context/app.context";

type User = {
  _id: string;
  username: string;
  picture: string;
};

function Follow() {
  const userFromCtx = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/user", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  function handleClick() {
    setPop(true);
  }
  function handleClose() {
    setPop(false);
  }

  return (
    <div className="flex gap-2 bg-opacity-20 backdrop-blur text-black  bg-white font-bold w-96 rounded-2xl justify-around items-center h-12 my-5 ">
      <div>
        <h1 onClick={handleClick} className=" ">
          {userFromCtx?.followers.length} Followers
        </h1>

        {pop // utilizza 'pop' invece di 'setPop()'
          ? userFromCtx?.followers.map((followerId, index) => {
              const follower = users.find(
                (user: User) => user._id === followerId
              );
              return (
                <div
                  key={index}
                  className="absolute  z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-hidden"
                >
                  <div className="bg-white bg-opacity-20 backdrop-blur w-1/2 p-4 rounded shadow-lg overflow-auto">
                    <div className="flex justify-between items-center h-full w-full my-3">
                      <h1>FOLLOWERS</h1>
                      <button onClick={handleClose}>x</button>
                    </div>
                    <div className="flex justify-start p-3 items-center w-full rounded-full border-black border-2 ">
                      <img
                        className="w-10 rounded-full h-10"
                        src={`./client/public/${follower?.picture} `}
                        alt=""
                      />
                      <p className="text-black text-center p-5  ">
                        {follower?.username}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div>
        <h1 className=" text-black">
          {userFromCtx?.following.length} Following
        </h1>
        {userFromCtx?.following.map((followingId, index) => {
          const following = users.find(
            (user: User) => user._id === followingId
          );
          return (
            <div
              key={index}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white rounded shadow-lg w-1/2 h-1/2">
                <p className="text-black">
                  {following?.username}
                  ciaoodfzfnjdbfjkdfb
                </p>
                <img src={following?.picture} alt="" />
                <div className="flex justify-end items-end w-full">
                  <button onClick={handleClose}>close</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className=" text-black">{userFromCtx?.likes.length} Likes</h1>
    </div>
  );
}
export default Follow;
