// Essentials
import "./App.css";
import { useState } from "react";
import * as msTeams from "@microsoft/teams-js";

//Components
import Home from "./Home";
import { Preferences } from "./components/Preference/preference";
import { LoginError } from "./components/Error/login";
import { Error404 } from "./components/Error/error";

// Redux Tools
import { login } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [intialized, setInitialized] = useState(false);

  const pageUrl = useSelector((state) => state.route.value.url);
  const dispatch = useDispatch();

  msTeams.app.initialize().then(() => {
    msTeams.app.getContext().then((context) => {
      console.log("Initalized");
      console.log(JSON.stringify(context, null, 2));
      dispatch(login({ userId: context.user.id }));
      setInitialized(true);
    });
  });

  return (
    <div className="App">
      <div className="route-display">
        {intialized && pageUrl === "/" && <Home />}
        {intialized && pageUrl === "/preferences" && <Preferences />}
        {intialized && pageUrl === "/error/login" && <LoginError />}
        {intialized && pageUrl === "/error/404" && <Error404 />}
      </div>
    </div>
  );
}

export default App;
