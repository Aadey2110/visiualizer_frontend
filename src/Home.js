import * as msTeams from "@microsoft/teams-js";
import { useState } from "react";
export default function Home() {
  const [changes, setChanges] = useState("");

  fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setChanges(JSON.stringify(response, null, 2)));

  return (<div className="Home">
    <h1>Hello From Home</h1>
    <p>{changes}</p>
  </div>);
}
