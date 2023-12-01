import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Navigate instead of Redirect
import { Container } from "@mui/material";
import MainPage from "./pages/MainPage/MainPage";
import Header from "./components/Header/Header";
import "./App.css";

export default function App(props) {
  const client = props.client;

  return (
    <Container maxWidth={false} className="noPadding">
      <Router>
        <Header client={client} />
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/main" element={<MainPage />} /> */}
          <Route path="/" element={<MainPage client={client} />} />
          {/* <Route path="*" element={<Navigate to="/login" replace />} />  // Use Navigate component for redirection */}
        </Routes>
      </Router>
    </Container>
  );
}
