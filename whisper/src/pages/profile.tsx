import { UidContext } from "../components/app.context";
import { useContext } from "react";
import Connection from "./connection";

const Profile = () => {
  const uid = useContext(UidContext);

  return <div>{uid ? <Connection /> : <h1>Profile</h1>}</div>;
};
export default Profile;
