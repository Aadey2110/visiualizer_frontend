import * as msTeams from "@microsoft/teams-js";
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [changes, setChanges] = useState("");

  useState(() => {
    axios.post('http://localhost:3978/api/changes')
              .then((response) => setChanges(JSON.stringify(response.data, null, 2)));
  }, [changes])


  return (<div className="Home">
    <h1 style={{textAlign: "center"}}>Hello From Home</h1>
    <pre id="json">{changes}</pre>
  </div>);
}
