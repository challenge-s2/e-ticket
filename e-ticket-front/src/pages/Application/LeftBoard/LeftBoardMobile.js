import React from "react";
import styles from "./LeftBoardMobile.module.scss";
import ItemCommandLeftBoard from "./ItemCommandLeftBoard/ItemCommandLeftBoard";
import ItemProductLeftBoard from "./ItemProductLeftBoard/ItemProductLeftBoard";
import ItemSettingsLeftBoard from "./ItemSettingsLeftBoard/ItemSettingsLeftBoard";
import Drawer from "@mui/material/Drawer";

const LeftBoardMobile = ({ open, setOpen }) => {
  return (
    <div className={styles.container}>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ItemCommandLeftBoard opened={true} />
        <ItemProductLeftBoard />
        <ItemSettingsLeftBoard />
      </Drawer>
    </div>
  );
};

export default LeftBoardMobile;
