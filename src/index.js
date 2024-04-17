import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { ModalProvider } from "./context/ModalContext";
import { AlertProvider } from "./context/AlertContext";
import { Provider } from 'react-redux';
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <AuthProvider>
        <ModalProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </ModalProvider>
      </AuthProvider>
     </Provider>
  </React.StrictMode>
);
