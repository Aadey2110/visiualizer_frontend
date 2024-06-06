import * as msTeams from "@microsoft/teams-js";
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const [changes, setChanges] = useState("");

  useState(() => {
    axios.post('https://c761-203-110-85-250.ngrok-free.app/api/changes')
              .then((response) => setChanges(response.data));
  }, [changes])


  return (<div className="Home">
    <h1>Hello From Home</h1>
    <pre id="json">{changes}</pre>
  </div>);
}
