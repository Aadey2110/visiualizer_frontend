import { useDispatch } from "react-redux";
import { navigate } from "./store";

import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Button } from "@sprinklrjs/spaceweb/button";

export function Navigation() {
  const dispatch = useDispatch();
  return (
    <div
      className="navigation-bar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px 50px",
      }}
    >
      <Typography variant="h2">Detect GQL Change</Typography>
      <div className="navs">
        <div style={{ cursor: "pointer" }}>
          <Button
            variant="tertiary"
            onClick={() => dispatch(navigate({ url: "/preferences" }))}
          >
            Set Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
