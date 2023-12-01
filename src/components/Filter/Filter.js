import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import "./Filter.css";

/**
 * Renders a filter component with start and end date fields. Allows the user to select a date range and perform filtering based on the selected dates.
 *
 * @param {Object} props - The props object.
 * @param {function} props.onFilter - A callback function to handle the filter action.
 * @param {function} props.onReset - A callback function to handle the reset action.
 * @returns {JSX.Element} The rendered filter component.
 */
const Filter = ({ onFilter, onReset }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFields, setShowFields] = useState(false);

  const resetFields = () => {
    setStartDate("");
    setEndDate("");
  };

  const handleFilter = () => {
    if (startDate === "" || endDate === "") {
      alert("Please select both start and end dates");
    } else {
      onFilter(startDate, endDate);
      resetFields(); // Reset the fields after handling the filter
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <DateRangeIcon onClick={() => setShowFields(!showFields)} />
      {showFields && (
        <div className="calendar-detail">
          <TextField
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <button className="btn1" onClick={handleFilter}>
            Search
          </button>

          <button className="btn1" onClick={onReset}>
            Reset
          </button>
        </div>
      )}
    </Box>
  );
};

export default Filter;
