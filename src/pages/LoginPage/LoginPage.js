import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  CssBaseline,
} from "@mui/material";
import logo from "../../assets/Icons/csiro-logo.png";
import "./LoginPage.css";

const LoginPage = () => {
  const [patientId, setPatientId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (patientId && password) {
      navigate("/main");
    }
  };

  return (
    <Container component="main" maxWidth="xl" className="loginPage">
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} className="center">
          <img className="logo" width={100} alt={"csiro"} src={logo} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3" align="center" fontWeight="bold">
            Practitioner Sign In
          </Typography>
        </Grid>

        <Grid item xs={12} container justifyContent="center" className="gridID">
          <TextField
            className="ID"
            placeholder="ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          className="gridPassword"
        >
          <TextField
            type="password"
            className="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Forgot Password?
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          className="gridSignIn"
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleSignIn}
            className="sign-in-button"
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
