import React from "react";
import styles from "./ItemProductLeftBoard.module.scss";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InventoryIcon from '@mui/icons-material/Inventory';

import { Link, useLocation } from "react-router-dom";

const ItemProductLeftBoard = () => {

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
            sx={{bgcolor: "#044395", padding: "1.5vh 0 !important" }}
            // sx={{ bgcolor: "#d6d6d6", padding: "1.5vh 0 !important" }}
          >
            <InventoryIcon sx={{verticalAlign: 'middle'}}/> Produit
          </ListSubheader>
        }
      >
        <Link to={"/app/new-product"} className={styles.link}>
          <ListItemButton sx={{borderRight: useLocation().pathname === '/app/new-product' ? '3px solid black' : ''}}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Ajouter un produit" />
          </ListItemButton>
        </Link>
        <Link to={"/app/list-products"} className={styles.link}>
          <ListItemButton sx={{borderRight: useLocation().pathname === '/app/list-products' ? '3px solid black' : ''}}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Liste des produits" />
          </ListItemButton>
        </Link>
      </List>
    </div>
  );
};

export default ItemProductLeftBoard;
