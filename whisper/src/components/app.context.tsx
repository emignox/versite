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
  setUid: (uid: Uid) => void;
  setUser: (user: User | null) => void;
}

const initialContext = {
  uid: null,
  user: null,
  setUid: () => {
    return null;
  },
  setUser: () => {
    return null;
  },
};

export const UidContext = createContext<UidContext>(initialContext);

const useStore = () => {
  const [uid, setUid] = useState<Uid>(initialContext.uid);
  const [user, setUser] = useState<User | null>(initialContext.user);

  console.log(uid, "uid in ctx");

  return {
    uid,
    user,
    setUid,
    setUser,
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
