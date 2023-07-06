import React, { useState } from "react";
import styles from "./LeftBoardMobile.module.scss";
import ItemCompanyLeftBoard from "./ItemCompanyLeftBoard/ItemCompanyLeftBoard";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import ItemUserLeftBoard from "./ItemUserLeftBoard/ItemUserLeftBoard";

const LeftBoardMobile = ({ open, setOpen }) => {
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
        <Drawer open={open} onClose={() => setOpen(false)}>
          <ItemCompanyLeftBoard />
          <ItemUserLeftBoard />
          <div className={styles.logout_button} style={{ display: "flex", margin: '50px 0' }}>
            <Button variant="contained" color="error" sx={{ margin: "0 auto" }} onClick={() => loggout()}>
              Déconnexion
            </Button>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default LeftBoardMobile;
