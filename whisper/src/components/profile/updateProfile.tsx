import { useContext } from "react";
import { UidContext } from "../app.context";

const Update = () => {
  const { user } = useContext(UidContext);

  return (
    <div>
      <h1 className="text-center text-3xl p-3">
        {user ? user.username : ""} Profile
      </h1>
      <h3>Profile photo</h3>
      <img
        className="rounded-full w-12"
        src={`./client/public/${user ? user.picture : ""}`}
        alt=""
      />
    </div>
  );
};

export default Update;
