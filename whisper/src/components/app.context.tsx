import { createContext } from "react";
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  followers: string[];
  following: string[];
  picture: string;
  likes: string[];
}

interface UidContextProps {
  uid: string | null;
  user: User | null;
  setUid: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UidContext = createContext<UidContextProps>({
  uid: null,
  user: null,
  setUid: () => {},
});

export const uploadImg = async (file: File, userId: string) => {
  const data = new FormData();
  data.append("userId", userId);
  data.append("file", file);
  await fetch("http://localhost:5001/api/user/upload", {
    method: "POST",
    body: data,
  });
};
