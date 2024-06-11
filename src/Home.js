import { useState } from "react";
import axios from "axios";
import { DiffView } from "./DisplayDiff";

export default function Home() {
  const [changes, setChanges] = useState({});

  useState(() => {
    axios.post("http://localhost:3978/api/changes").then((response) => {
      setChanges({ ...response.data });
    });
  }, [changes]);

  return (
    <div className="Home">
      <h1 style={{ textAlign: "center" }}>Hello From Home</h1>

      <pre id="json">{JSON.stringify(changes.paths, null, 2)}</pre>
      {changes?.changedValues &&
        Object.keys(changes.changedValues).map((node) => {
          console.log(node);
          return (
            <DiffView
              oldText={changes.changedValues[node].oldValue}
              newText={changes.changedValues[node].newValue}
            />
          );
        })}
    </div>
  );
}
