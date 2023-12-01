import React from "react";
import { TextField, Button, Box } from "@mui/material";
import "./SearchComponent.css";

const SearchComponent = ({
  patientId,
  patientName,
  isFormInvalid,
  onSearch,
  setPatientId,
  setPatientName,
}) => {
  const handleSearchClick = () => {
    onSearch(patientId, patientName);
  };

  return (
    <Box className="leftSide">
      <TextField
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        error={isFormInvalid}
        helperText={isFormInvalid && "Please fill at least one field"}
      />
      <Box my={6}>
        <TextField
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          error={isFormInvalid}
          helperText={isFormInvalid && "Please fill at least one field"}
        />
      </Box>
      <button className="SearchBtn" onClick={handleSearchClick}>
        Search
      </button>
    </Box>
  );
};
export default SearchComponent;
