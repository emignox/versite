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
