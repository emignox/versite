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

interface UidProviderProps {
  children: React.ReactNode;
}

interface UidContext {
  uid: string | null;
  // user: User | null;
  setUid: (uid: string | null) => void;
  // setUser: (user: User | null) => void;
}

const initialContext = {
  uid: null,
  // uid: "65f448df902bb6c2cee933c5",
  // user: null,
  setUid: () => {
    return;
  },
  // setUser: () => {
  //   return;
  // },
};

export const UidContext = createContext<UidContext>(initialContext);

const useStore = () => {
  const [uid, setUid] = useState<string | null>(initialContext.uid);
  // const [user, setUser] = useState(initialContext.user);

  console.log(uid, "uid in ctx");

  return {
    uid,
    // user,
    setUid,
    // setUser,
    // resetUid: () => setUid(null),
    // resetUser: () => setUser(null),
  };
};

export const UidProvider = ({ children }: UidProviderProps) => (
  <UidContext.Provider value={useStore()}>{children}</UidContext.Provider>
);

const useUidProviderStoreContext = () => useContext(UidContext);

// export const useUser = () => useUidProviderStoreContext()?.user;
// export const useSetUser = () => useUidProviderStoreContext().setUser;
export const useUid = () => useUidProviderStoreContext()?.uid;
export const useSetUid = () => useUidProviderStoreContext().setUid;
