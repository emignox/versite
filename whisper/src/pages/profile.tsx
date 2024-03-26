import { UidContext } from "../components/app.context";
import { useContext } from "react";
import Connection from "./connection";
import Update from "../components/profile/updateProfile";

const Profile = () => {
  const uid = useContext(UidContext);

  return <div>{!uid ? <Connection /> : <Update />}</div>;
};
export default Profile;
