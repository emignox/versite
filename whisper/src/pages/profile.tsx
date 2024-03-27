import { UidContext } from "../components/app.context";
import { useContext } from "react";
// import { useUid } from "../components/app.context";
import Connection from "./connection";
import Update from "../components/profile/updateProfile";

const Profile = () => {
  // const useUidFromCtx = useUid();
  // console.log(useUidFromCtx, "useUidFromCtx in profile");
  const uid = useContext(UidContext);
  return <div>{!uid ? <Connection /> : <Update />}</div>;
};
export default Profile;
