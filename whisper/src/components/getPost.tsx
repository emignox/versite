import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
  message: string;
  posterId: string;
  likers: string[];
  comments: string[];
  date: number;
  picture: string;
}

interface User {
  username: string;
  profilePicture: string;
}

const GetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/post")
      .then((response) => {
        const posts = response.data;
        setPosts(posts);
        const userIds = posts.map((post: Post) => post.posterId);
        return Promise.all(
          userIds.map((id: number) =>
            axios.get(`http://localhost:5001/api/user/${id}`)
          )
        );
      })
      .then((responses) => {
        const users = responses.reduce(
          (acc, response, index) => {
            acc[posts[index].posterId] = response.data;
            return acc;
          },
          {} as { [key: string]: User }
        );
        setUsers(users);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [posts]); // Rimuovi 'posts' dalle dipendenze

  return (
    <div>
      <div>
        {posts.map((post: Post, index) => (
          <div key={index} className=" flex justify-center items-center">
            <div className="flex flex-col justify-center items-center  w-72 bg-white p-2 m-4 rounded-lg lg:w-1/3">
              <div className=" w-full flex justify-start items-start">
                <h3 className=" text-start">
                  {users[post.posterId]?.username}
                </h3>
              </div>
              <h2>{post.message}</h2>

              <h4>{post.date}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetPost;
