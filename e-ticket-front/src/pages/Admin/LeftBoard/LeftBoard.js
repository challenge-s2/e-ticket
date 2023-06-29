import React from "react";
import styles from "./LeftBoard.module.scss";
import ItemCompanyLeftBoard from "./ItemCompanyLeftBoard/ItemCompanyLeftBoard";
import { Button } from "@mui/material";

const LeftBoard = () => {
  return (
    <div className={styles.container}>
      <ItemCompanyLeftBoard />
      <div className={styles.logout_button}>
        <Button variant="contained" color="error">Déconnexion</Button>
      </div>
    </div>
  );
};

export default LeftBoard;
