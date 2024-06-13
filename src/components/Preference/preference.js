import { useEffect, useState } from "react";
import { MultiSelect } from "@sprinklrjs/spaceweb/select";
import axios from "axios";
import { navigate } from "../../store";
import { useDispatch } from "react-redux";

// const options = {
//   Blueish: [
//     { label: 'AliceBlue', id: '#F0F8FF' },
//     { label: 'Aqua', id: '#00FFFF' },
//     { label: 'Aquamarine', id: '#7FFFD4' },
//   ],
//   Whiteish: [
//     { label: 'AntiqueWhite', id: '#FAEBD7' },
//     { label: 'Beige', id: '#F5F5DC' },
//   ],
// };

function getOptions(choices) {
  const options = { Queries: [], Mutations: [] };

  choices.forEach((choice) => {
    if (choice.type === "Query") {
      options["Queries"].push({ label: choice.name, id: choice.name });
    } else {
      options["Mutations"].push({ label: choice.name, id: choice.name });
    }
  });

  return options;
}

function ShowSpaceSelect({ choices }) {
  const [value, setValue] = useState([]);
  const [emptyError, setEmptyError] = useState(false);

  const dispatch = useDispatch();

  const handleSaveButton = () => {
    if (value.length) {
      console.log(value);
      axios
        .post(
          "https://teams-bot-app-service.onrender.com/api/preferences/save",
          { choices: value }
        )
        .then((response) => {
          if (response?.data?.success) {
            console.log("preferences saved");
            dispatch(navigate({ url: "/" }));
          } else {
            console.log(JSON.stringify(response, null, 2));
          }
        });
    } else {
      setEmptyError(true);
    }
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "35px",
          fontWeight: "300",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        Choose Queries and Mutations to get notificaions for -
      </h2>
      <MultiSelect
        multi
        hideSelectAll={true}
        maxDropdownHeight={"80vh"}
        filterOutSelected={false}
        options={getOptions(choices)}
        noResultsMsg="No characters found"
        onChange={(params) => {
          setEmptyError(false);
          setValue(params.value);
        }}
        value={value}
        closeOnSelect={false}
      />
      {emptyError && (
        <div style={{ color: "red" }}>
          Please Subscribe to at least one choice
        </div>
      )}
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

export function Preferences() {
  const [preferenceChoices, setPreferenceChoices] = useState([]);
  useEffect(() => {
    if (preferenceChoices.length === 0) {
      axios
        .get(
          "https://teams-bot-app-service.onrender.com/api/preferences/choices"
        )
        .then((response) => {
          if (response?.data?.success) {
            console.log(JSON.stringify(response.data.choices, null, 2));
            setPreferenceChoices((oldState) => response.data.choices);
          } else {
            console.log(JSON.stringify(response, null, 2));
          }
        });
    }
  }, [preferenceChoices]);

  return (
    <div className="preference-head">
      <ShowSpaceSelect choices={preferenceChoices} />
    </div>
  );
}
