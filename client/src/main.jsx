import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import { StoreProvider } from "./utils/StoreProvider";
import { UserContextProvider } from "./utils/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </UserContextProvider>
  </BrowserRouter>
);
