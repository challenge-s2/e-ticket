import React from "react";
import styles from "./LeftBoard.module.scss";
import ItemCommandLeftBoard from "./ItemCommandLeftBoard/ItemCommandLeftBoard";
import ItemProductLeftBoard from "./ItemProductLeftBoard/ItemProductLeftBoard";
import ItemSettingsLeftBoard from "./ItemSettingsLeftBoard/ItemSettingsLeftBoard";
import { Button } from "@mui/material";

const LeftBoard = () => {
  return (
    <div className={styles.container}>
      <ItemCommandLeftBoard opened={true} />
      <ItemProductLeftBoard />
      <ItemSettingsLeftBoard />
      <div className={styles.logout_button}>
        <Button variant="contained" color="error">Déconnexion</Button>
      </div>
    </div>
  );
};

export default LeftBoard;
