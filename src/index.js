import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import SpacewebProvider from "@sprinklrjs/spaceweb/spacewebProvider";
import { Provider } from "react-redux";
import { store } from "./store";

import light from "@sprinklrjs/spaceweb-themes/hyperspace/light";

import "@sprinklrjs/spaceweb-themes/hyperspace/themeVars.min.css";

/**
 * Import utility stylesheet
 * https://frontend.sprinklr.com/spaceweb/guides/css-utilities#css-utilities
 */
import "@sprinklrjs/spaceweb-themes/utilities.min.css";

// normalize all styles that browser has to offer to make sure consistent experience across the browser
import "@sprinklrjs/spaceweb-themes/styles/normalize.min.css";

// import some global styles common in sprinklr, like font sizes of header tags, styles of anchor tag etc
import "@sprinklrjs/spaceweb-themes/styles/globals.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <SpacewebProvider theme={light}>
      <Provider store={store}>
        <App />
      </Provider>
    </SpacewebProvider>
  </React.StrictMode>
);
