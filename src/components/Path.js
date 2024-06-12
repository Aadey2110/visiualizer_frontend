import { useState } from "react";

export function DisplayPaths({ paths }) {
  const [displayLength, setDisplayLength] = useState(Math.min(6, paths.length));
  const handleShowMoreButton = () => {
    setDisplayLength((oldState) => Math.min(oldState + 10, paths.length));
  };
  const handleShowLessButton = () => {
    setDisplayLength((oldState) => Math.max(6, oldState - 10));
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
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <div
      className="path-head"
      style={{
        border: "1.3px solid black",
        borderRadius: "15px",
        margin: "15px 0px",
        padding: "7px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row-reverse",
      }}
    >
      <div style={{ display: "flex", justifyContent: "right" }}>
        <button onClick={handleCopyButton} style={{ fontSize: "40px" }}>
          &#9112;
        </button>
      </div>
      <div className="path" style={{ fontSize: "18px", lineHeight: "1.7rem" }}>
        {path.split(" -> ").join(" → ")}
      </div>
    </div>
  );
}
