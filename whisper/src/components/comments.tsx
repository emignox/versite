import { useState } from "react";
import { useUser } from "../context/app.context";
import { AiOutlineComment } from "react-icons/ai";
import { useComments, useSetComments } from "../context/post.context"; // Importa useComments e useSetComments

interface CommentProps {
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

const Comments: React.FC<CommentProps> = ({ post }) => {
  const userFromCtx = useUser();
  const comments = useComments(); // Usa il contesto dei commenti
  const setComments = useSetComments(); // Usa il contesto dei commenti
  const [commentText, setCommentText] = useState("");
  const [form, setForm] = useState(false);

  const commentPost = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5001/api/post/comment-post/${post._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commenterId: userFromCtx?._id,
            commenterUsername: userFromCtx?.username,
            text: commentText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error while commenting on the post");
      }

      const data = await response.json();

      setComments((prevComments) => [...prevComments, data]);
      setCommentText(""); // clear the comment input after successful submission
    } catch (error) {
      console.error(error);
    }
    console.log(comments);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        {" "}
        <AiOutlineComment
          onClick={() => setForm(true)}
          className="text-black"
        />{" "}
        {post.comments.length}
      </div>

      {form && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 transform transition-transform duration-300 ease-in-out translate-y-full">
          <form onSubmit={commentPost}>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit">Submit</button>
            <button onClick={() => setForm(false)}>cancel </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Comments;
