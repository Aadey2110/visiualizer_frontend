import { useState } from "react";
import axios from "axios";
import { DisplayNode } from "./components/Difference/Node";
import { useSelector } from "react-redux";
import { login, navigate } from "./store";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const [changes, setChanges] = useState({});
  const userId = useSelector((state) => state.user.value.userId);
  useState(() => {
    axios
      .post("https://teams-bot-app-service.onrender.com/api/changes", {
        userId,
      })
      .then((response) => {
        if (response.success === true) {
          setChanges({ ...response.data.changes });
        } else if (response.data.message === "login first") {
          dispatch(navigate({ url: "/error/login" }));
        } else if (response.data.message === "set user preference first") {
          dispatch(login({ url: "/preferences" }));
        } else {
          dispatch(login({ url: "/error/404" }));
        }
      });
  }, [changes]);

  return (
    <div className="Home">
      <Navigation />
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

function Navigation() {
  const dispatch = useDispatch();
  return (
    <div
      className="navigation-bar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "20px 50px",
      }}
    >
      <h1
        className="hero-title"
        style={{
          fontSize: "35px",
          fontWeight: "300",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        Detect GQL Change
      </h1>
      <div className="navs">
        <div style={{ cursor: "pointer" }}>
          <a
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              fontSize: "22px",
            }}
            onClick={() => dispatch(login({ url: "/preferences" }))}
          >
            Set Preferences
          </a>
        </div>
      </div>
    </div>
  );
}
