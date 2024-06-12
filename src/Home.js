import { useState } from "react";
import axios from "axios";
import { DisplayNode } from "./components/Node";

export default function Home() {
  const [changes, setChanges] = useState({});

  useState(() => {
    axios
      .post("https://teams-bot-app-service.onrender.com/api/changes")
      .then((response) => {
        setChanges({ ...response.data });
      });
  }, [changes]);

  return (
    <div className="Home">
      <h1 style={{ textAlign: "center" }}>Detect GQL Change</h1>
      <div className="main-diff">
        {changes?.paths &&
          Object.keys(changes.paths).map((node) => {
            return (
              <div
                className="affeced-node-head"
                style={{
                  border: "2px solid black",
                  padding: "20px 33px",
                  margin: "40px 0px",
                }}
              >
                <DisplayNode
                  name={node}
                  pathsTo={changes.paths[node]}
                  nodeChanges={changes.changedValues}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
