import React from "react";
import styles from "./ItemCompanyLeftBoard.module.scss";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';

import { Link, useLocation } from "react-router-dom";

const ItemCompanyLeftBoard = () => {

  return (
    <div className={styles.container}>
      <List
        sx={{ width: "100%", maxWidth: 360, color: "white" , textAlign: 'center'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{bgcolor: "#950404", padding: "1.5vh 0 !important" }}
            // sx={{ bgcolor: "#d6d6d6", padding: "1.5vh 0 !important" }}
          >
            <StorefrontRoundedIcon sx={{verticalAlign: 'middle'}}/> Entreprises
          </ListSubheader>
        }
      >
        <Link to={"/admin/company/new"} className={styles.link}>
          <ListItemButton sx={{borderRight: useLocation().pathname === '/admin/company/new' ? '3px solid black' : ''}}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Ajouter une entreprise" />
          </ListItemButton>
        </Link>
        <Link to={"/admin/company/list"} className={styles.link}>
          <ListItemButton sx={{borderRight: useLocation().pathname === '/admin/company/list' ? '3px solid black' : ''}}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Liste des entreprises" />
          </ListItemButton>
        </Link>
      </List>
    </div>
  );
};

export default ItemCompanyLeftBoard;
