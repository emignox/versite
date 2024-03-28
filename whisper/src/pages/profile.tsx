import { useUid } from "../context/app.context";
import Connection from "./connection";
import Update from "../components/profile/updateProfile";

const Profile = () => {
  const useUidFromCtx = useUid();

  // return early the component if uid is null
  // please delete once you hve read it
  if (!useUidFromCtx) {
    return;
  }

  return <div>{!useUidFromCtx ? <Connection /> : <Update />}</div>;
};
export default Profile;
