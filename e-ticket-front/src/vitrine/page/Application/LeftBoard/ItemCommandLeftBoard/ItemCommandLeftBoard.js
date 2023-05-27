import React from "react";
import styles from "./ItemCommandLeftBoard.module.scss";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendIcon from "@mui/icons-material/Send";

import { Link } from "react-router-dom";

const ItemCommandLeftBoard = ({ opened }) => {
  const [open, setOpen] = React.useState(opened);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <List
        sx={{ width: "100%", maxWidth: 360, color: "white" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ bgcolor: "#24447b" }}
            // sx={{ bgcolor: "#4F4F4F" }}
          >
            Commandes
          </ListSubheader>
        }
      >
        <ListItemButton>
          <Link to={"/app/new-command"} className={styles.link}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Nouvelle commande" />
          </Link>
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Anciènnes commandes" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Link to={"/app/list-old-commands"} className={styles.link}>
                <ListItemIcon>
                  <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Liste" />
              </Link>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default ItemCommandLeftBoard;
