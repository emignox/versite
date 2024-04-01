// import { useState } from "react";
// import { useUser } from "../context/app.context";
// import { AiOutlineLike } from "react-icons/ai";
// import { useLikes } from "../context/post.context";

// interface LikesCommentsProps {
//   post: Post;
// }
// interface Post {
//   _id: string;
//   message: string;
//   posterId: string;
//   likers: string[];
//   comments: string[];
//   date: number;
//   picture: string;
//   createdAt: string;
// }

// const Likes: React.FC<LikesCommentsProps> = ({ post }) => {
//   const userFromCtx = useUser();
//   const Likes = useLikes();
//   const [likes, setLikes] = useState<string[]>([]);

//   const likePost = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5001/api/post/like-post/${post._id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ id: userFromCtx?._id }), // pass user ID in the request body
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Error while liking the post");
//       }

//       const data = await response.text();

//       if (data === "The post has been liked") {
//         setLikes((prevLikes) => [...prevLikes, post._id]);
//       } else if (data === "The post has been unliked") {
//         setLikes((prevLikes) => prevLikes.filter((id) => id !== post._id));
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <div className=" flex justify-start items-center">
//         {likes.length}
//         <h1 onClick={likePost}>
//           {" "}
//           <AiOutlineLike className=" text-black" />
//         </h1>
//       </div>
//     </>
//   );
// };

// export default Likes;

import { useUser } from "../context/app.context";
import { useSetLikes } from "../context/post.context"; // Importa questi hook
import { AiOutlineLike } from "react-icons/ai";

interface LikesCommentsProps {
  post: Post;
}
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

const Likes: React.FC<LikesCommentsProps> = ({ post }) => {
  const userFromCtx = useUser();
  const setLikes = useSetLikes(); // Usa il hook useSetLikes

  const likePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/post/like-post/${post._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userFromCtx?._id }), // pass user ID in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Error while liking the post");
      }

      const data = await response.text();

      if (data === "The post has been liked") {
        setLikes((prevLikes: string[]) => [...prevLikes, post._id]);
      } else if (data === "The post has been unliked") {
        setLikes((prevLikes: string[]) =>
          prevLikes.filter((id) => id !== post._id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className=" flex justify-start items-center">
        {post.likers.length}
        <h1 onClick={likePost}>
          {" "}
          <AiOutlineLike className=" text-black" />
        </h1>
      </div>
    </>
  );
};

export default Likes;
