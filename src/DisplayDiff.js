import React from "react";
import { diffLines, formatLines } from "unidiff";
import { parseDiff, Diff, Hunk } from "react-diff-view";

import "react-diff-view/style/index.css";
// import './styles.css';

const EMPTY_HUNKS = [];

export function DiffView({ oldText, newText }) {
  const diffText = formatLines(diffLines(oldText, newText), { context: 3 });
  const [diff] = parseDiff(diffText, { nearbySequences: "zip" });

  return (
    <div>
      <main>
        <Diff viewType="split" diffType="" hunks={diff.hunks || EMPTY_HUNKS}>
          {(hunks) =>
            hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
          }
        </Diff>
      </main>
    </div>
  );
}
