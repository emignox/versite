import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UidProvider } from "./context/app.context";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <UidProvider>
      <App />
    </UidProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
