import "./App.css";
import * as msTeams from "@microsoft/teams-js";

import Home from "./Home";
import { Preferences } from "./components/Preference/preference";
import { login } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

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
      </div>
    </div>
  );
}

export default App;
