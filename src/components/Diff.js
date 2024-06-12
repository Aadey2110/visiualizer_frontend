import React, { useState } from "react";
import { diffLines, formatLines } from "unidiff";
import { parseDiff, Diff, Hunk } from "react-diff-view";

import "react-diff-view/style/index.css";
// import './styles.css';

const EMPTY_HUNKS = [];

function extractSchemaValue(schema) {
  if (schema === null || schema.indexOf(`"""true"""`) === -1) {
    return "";
  }

  let newSchema = "";
  for (let i = schema.indexOf(`"""true"""`) + 11; i < schema.length; ++i) {
    newSchema += schema[i];
    if (schema[i] === "}") {
      break;
    }
  }
  return newSchema;
}

export function DisplayDiff({ oldText, newText }) {
  const oldSchema = extractSchemaValue(oldText);
  const newSchema = extractSchemaValue(newText);

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <div className="diff-display">
      <div style={{ display: "flex", paddingLeft: "40px" }}>
        <div style={{ width: "50%" }}>
          <button
            onClick={() => handleCopyToClipboard(oldSchema)}
            style={{ fontSize: "40px" }}
          >
            {" "}
            &#9112;
          </button>
        </div>
        <div style={{ width: "50%", paddingLeft: "40px" }}>
          <button
            onClick={() => handleCopyToClipboard(newSchema)}
            style={{ fontSize: "40px" }}
          >
            {" "}
            &#9112;
          </button>
        </div>
      </div>
      <div style={{ paddingTop: "10px" }}>
        <DiffView oldText={oldSchema} newText={newSchema} />
      </div>
    </div>
  );
}

function DiffView({ oldText, newText }) {
  console.log("Inside DiffView: ", oldText, newText);
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
