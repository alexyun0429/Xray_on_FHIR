import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { getPatients } from "../../assets/API/API";

import PatientListComponent from "../../components/PatientListComponent/PatientListComponent";
import PatientDetail from "../PatientDetail/PatientDetail";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import Filter from "../../components/Filter/Filter";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import "./MainPage.css";

const MainPage = (props) => {
  const client = props.client;
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatientResult, setSelectedPatientResult] = useState(null);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [originalResults, setOriginalResults] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setAccessToken(client.state.tokenResponse.access_token);
  }, [client]);

  useEffect(() => {
    if (accessToken !== "") {
      getPatients(accessToken)
        .then((patients) => {
          setSearchResults(patients);
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken !== "") {
      getPatients(accessToken)
        .then((patients) => {
          setSearchResults(patients);
          setOriginalResults(patients); // Store the original list of patients
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
        });
    }
  }, [accessToken]);

  const handleFilter = (startDate, endDate) => {
    // Convert strings to Date objects for comparison
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Filter the search results
    const filteredResults = searchResults.filter((patient) => {
      const patientDate = new Date(patient.resource.birthDate); // Use the 'birthDate' field for filtering
      return patientDate >= start && patientDate <= end;
    });

    // Update the state with the filtered results
    setSearchResults(filteredResults);
  };

  const handleReset = () => {
    // Reset the filter by fetching the original list of patients
    getPatients(accessToken)
      .then((patients) => {
        setSearchResults(patients);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  const handlePatientResult = (result) => {
    setShowResult(!showResult);
    setSelectedPatientResult(result);
  };

  const handleSearch = (patientId, patientName) => {
    if (patientId === "" && patientName === "") {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
      let filteredResults = originalResults; // Start with the original, unfiltered list
      if (patientId !== "") {
        filteredResults = filteredResults.filter((p) =>
          p.resource.id.includes(patientId)
        );
      } else if (patientName !== "") {
        filteredResults = filteredResults.filter((p) =>
          p.resource.name[0].family
            .toLowerCase()
            .includes(patientName.toLowerCase())
        );
      }
      setSearchResults(filteredResults); // Update searchResults with the filtered list
    }
  };
  return (
    <Grid container className="mainPage">
      <Grid
        item
        xs={4}
        className={`leftSection ${showResult ? "leftSection-fullscreen" : ""}`}
      >
        {selectedPatientResult && (
          <div className="arrowFilterPosition">
            <Button
              variant="Text"
              className="backButton"
              onClick={() => handlePatientResult(null)}
            >
              <ArrowBackIcon />
            </Button>
            <Filter onFilter={handleFilter} onReset={handleReset} />
          </div>
        )}
        {selectedPatientResult ? (
          searchResults.map((result, index) => (
            <div className="card" key={index}>
              <PatientListComponent
                id={result.resource.id}
                name={result.resource.name[0]}
                date={result.resource.birthDate}
                onClick={() => setSelectedPatientResult(result.resource)}
              />
            </div>
          ))
        ) : (
          <div className="search-component">
            <SearchComponent
              patientId={patientId}
              patientName={patientName}
              isFormInvalid={isFormInvalid}
              onSearch={handleSearch}
              setPatientId={setPatientId}
              setPatientName={setPatientName}
            />
          </div>
        )}
      </Grid>

      <Grid
        item
        xs={8}
        className={`rightSection ${
          showResult ? "rightSection-fullscreen" : ""
        }`}
      >
        {selectedPatientResult ? (
          <>
            <div className="rightSection-patient-icons">
              <Button variant="Text" className="backButton"></Button>
              <Button variant="Text" className="fullscreenButton">
                <FullscreenIcon
                  className
                  fontSize="large"
                  onClick={() => setIsFullscreen(true)}
                />
              </Button>
            </div>
            <PatientDetail
              accessToken={accessToken}
              patient={selectedPatientResult}
              isFullscreen={isFullscreen}
              setIsFullscreen={setIsFullscreen}
            />
          </>
        ) : (
          <>
            <div className="filterPosition">
              <Filter onFilter={handleFilter} onReset={handleReset} />
            </div>
            {searchResults.map((result, index) => (
              <div className="card" key={index}>
                <PatientListComponent
                  id={result.resource.id}
                  name={result.resource.name[0]}
                  date={result.resource.birthDate}
                  onClick={() => handlePatientResult(result.resource)}
                />
              </div>
            ))}
          </>
        )}
      </Grid>
    </Grid>
  );
};
export default MainPage;
