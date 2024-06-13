import "./App.css";
import * as msTeams from "@microsoft/teams-js";

import Home from "./Home";
import { Preferences } from "./components/Preference/preference";
import { login } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const reduxUserId = useSelector((state) => state.user.value.userId);

  const dispatch = useDispatch();
  const pageUrl = useSelector((state) => state.route.value.url);

  msTeams.app.initialize().then(() => {
    msTeams.app.getContext().then((context) => {
      console.log("Initalized");
      console.log(JSON.stringify(context, null, 2));
      setUserId(context.user.id);
    });
  });

  useEffect(() => {
    if (userId !== "") {
      dispatch(login({ userId: userId }));
    }
  }, [userId]);

  return (
    <div className="App">
      <div className="route-display">
        {reduxUserId !== "" && pageUrl === "/" && <Home />}
        {reduxUserId !== "" && pageUrl === "/preferences" && <Preferences />}
      </div>
    </div>
  );
}

export default App;
