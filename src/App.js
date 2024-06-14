// Essentials
import "./App.css";
import { useState } from "react";
import * as msTeams from "@microsoft/teams-js";

// Components
import Home from "./Home";
import { Preferences } from "./components/Preference/Preference";
import { LoginError } from "./components/Error/Login";
import { Error404 } from "./components/Error/Error";

// Redux Tools
import { login } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [intialized, setInitialized] = useState(true); // State to track if the app is initialized

  const pageUrl = useSelector((state) => state.route.value.url); // Get the current page URL from Redux store
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Initialize Microsoft Teams app and get the user context
  // msTeams.app.initialize().then(() => {
  //   msTeams.app.getContext().then((context) => {
  //     dispatch(login({ userId: context.user.id })); // Dispatch the login action with user ID
  //     setInitialized(true); // Set the initialized state to true
  //   });
  // });

  return (
    <div className="App">
      <div className="route-display">
        {/* Conditionally render components based on initialization status and current page URL */}
        {intialized && pageUrl === "/" && <Home />}
        {intialized && pageUrl === "/preferences" && <Preferences />}
        {intialized && pageUrl === "/error/login" && <LoginError />}
        {intialized && pageUrl === "/error/404" && <Error404 />}
      </div>
    </div>
  );
}

export default App;
