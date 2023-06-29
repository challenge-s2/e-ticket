import React, { useState } from "react";
import styles from "./ItemCommandLeftBoard.module.scss";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

const ItemCommandLeftBoard = ({ opened }) => {
  const [open, setOpen] = useState(opened);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <List
        sx={{ width: "100%", maxWidth: 360, color: "white", textAlign: 'center'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ bgcolor: "#044395", padding: "1.5vh 0 !important" }}
            // sx={{ bgcolor: "#4F4F4F" }}
          >
            <ShoppingCartIcon sx={{verticalAlign: 'middle'}}/> Commandes
          </ListSubheader>
        }
      >
        <Link to={"/app/new-command"} className={styles.link}>
          <ListItemButton sx= {{borderRight: useLocation().pathname === '/app/new-command' ? "3px solid black" : '' }}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Nouvelle commande" />
          </ListItemButton>
        </Link>
        <ListItemButton
          onClick={handleClick}
          
        >
          <ListItemIcon sx={{ marginTop: "1vh", marginBottom: "1vh" }}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Anciennes commandes" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={styles.link} sx={{borderRight: useLocation().pathname === '/app/list-old-commands' ? "3px solid black" : ""}}>
              <Link to={"/app/list-old-commands"}> 
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <FormatListBulletedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Liste" />
                </ListItemButton>
              </Link>
            </List>
        </Collapse>
      </List>
    </div>
  );
};

export default ItemCommandLeftBoard;
