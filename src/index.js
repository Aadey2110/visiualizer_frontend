import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import SpacewebProvider from "@sprinklrjs/spaceweb/spacewebProvider";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpacewebProvider>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </SpacewebProvider>
);
