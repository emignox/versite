import axios from "axios";
import { useEffect, useState } from "react";
import Like from "./likes";
import Comment from "./comments";

interface Post {
  _id: string;
  message: string;
  posterId: string;
  likers: string[];
  comments: string[];
  date: number;
  picture: string;
  createdAt: string;
}

interface User {
  username: string;
  picture: string;
}

const GetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  const getTimeDifference = (date: string) => {
    const postDate = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.abs((now.getTime() - postDate.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return diffInDays + "d";
    } else if (diffInHours > 0) {
      return diffInHours + "h";
    } else if (diffInMinutes > 0) {
      return diffInMinutes + "m";
    } else {
      return "Just now";
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/post")
      .then((response) => {
        const posts = response.data;
        setPosts(posts);

        // Mappa gli ID degli utenti ai loro dettagli
        const userPromises = posts.map((post: Post) =>
          axios.get(`http://localhost:5001/api/user/${post.posterId}`)
        );

        return Promise.all(userPromises);
      })
      .then((userResponses) => {
        const users = userResponses.reduce((acc, res, index) => {
          acc[posts[index].posterId] = res.data;
          return acc;
        }, {});

        setUsers(users);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [posts]); // Aggiungi questo array vuoto

  return (
    <div className=" pb-12">
      {posts.map((post: Post, index: number) => (
        <div key={index} className=" flex justify-center items-center mt-12 ">
          <div className="flex flex-col  justify-center items-center bg-opacity-20 backdrop-blur    w-72 bg-black p-5 m-4 rounded-lg lg:w-1/3">
            <div className=" w-full flex justify-between items-start">
              <h3 className=" text-start  flex  justify-start items-start">
                <img
                  className="w-8 h-8 rounded-full object-cover mr-2  "
                  src={`./client/public/${users[post.posterId]?.picture}`}
                  alt="Profile"
                />
                {users[post.posterId]?.username}
              </h3>
              <span className="ml-2 text-sm text-gray-200 ">
                {getTimeDifference(post.createdAt)}
              </span>
            </div>
            <h2 className=" text-start w-full my-2">{post.message}</h2>
            <img
              className=" rounded-md"
              src={`./client/public/${post.picture} `}
              alt=""
            />{" "}
            <div className="flex justify-between w-full items-center">
              <Like post={post} /> <Comment post={post} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetPost;
