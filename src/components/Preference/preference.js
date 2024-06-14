import { useEffect, useState } from "react";
import axios from "axios";
import { ShowSpaceSelect } from "./Select";

// Preferences component to manage and display user preferences
export function Preferences() {
  // State to store preference choices fetched from the server
  const [preferenceChoices, setPreferenceChoices] = useState([]);

  // useEffect hook to fetch preference choices when the component mounts
  useEffect(() => {
    // Check if preferenceChoices is empty before making the API call
    if (preferenceChoices.length === 0) {
      // Make a GET request to fetch preference choices from the server
      axios
        .get("http://localhost:3978/api/preferences/choices")
        .then((response) => {
          // If the response is successful, update the state with fetched choices
          if (response?.data?.success) {
            console.log(JSON.stringify(response.data.choices, null, 2));
            setPreferenceChoices((oldState) => response.data.choices);
          } else {
            // Log the response in case of an unsuccessful request
            console.log(JSON.stringify(response, null, 2));
          }
        });
    }
  }, [preferenceChoices]); // Dependency array ensures this effect runs only when preferenceChoices changes

  return (
    <div className="preference-head">
      {/* Render the ShowSpaceSelect component with the fetched preference choices */}
      <ShowSpaceSelect choices={preferenceChoices} />
    </div>
  );
}
