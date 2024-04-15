import { useState, useEffect } from "react";
import Login from "../components/log/login";
import Register from "../components/log/register";

function Connection() {
  const [showLogin, setShowLogin] = useState(false);

  // Check for JWT token every time the component is rendered
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt"));
    setShowLogin(!token);
  }, []);

  return (
    <div>
      <div>
        {showLogin ? (
          <Login className=" fadeInOut" switchView={setShowLogin} />
        ) : (
          <Register className="fadeInOut " switchView={setShowLogin} />
        )}
      </div>
    </div>
  );
}

export default Connection;
