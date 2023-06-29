import React from "react";
import styles from "./CommandNotFound.module.scss";
import CommandImage from "../../../../utils/assets/Report.png";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const CommandNotFound = () => {
  return (
    <>
      <div className={styles.returnButton}>
        <Link to="/app/list-old-commands">
          <IconButton
            variant="contained"
            sx={{ textAlign: "left" }}
            onClick={() => console.log("test")}
          >
            <ArrowBackIcon sx={{ fontSize: 50, color: "#353535" }} />
          </IconButton>
        </Link>
      </div>
      <div className={styles.container}>
        <h1>Command non trouvée</h1>
        <img loading="lazy" src={CommandImage} alt="Command not found" />
      </div>
    </>
  );
};

export default CommandNotFound;
