import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FHIR from "fhirclient";

const root = ReactDOM.createRoot(document.getElementById("root"));
FHIR.oauth2
  .init({
    clientId: "8543647e-c7a6-4e0d-bba9-75878edeb3bd",
    scope: "launch/patient openid profile patient/*.cruds",
  })
  .then((client) => {
    root.render(
      <React.StrictMode>
        <App client={client} />
      </React.StrictMode>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
