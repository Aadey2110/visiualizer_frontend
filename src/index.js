import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import SpacewebProvider from "@sprinklrjs/spaceweb/spacewebProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpacewebProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SpacewebProvider>
);
