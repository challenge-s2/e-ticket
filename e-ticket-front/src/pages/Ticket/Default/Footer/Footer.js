import React, { useState, useEffect } from "react";
import styles from "./Footer.module.scss";
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Link, Navigate, useLocation } from "react-router-dom";

const Footer = ({handleChangePage}) => {
  const [value, setValue] = useState("home");

  const handleChange = (newValue) => {
    setValue(newValue);
    handleChangePage(newValue)
  };

  return (
    <>
      <div className={styles.bottom}>
        <Link to='/ticket/' className={styles.item_bottom} id={useLocation().pathname === "/ticket" ? styles.item_clicked : ""} onClick={() => handleChange("home")}>
            <div className={styles.item_text}>
              <HomeIcon sx={{verticalAlign: "middle", marginRight: "5px"}} />
              Accueil
            </div>
        </Link>
        <Link to='/ticket/my-tickets' className={styles.item_bottom} id={useLocation().pathname === "/ticket/my-tickets" ? styles.item_clicked : ""} onClick={() => handleChange("my-tickets")}>
          <div className={styles.item_text}>
            <ReceiptLongIcon sx={{verticalAlign: "middle", marginRight: "5px"}} />
            Mes tickets
          </div>
        </Link>
        <Link to='/ticket/my-profil' className={styles.item_bottom} id={useLocation().pathname === "/ticket/my-profil" ? styles.item_clicked : ""} onClick={() => handleChange("my-profil")}>
          <div className={styles.item_text}>
            <AccountCircleIcon sx={{verticalAlign: "middle", marginRight: "5px"}} />
            Mon profil
          </div>
        </Link>
      </div>
    </>
  );
};

export default Footer;
