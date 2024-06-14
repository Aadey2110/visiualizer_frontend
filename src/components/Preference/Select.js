import { useState } from "react";
import { MultiSelect } from "@sprinklrjs/spaceweb/select";
import { Box } from "@sprinklrjs/spaceweb/box";
import axios from "axios";
import { navigate } from "../../store";
import { useDispatch, useSelector } from "react-redux";

// Function to transform choices into options for the MultiSelect component
function getOptions(choices) {
  // Initialize an object to store categorized options
  const options = { Queries: [], Mutations: [] };

  // Categorize each choice as either "Query" or "Mutation"
  choices.forEach((choice) => {
    if (choice.type === "Query") {
      options["Queries"].push({ label: choice.name, id: choice.name });
    } else {
      options["Mutations"].push({ label: choice.name, id: choice.name });
    }
  });

  return options; // Return the categorized options
}

// Component to display and handle user selection of preferences
export function ShowSpaceSelect({ choices }) {
  // State to manage selected values and error state
  const [value, setValue] = useState([]);
  const [emptyError, setEmptyError] = useState(false);

  // Use Redux hooks to dispatch actions and access the user ID from the store
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.value.userId);

  // Handler function for the save button click event
  const handleSaveButton = () => {
    // Check if any value is selected
    if (value.length) {
      console.log(value); // Log selected values for debugging
      // Make a POST request to save preferences
      axios
        .post(
          "https://teams-bot-app-service.onrender.com/api/preferences/save",
          {
            environment: "lite.qa6",
            choices: value,
            userId: userId,
          }
        )
        .then((response) => {
          // Handle successful response
          if (response?.data?.success) {
            console.log("preferences saved");
            dispatch(navigate({ url: "/" })); // Navigate to home page on success
          } else {
            // Log the response in case of an error
            console.log(JSON.stringify(response, null, 2));
          }
        });
    } else {
      // Set error state if no value is selected
      setEmptyError(true);
    }
  };

  return (
    <div>
      {/* Header with instructions */}
      <h2
        style={{
          fontSize: "35px",
          fontWeight: "300",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        Choose Queries and Mutations to get notifications for -
      </h2>
      {/* MultiSelect component for user to select preferences */}
      <Box className="px-4 w-96">
        <MultiSelect
          multi
          hideSelectAll={true}
          maxDropdownHeight={"55vh"}
          filterOutSelected={false}
          options={getOptions(choices)} // Set options from transformed choices
          noResultsMsg="No characters found"
          onChange={(params) => {
            setEmptyError(false); // Reset error state on change
            setValue(params.value); // Update selected values
          }}
          value={value}
          closeOnSelect={false}
        />
      </Box>
      {/* Display error message if no choice is selected */}
      {emptyError && (
        <div style={{ color: "red" }}>
          Please Subscribe to at least one choice
        </div>
      )}
      {/* Save button to submit the selected preferences */}
      <div
        className="save-btn"
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <button
          style={{
            padding: "13px 15px",
            backgroundColor: "blue",
            color: "white",
            fontSize: "17px",
            fontWeight: "250",
            borderRadius: "6px",
          }}
          onClick={handleSaveButton}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
