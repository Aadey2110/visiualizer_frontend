import "./App.css";
import * as msTeams from "@microsoft/teams-js";
import Home from "./Home";

function App() {
  msTeams.app.initialize().then(() => {
    console.log("Initalized");
  });
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
