import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export const LocationSearchInput = ({ setLatLng }) => {
  const [address, setAddress] = useState("");

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLng(latLng))
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {renderInput}
    </PlacesAutocomplete>
  );
};

const renderInput = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading
}) => {
  return (
    <div style={styles.inputContainer}>
      <input
        {...getInputProps({
          placeholder: "Search Places ..."
        })}
        style={styles.input}
      />
      <div style={styles.dropDown}>
        {loading && <div>Loading...</div>}
        {suggestions.map(renderInlineSuggestion(getSuggestionItemProps))}
      </div>
    </div>
  );
};

const renderInlineSuggestion = (getSuggestionItemProps) => (
  suggestion,
  index
) => {
  return (
    <div
      {...getSuggestionItemProps(suggestion, {
        style: styles.suggestion
      })}
      key={index}
    >
      <span>{suggestion.description}</span>
    </div>
  );
};

const styles = {
  inputContainer: {
    alignSelf: "center",
    marginLeft: -5,
    padding: 5
  },
  input: {
    padding: 10,
    width: 300
  },
  suggestion: {
    backgroundColor: "#ffffff",
    cursor: "pointer",
    padding: 5,
    textAlign: "left",
    maxWidth: 300
  },
  dropDown: {
    borderBottom: "honeydew",
    borderLeft: "honeydew",
    borderRight: "honeydew",
    borderTop: "1px solid #e6e6e6",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    borderRadius: "0 0 2px 2px",
    display: "flex",
    flexDirection: "column",
    position: "absolute"
  }
};
