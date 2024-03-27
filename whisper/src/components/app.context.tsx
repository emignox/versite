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

interface UidContextProps {
  uid: string | null;
  // user: User | null;
  setUid: (uid: string | null) => void;
  // setUser: (user: User | null) => void;
}

const initialContext: UidContextProps = {
  uid: null,
  // user: null,
  setUid: () => {
    return;
  },
  // setUser: () => {
  //   return;
  // },
};

export const UidContext = createContext<UidContextProps>(initialContext);

const useStore = () => {
  const [uid, setUid] = useState(initialContext.uid);
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

export const UidProvider = ({ children }: { children: React.ReactNode }) => (
  <UidContext.Provider value={useStore()}>{children}</UidContext.Provider>
);

const useUidProviderStoreContext = () => useContext(UidContext);

// export const useUser = () => useUidProviderStoreContext()?.user;
// export const useSetUser = () => useUidProviderStoreContext().setUser;
export const useUid = () => useUidProviderStoreContext()?.uid;
export const useSetUid = () => useUidProviderStoreContext().setUid;
