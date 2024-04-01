import { createContext, useContext, useState } from "react";

export interface Post {
  _id: string;
  message: string;
  posterId: string;
  likers: string[];
  comments: string[];
  date: number;
  picture: string;
  createdAt: string;
}

interface Comment {
  _id: string;
  text: string;
  postId: string;
  commenterId: string;
  createdAt: string;
}

interface PostContext {
  posts: Post[];
  likes: string[];
  comments: Comment[]; // Aggiungi questo
  setPosts: (posts: Post[] | ((prevPosts: Post[]) => Post[])) => void;
  setLikes: (likes: string[] | ((prevLikes: string[]) => string[])) => void;
  setComments: (
    comments: Comment[] | ((prevComments: Comment[]) => Comment[])
  ) => void; // Aggiungi questo
}

const initialContext = {
  posts: [],
  likes: [],
  comments: [], // Aggiungi questo
  setPosts: () => {},
  setLikes: () => {},
  setComments: () => {}, // Aggiungi questo
};

export const PostContext = createContext<PostContext>(initialContext);

const useStore = () => {
  const [posts, setPosts] = useState<Post[]>(initialContext.posts);
  const [likes, setLikes] = useState<string[]>(initialContext.likes);
  const [comments, setComments] = useState<Comment[]>(initialContext.comments); // Aggiungi questo

  return {
    posts,
    likes,
    comments, // Aggiungi questo
    setPosts,
    setLikes,
    setComments, // Aggiungi questo
  };
};

export const PostProvider = ({ children }: { children?: React.ReactNode }) => (
  <PostContext.Provider value={useStore()}>{children}</PostContext.Provider>
);

export const usePosts = () => useContext(PostContext).posts;
export const useSetPosts = () => useContext(PostContext).setPosts;
export const useLikes = () => useContext(PostContext).likes;
export const useSetLikes = () => useContext(PostContext).setLikes;
export const useComments = () => useContext(PostContext).comments; // Aggiungi questo
export const useSetComments = () => useContext(PostContext).setComments; // Aggiungi questo
