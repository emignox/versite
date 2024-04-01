import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UidProvider } from "./context/app.context";
import "./index.css";
import { PostProvider } from "./context/post.context";

ReactDOM.render(
  <React.StrictMode>
    <PostProvider>
      <UidProvider>
        <App />
      </UidProvider>
    </PostProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
