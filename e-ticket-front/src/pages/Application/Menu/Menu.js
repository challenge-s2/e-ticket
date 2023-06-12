import React from "react";
import styles from "./Menu.module.scss";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AccountButton from "../AccountButton/AccountButton";
import { Link, Navigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Menu = ({ link_new_command }) => {
  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left}></div>
        <div className={styles.middle}></div>
        <div className={styles.right}>
          <Button variant="contained" color="success" startIcon={<AddIcon />}>
            <Link to={"/app/new-command"}>Nouvelle commande</Link>
          </Button>
          <AccountButton />
        </div>
      </nav>
    </>
  );
};

export default Menu;
