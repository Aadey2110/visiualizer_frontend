import * as msTeams from "@microsoft/teams-js";
import { useState } from "react";
export default function Home() {
  const [changes, setChanges] = useState("");

  fetch('https://c761-203-110-85-250.ngrok-free.app/api/changes', {
    method: "GET",
    headers: new Headers({
        "Content-Type": "application/json"
    }) })
            .then((response) => response.json())
            .then(json => setChanges(JSON.stringify(json, null, 2)));

  return (<div className="Home">
    <h1>Hello From Home</h1>
    <pre id="json">{changes}</pre>
  </div>);
}
