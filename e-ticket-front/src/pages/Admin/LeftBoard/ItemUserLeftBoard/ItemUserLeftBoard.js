import React from "react";
import styles from "./ItemUserLeftBoard.module.scss";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

import { Link, useLocation } from "react-router-dom";

const ItemUserLeftBoard = () => {

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
            <GroupRoundedIcon sx={{verticalAlign: 'middle'}}/> Utilisateurs
          </ListSubheader>
        }
      >
        <Link to={"/admin/users/list"} className={styles.link}>
          <ListItemButton sx={{borderRight: useLocation().pathname === '/admin/users/list' ? '3px solid black' : ''}}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Liste des utilisateurs" />
          </ListItemButton>
        </Link>
      </List>
    </div>
  );
};

export default ItemUserLeftBoard;
