import { DisplayDiff } from "./Diff";
import { DisplayPaths } from "./Path";

import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Box } from "@sprinklrjs/spaceweb/box";

// key -> node affected and values are list

export function DisplayNode({ name, pathsTo, nodeChanges }) {
  return (
    <div className="node-head">
      <Typography weight={"regular"} variant="h3">
        Query : {name}
      </Typography>
      <div className="all-paths">
        {Object.keys(pathsTo).map((endNode) => {
          return (
            <Box className="border rounded-8 p-4 mt-4">
              <Typography variant="body-14">
                Affected Fragment : {endNode}
              </Typography>
              <div>
                <Typography variant="body-14">Possible Paths :</Typography>
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
            </Box>
          );
        })}
      </div>
    </div>
  );
}
