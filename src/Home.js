// Essentials
import { useState } from "react";
import axios from "axios";

// Redux Tools
import { useSelector } from "react-redux";
import { navigate } from "./store";
import { useDispatch } from "react-redux";

// Components
import { DisplayNode } from "./components/Difference/Node";
import { Navigation } from "./Navbar";

export default function Home() {
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  const [changes, setChanges] = useState({}); // State to store the changes data
  const [display, setDisplay] = useState(false); // State to control the display of the Navigation component

  const userId = useSelector((state) => state.user.value.userId); // Get the userId from Redux store

  useState(() => {
    // Fetch changes data from the API when the component mounts
    axios
      .post("https://teams-bot-app-service.onrender.com/api/changes", {
        userId,
      })
      .then((response) => {
        console.log(response.data); // Log the response data for debugging
        if (response.data.success === true) {
          // If the response is successful, update the state
          setDisplay(true);
          setChanges({ ...response.data.changes });
        } else if (response.data.message === "login first") {
          // If the user needs to log in, navigate to the login error page
          dispatch(navigate({ url: "/error/login" }));
        } else if (response.data.message === "set user preference first") {
          // If the user needs to set preferences, navigate to the preferences page
          dispatch(navigate({ url: "/preferences" }));
        } else {
          // For any other errors, navigate to the 404 error page
          dispatch(navigate({ url: "/error/404" }));
        }
      });
  }, [changes]); // Dependency array to re-run effect if changes state updates

  return (
    <div className="Home">
      {display && <Navigation />}
      {/* Conditionally render Navigation component if display is true */}
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
