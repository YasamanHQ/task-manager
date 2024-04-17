import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PlatformProvider } from "./features/platform/PlatformContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlatformProvider>
      <App />
    </PlatformProvider>
  </React.StrictMode>,
);
