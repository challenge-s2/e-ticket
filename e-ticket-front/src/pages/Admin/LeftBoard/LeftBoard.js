import React, { useState } from "react";
import styles from "./LeftBoard.module.scss";
import ItemCompanyLeftBoard from "./ItemCompanyLeftBoard/ItemCompanyLeftBoard";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom"
import ItemUserLeftBoard from "./ItemUserLeftBoard/ItemUserLeftBoard";

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
      {redirection ? <Navigate to='/auth/admin' replace /> : <></>}
      <div className={styles.container}>
        <ItemCompanyLeftBoard />
        <ItemUserLeftBoard />
        <div className={styles.logout_button}>
          <Button variant="contained" color="error" onClick={() => loggout()}>Déconnexion</Button>
        </div>
      </div>
    </>
  );
};

export default LeftBoard;
