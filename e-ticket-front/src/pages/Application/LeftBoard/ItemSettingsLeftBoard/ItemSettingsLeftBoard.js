import React, { useState } from "react";
import styles from "./ItemSettingsLeftBoard.module.scss";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContactSupport from "../../ContactSupport/ContactSupport";

import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";

import { Link, useLocation } from "react-router-dom";

const ItemSettingsLeftBoard = () => {
  const [openContactSupport, setOpenContactSupport] = useState(false);
  const [typeOfReport, setTypeOfReport] = useState(null);
  const [report, setReport] = useState("");

  return (
    <div className={styles.container}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          color: "white",
          textAlign: "center",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ bgcolor: "#044395", padding: "1.5vh 0 !important" }}
            // sx={{ bgcolor: "#d6d6d6", padding: "1.5vh 0 !important" }}
          >
            <SettingsIcon /> Paramêtres
          </ListSubheader>
        }
      >
        {/* Mes informations */}
        <Link to={"/app/my-informations"} className={styles.link}>
          <ListItemButton
            sx={{
              borderRight:
                useLocation().pathname === "/app/my-informations"
                  ? "3px solid black"
                  : "",
            }}
          >
            <ListItemIcon>
              <ContactEmergencyIcon />
            </ListItemIcon>
            <ListItemText primary="Mes informations" />
          </ListItemButton>
        </Link>

        {/* Contacter le support */}
        <ListItemButton
          onClick={() => setOpenContactSupport(true)}
          sx={{ color: "#000" }}
        >
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Contacter le support" />
        </ListItemButton>
      </List>
      <ContactSupport
        open={openContactSupport}
        handleClose={() => setOpenContactSupport(false)}
        typeOfReport={typeOfReport}
        setTypeOfReport={setTypeOfReport}
        report={report}
        setReport={setReport}
      />
    </div>
  );
};

export default ItemSettingsLeftBoard;
