import React from "react";
import { diffLines, formatLines } from "unidiff";
import { parseDiff, Diff, Hunk } from "react-diff-view";

import "react-diff-view/style/index.css";

import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";

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

  return (
    <div className="diff-display">
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

  const handleCopyButton = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <div>
      <main>
        <Box className="flex" id="old-heading">
          <Box className="flex justify-between items-center border-t border-b border-l border-r w-1/2 px-3 py-2">
            <Box id="old-title">
              <Typography variant="body-14"> Old Code </Typography>
            </Box>
            <IconButton size={"xxs"} onClick={() => handleCopyButton(oldText)}>
              <CopyIcon />
            </IconButton>
          </Box>
          <Box className="flex justify-between items-center border-t border-b border-r w-1/2 px-3 py-2">
            <Box id="new-title">
              <Typography variant="body-14"> New Code </Typography>
            </Box>
            <IconButton
              size={"xxs"}
              onClick={() => () => handleCopyButton(newText)}
            >
              <CopyIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className="pt-3 border-l border-r border-b">
          <Diff viewType="split" diffType="" hunks={diff.hunks || EMPTY_HUNKS}>
            {(hunks) =>
              hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
            }
          </Diff>
        </Box>
      </main>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M48 181.4V424c0 22.1 17.9 40 40 40h242.6c22.1 0 40-17.9 40-40V181.4c0-22.1-17.9-40-40-40H88c-22.1 0-40 17.9-40 40z" />
      <path d="M141.4 88v28.4c0 2.2 1.8 4 4 4h198.2c26.4 0 48 21.6 48 48v198.2c0 2.2 1.8 4 4 4H424c22.1 0 40-17.9 40-40V88c0-22.1-17.9-40-40-40H181.4c-22.1 0-40 17.9-40 40z" />
    </svg>
  );
}
