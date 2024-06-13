import "./App.css";
import * as msTeams from "@microsoft/teams-js";

import Home from "./Home";
import { Preferences } from "./components/Preference/preference";
import { login } from "./store";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const pageUrl = useSelector((state) => state.route.value.url);

  const dispatch = useDispatch();

  msTeams.app.initialize().then(() => {
    console.log("Initalized");
    msTeams.app.getContext().then((context) => {
      console.log(JSON.stringify(context, null, 2));
      dispatch(login({ userId: context.user.id }));
    });
  });

  return (
    <div className="App">
      <div className="route-display">
        {pageUrl === "/" && <Home />}
        {pageUrl === "/preferences" && <Preferences />}
      </div>
    </div>
  );
}

export default App;
