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
    fetch(`https://whisper-server.vercel.app/user`, {
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
    <div className="flex items-center justify-around h-12 gap-2 my-5 font-bold text-black bg-white bg-opacity-20 backdrop-blur w-96 rounded-2xl">
      <div>
        <h1 onClick={handleClickFollower} className="">
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
                  className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-50 backdrop-blur-xl"
                >
                  <div className="max-w-md p-4 overflow-auto rounded shadow-lg bg-custom-white">
                    <div className="flex items-center justify-between w-full h-full my-3">
                      <h1>FOLLOWERS</h1>
                      <button onClick={handleClose}>x</button>
                    </div>
                    <div className="flex items-center justify-start w-full py-1 pr-2 border-2 border-black rounded-full ">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`./client/public/${follower?.picture} `}
                        alt=""
                      />
                      <p className="mx-3 text-center text-black ">
                        {follower?.username}
                      </p>
                      <button className="px-1 py-1 text-white bg-custom-blue rounded-xl ">
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
        <h1 onClick={() => setPopFollowing(true)} className="text-black ">
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
                  className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center h-screen bg-black bg-opacity-50 backdrop-blur-xl"
                >
                  <div className="max-w-md p-4 overflow-auto rounded shadow-lg bg-custom-white">
                    <div className="flex items-center justify-between w-full h-full my-3">
                      <h1>FOLLOWERS</h1>
                      <button onClick={() => setPopFollowing(false)}>x</button>
                    </div>
                    <div className="flex items-center justify-start w-full py-1 pr-2 border-2 border-black rounded-full ">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={`./client/public/${following?.picture} `}
                        alt=""
                      />
                      <p className="mx-3 text-center text-black ">
                        {following?.username}
                      </p>
                      <button className="px-1 py-1 text-white bg-custom-blue rounded-xl ">
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
      <h1 className="text-black ">{userFromCtx?.likes.length} Likes</h1>
    </div>
  );
}
export default Follow;
