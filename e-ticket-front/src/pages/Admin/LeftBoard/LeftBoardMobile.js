import React from "react";
import styles from "./LeftBoardMobile.module.scss";
import ItemCompanyLeftBoard from "./ItemCompanyLeftBoard/ItemCompanyLeftBoard";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";

const LeftBoardMobile = ({ open, setOpen }) => {
  return (
    <div className={styles.container}>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ItemCompanyLeftBoard />
        <div className={styles.logout_button} style={{ display: "flex" }}>
          <Button variant="contained" color="error" sx={{ margin: "0 auto" }}>
            Déconnexion
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default LeftBoardMobile;