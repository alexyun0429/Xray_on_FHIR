import React, { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";

import { getProcedures, downloadImage, postMedia } from "../../assets/API/API";
import "./PatientDetail.css";
import CircularProgress from "@mui/material/CircularProgress";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const PatientDetail = ({
  patient,
  accessToken,
  isFullscreen,
  setIsFullscreen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [procedure, setProcedure] = useState(null);
  const [la, setLa] = useState(null);
  const [pa, setPa] = useState(null);
  const [laBlob, setLaBlob] = useState(null);
  const [paBlob, setPaBlob] = useState(null);
  const [extractedImages, setExtractedImages] = useState([]);
  const [textFileContent, setTextFileContent] = useState(null);

  useEffect(() => {
    downloadImage(pa, setPaBlob);
    downloadImage(la, setLaBlob);
  }, [pa, la]);

  useEffect(() => {
    if (accessToken !== "") {
      getProcedures(accessToken, patient.id)
        .then((procedure) => {
          setProcedure(procedure.entry);
        })
        .catch((error) => {
          console.error("Error fetching patients:", error);
        });
    }
  }, [accessToken, patient.id]);

  useEffect(() => {
    if (procedure) {
      const xray = procedure.filter(
        (p) => p.resource.code.coding[0].display === "X-ray exam on hand"
      );

      const pictures = xray[0].resource.code.text.split(",");

      setLa(pictures[0]);
      setPa(pictures[1]);
      console.log(patient);
    }
  }, [procedure]);

  if (!patient) {
    return null;
  }

  function formatUserName(nameObject) {
    const { given, family } = nameObject;
    const givenNames = given.join(" ");
    const formattedName = `${givenNames} ${family}`;
    return formattedName;
  }

  if (isFullscreen) {
    return (
      <div className={`patient-detail ${isFullscreen ? "fullscreen" : ""}`}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <p className="result-header-fullscreen">Result</p>
            <p className="name-header">{formatUserName(patient.name[0])}</p>
            <p>ID: {patient.id}</p>
            <p>Gender: {patient.gender}</p>
            <p>Date: {patient.birthDate}</p>
            {extractedImages.length === 0 &&
              (isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  className="post-media"
                  variant="outlined"
                  onClick={() => {
                    postMedia(
                      setIsLoading,
                      laBlob,
                      paBlob,
                      setExtractedImages,
                      setTextFileContent
                    );
                  }}
                  disabled={isLoading}
                  style={{
                    color: "black",
                    borderColor: "black",
                    marginTop: "50px",
                  }}
                >
                  {"Run model"}
                </Button>
              ))}
          </Grid>
          <Grid item xs={6}>
            <FullscreenExitIcon
              fontSize="large"
              className="fullscreen-exit"
              onClick={() => setIsFullscreen(false)}
            />
            <div className="frature-type-fullscreen">
              {textFileContent && (
                <>
                  <p>Fracture type:</p>
                  <pre>{textFileContent}</pre>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <div>
          <div className="headers">
            <p className="x-ray-header">X-RAY</p>
            {extractedImages.length > 0 && (
              <p className="heatmap-header">HEAT MAPS</p>
            )}
          </div>
          <div className="x-ray-container">
            <div className="x-ray-picture">
              <img width={150} height={250} src={pa} alt="pa" />
              <p>PA view</p>
            </div>
            <div className="x-ray-picture-2">
              <img width={150} height={250} src={la} alt="lat" />
              <p>Lateral View</p>
            </div>
            {extractedImages.length > 0 &&
              extractedImages.map((image, index) => (
                <div key={index} className="heatmap-picture">
                  <img
                    width={150}
                    height={250}
                    src={URL.createObjectURL(image.blob)}
                    alt={image.name}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item m={6}>
            <p className="result-header">Result</p>
            <p className="name-header">{formatUserName(patient.name[0])}</p>
            <p>ID: {patient.id}</p>
            <p>Gender: {patient.gender}</p>
            <p>Date: {patient.birthDate}</p>
            {extractedImages.length === 0 &&
              (isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  className="post-media"
                  variant="outlined"
                  onClick={() => {
                    postMedia(
                      setIsLoading,
                      laBlob,
                      paBlob,
                      setExtractedImages,
                      setTextFileContent
                    );
                  }}
                  disabled={isLoading}
                  style={{
                    color: "black",
                    borderColor: "black",
                    marginTop: "50px",
                  }}
                >
                  {"Run model"}
                </Button>
              ))}
          </Grid>
          <Grid item m={6}>
            <div className="frature_type">
              {textFileContent && (
                <>
                  <p>Fracture type:</p>
                  <pre>{textFileContent}</pre>
                </>
              )}
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={20}>
          <Grid item m={6}>
            <p className="x-ray-header-small-screen">X-RAY</p>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <p className="label">PA view</p>
              </Grid>
              <Grid item xs={3}>
                <img width={150} height={250} src={pa} alt={"pa"} />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <p className="label">Lateral View</p>
              </Grid>
              <Grid item xs={3}>
                <img width={150} height={250} src={la} alt={"lat"} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item m={6}>
            {extractedImages.length > 0 && (
              <p className="heatmap_header">HEAT MAPS</p>
            )}
            {extractedImages.map((image, index) => (
              <div key={index}>
                <img
                  width={150}
                  height={250}
                  src={URL.createObjectURL(image.blob)}
                  alt={image.name}
                />
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default PatientDetail;
