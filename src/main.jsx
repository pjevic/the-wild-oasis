/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { suppressReactWarnings } from "./utils/supressWarnings.js";

suppressReactWarnings();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
