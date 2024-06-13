import { DisplayDiff } from "./Diff";
import { DisplayPaths } from "./Path";

// key -> node affected and values are list

export function DisplayNode({ name, pathsTo, nodeChanges }) {
  return (
    <div className="node-head">
      <h3 style={{ fontSize: "27px", fontWeight: "400" }}>Query : {name}</h3>
      <div className="all-paths">
        {Object.keys(pathsTo).map((endNode) => {
          return (
            <div
              className="nodewise-change"
              style={{
                border: "1.3px solid black",
                borderRadius: "30px",
                padding: "33px",
                margin: "40px 0px",
              }}
            >
              <h4 style={{ fontSize: "25px", fontWeight: "300" }}>
                Affected Fragment : {endNode}
              </h4>
              <div>
                <div style={{ fontSize: "25px", fontWeight: "300" }}>
                  Possible Paths :
                </div>
                <div>
                  <DisplayPaths paths={pathsTo[endNode]} />
                </div>
              </div>
              <div className="diff-display" style={{ paddingTop: "20px" }}>
                <DisplayDiff
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
