import "./App.css";
import * as msTeams from "@microsoft/teams-js";

import Home from "./Home";
import { Preferences } from "./components/Preference/preference";
import { store } from "./store";
import { Provider, useSelector } from "react-redux";

function App() {
  msTeams.app.initialize().then(() => {
    console.log("Initalized");
    msTeams.app.getContext().then((context) => {
      console.log(JSON.stringify(context, null, 2));
    });
  });
  return (
    <div className="App">
      <Provider store={store}>
        <RouterHandler />
      </Provider>
    </div>
  );
}

function RouterHandler() {
  const pageUrl = useSelector((state) => state.route.value.url);
  return (
    <div className="route-display">
      {pageUrl === "/" && <Home />}
      {pageUrl === "/preferences" && <Preferences />}
    </div>
  );
}

export default App;
