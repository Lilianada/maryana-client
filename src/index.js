import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { ModalProvider } from "./context/ModalContext";
import { AlertProvider } from "./context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>
);
