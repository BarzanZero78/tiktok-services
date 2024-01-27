import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n/i18n.js";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
