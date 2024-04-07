import { useState, useEffect } from "react";
import { useUser } from "../../context/app.context";
import ReactDOM from "react-dom";

type User = {
  _id: string;
  username: string;
  picture: string;
};

function Follow() {
  const userFromCtx = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [pop, setPop] = useState(false);
  const [popFollowing, setPopFollowing] = useState(false);

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

  function handleClickFollower() {
    setPop(true);
  }
  function handleClose() {
    setPop(false);
  }

  return (
    <div className="  flex gap-2 bg-opacity-20 backdrop-blur text-black  bg-white font-bold w-96 rounded-2xl justify-around items-center h-12 my-5 ">
      <div>
        <h1 onClick={handleClickFollower} className=" ">
          {userFromCtx?.followers.length} Followers
        </h1>
        {pop
          ? userFromCtx?.followers.map((followerId, index) => {
              const follower = users.find(
                (user: User) => user._id === followerId
              );
              return ReactDOM.createPortal(
                <div
                  key={index}
                  className=" fixed top-0 left-0  backdrop-blur-xl z-50  h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                  <div className=" bg-custom-white   max-w-md p-4 rounded shadow-lg overflow-auto">
                    <div className="flex justify-between items-center h-full w-full my-3">
                      <h1>FOLLOWERS</h1>
                      <button onClick={handleClose}>x</button>
                    </div>
                    <div className="flex justify-start  pr-2 py-1  items-center w-full rounded-full border-black border-2 ">
                      <img
                        className="w-10 rounded-full h-10"
                        src={`./client/public/${follower?.picture} `}
                        alt=""
                      />
                      <p className="text-black text-center  mx-3   ">
                        {follower?.username}
                      </p>
                      <button className="text-white bg-custom-blue  rounded-xl px-1 py-1 ">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>,
                document.body // render the popup directly inside the body
              );
            })
          : null}
      </div>
      <div>
        <h1 onClick={() => setPopFollowing(true)} className=" text-black">
          {userFromCtx?.following.length} Following
        </h1>
        {popFollowing
          ? userFromCtx?.following.map((followingId, index) => {
              const following = users.find(
                (user: User) => user._id === followingId
              );
              return ReactDOM.createPortal(
                <div
                  key={index}
                  className=" fixed top-0 left-0  backdrop-blur-xl z-50  h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                  <div className=" bg-custom-white   max-w-md p-4 rounded shadow-lg overflow-auto">
                    <div className="flex justify-between items-center h-full w-full my-3">
                      <h1>FOLLOWERS</h1>
                      <button onClick={() => setPopFollowing(false)}>x</button>
                    </div>
                    <div className="flex justify-start  pr-2 py-1  items-center w-full rounded-full border-black border-2 ">
                      <img
                        className="w-10 rounded-full h-10 object-cover"
                        src={`./client/public/${following?.picture} `}
                        alt=""
                      />
                      <p className="text-black text-center  mx-3    ">
                        {following?.username}
                      </p>
                      <button className="text-white bg-custom-blue  rounded-xl px-1 py-1 ">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>,
                document.body // render the popup directly inside the body
              );
            })
          : null}
      </div>
      <h1 className=" text-black">{userFromCtx?.likes.length} Likes</h1>
    </div>
  );
}
export default Follow;
