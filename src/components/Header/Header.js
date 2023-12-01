import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import "./Header.css";
import logo from "./csiro-logo.png";
import { useState, useEffect } from "react";

const Header = (props) => {
  const client = props.client;
  const [practionerId, setPractionerId] = useState("");

  useEffect(() => {
    setPractionerId(client.user.id);
  }, [client]);
  return (
    <AppBar className="header">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img className="logo" width={50} alt={"csiro"} src={logo} />
        <div className="text">
          <Typography variant="h6" component="div" sx={{ flexGrow: 5 }}>
            {practionerId}
          </Typography>
          <SettingsOutlinedIcon
            className="icon"
            sx={{ fontSize: 32, marginLeft: 16 }}
          />
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
