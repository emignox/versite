import { createContext, useContext, useState } from "react";

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

type Uid = string | null;

interface UidProviderProps {
  children: React.ReactNode;
}

interface UidContext {
  uid: Uid;
  user: User | null;
  followers: string[];
  following: string[];
  setUid: (uid: Uid) => void;
  setUser: (user: User | null) => void;
  setFollowers: (followers: string[]) => void; // Aggiungi questo
  setFollowing: (following: string[]) => void; // Aggiungi questo
}

const initialContext = {
  uid: null,
  user: null,
  followers: [], // Aggiungi questo
  following: [], // Aggiungi questo
  setUid: () => {
    return null;
  },
  setUser: () => {
    return null;
  },
  setFollowers: () => {}, // Aggiungi questo
  setFollowing: () => {}, // Aggiungi questo
};

export const UidContext = createContext<UidContext>(initialContext);

const useStore = () => {
  const [uid, setUid] = useState<Uid>(initialContext.uid);
  const [user, setUser] = useState<User | null>(initialContext.user);
  const [followers, setFollowers] = useState<string[]>([]); // Aggiungi questo
  const [following, setFollowing] = useState<string[]>([]); // Aggiungi questo

  console.log(uid, "uid in ctx");

  return {
    uid,
    user,
    followers,
    following,
    setUid,
    setUser,
    setFollowers,
    setFollowing,
  };
};

export const UidProvider = ({ children }: UidProviderProps) => (
  <UidContext.Provider value={useStore()}>{children}</UidContext.Provider>
);

const useUidProviderStoreContext = () => useContext(UidContext);

export const useUid = () => useUidProviderStoreContext()?.uid;
export const useSetUid = () => useUidProviderStoreContext().setUid;
export const useUser = () => useUidProviderStoreContext()?.user;
export const useSetUser = () => useUidProviderStoreContext().setUser;
export const useFollowers = () => useUidProviderStoreContext()?.followers; // Aggiungi questo
export const useSetFollowers = () => useUidProviderStoreContext().setFollowers; // Aggiungi questo
export const useFollowing = () => useUidProviderStoreContext()?.following; // Aggiungi questo
export const useSetFollowing = () => useUidProviderStoreContext().setFollowing; // Aggiungi questo
