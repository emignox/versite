// App.js
import { useState } from "react";
import Login from "../components/log/login";
import Register from "../components/log/register";

function Connection() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
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
