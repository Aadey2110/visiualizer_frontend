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
      <div className="main-diff">
        {changes?.paths &&
          Object.keys(changes.paths).map((node) => {
            return (
              <div
                className="affeced-node-head"
                style={{
                  border: "7px solid black",
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

function DisplayNode({ name, pathsTo, nodeChanges }) {
  return (
    <div className="node-head">
      <h3 style={{ fontSize: "35px", fontWeight: "400" }}>Query : {name}</h3>
      <div className="all-paths">
        {Object.keys(pathsTo).map((endNode) => {
          return (
            <div
              className="nodewise-change"
              style={{
                border: "2px solid black",
                padding: "33px",
                margin: "40px 0px",
              }}
            >
              <h4 style={{ fontSize: "30px", fontWeight: "400" }}>
                Affected Fragment : {endNode}
              </h4>
              <div>
                <div style={{ fontSize: "30px", fontWeight: "400" }}>
                  Possible Paths :
                </div>
                <DisplayPaths paths={pathsTo[endNode]} />
              </div>
              <div className="diff-display">
                <DiffView
                  oldText={nodeChanges[endNode].oldValue}
                  newText={nodeChanges[endNode].newValue}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DisplayPaths({ paths }) {
  return (
    <div className="paths-head">
      {paths.map((path) => {
        return (
          <p className="path" style={{ margin: "20px 0px", fontSize: "26px" }}>
            {path.split(" -> ").map((currNode, index) => {
              return (
                <span>
                  {currNode}{" "}
                  {index !== path.split(" -> ").length - 1 && (
                    <span> &rarr; </span>
                  )}{" "}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
