import React, { useState } from "react";
import styles from "./LeftBoard.module.scss";
import ItemCommandLeftBoard from "./ItemCommandLeftBoard/ItemCommandLeftBoard";
import ItemProductLeftBoard from "./ItemProductLeftBoard/ItemProductLeftBoard";
import ItemSettingsLeftBoard from "./ItemSettingsLeftBoard/ItemSettingsLeftBoard";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";

const LeftBoard = () => {
  const [redirection, setRedirection] = useState(false)
  const loggout = () => {
    localStorage.setItem("userId", '')
    localStorage.setItem("user", '')
    localStorage.setItem("companyId", '')
    setRedirection(true)
  }
  return (
    <>
      {redirection ? <Navigate to='/auth' replace /> : <></>}
      <div className={styles.container}>
        <ItemCommandLeftBoard opened={true} />
        <ItemProductLeftBoard />
        <ItemSettingsLeftBoard />
        <div className={styles.logout_button}>
          <Button variant="contained" color="error" onClick={() => loggout()}>Déconnexion</Button>
        </div>
      </div>
    </>
  );
};

export default LeftBoard;
