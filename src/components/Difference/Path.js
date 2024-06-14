import { useState } from "react";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";
import { Icon } from "@sprinklrjs/spaceweb/icon";

export function DisplayPaths({ paths }) {
  const [displayLength, setDisplayLength] = useState(Math.min(6, paths.length));
  const handleShowMoreButton = () => {
    setDisplayLength((oldState) => Math.min(oldState + 10, paths.length));
  };
  const handleShowLessButton = () => {
    setDisplayLength((oldState) => 6);
  };
  return (
    <div className="paths-head">
      {paths.map((path, index) => {
        if (index < displayLength) {
          return <DisplayPath path={path} />;
        }
      })}
      <div style={{ display: "flex", gap: "10px" }}>
        {displayLength < paths.length && (
          <div>
            <button
              onClick={handleShowMoreButton}
              style={{
                fontSize: "15px",
                fontWeight: "200",
                color: "blue",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Show more...
            </button>
          </div>
        )}
        {displayLength > 6 && (
          <div>
            <button
              onClick={handleShowLessButton}
              style={{
                fontSize: "15px",
                fontWeight: "200",
                color: "blue",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Show less...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DisplayPath({ path }) {
  const handleCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(path.split(" -> ").join(" → "));
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <Box className="border rounded-8 p-3 flex justify-between flex-row-reverse items-center gap-4 my-4">
      <div style={{ display: "flex", justifyContent: "right" }}>
        <IconButton size={"xs"} onClick={handleCopyButton}>
          <CopyIcon />
        </IconButton>
      </div>
      <Typography className="body-14">
        {path.split(" -> ").join(" → ")}
      </Typography>
    </Box>
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
