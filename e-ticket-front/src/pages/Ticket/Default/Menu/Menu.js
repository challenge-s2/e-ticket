import React from "react";
import styles from "./Menu.module.scss";
import logoBlack from "../../../../utils/assets/Logo eTickets black.png"

import Button from '@mui/material/Button';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import TocRoundedIcon from '@mui/icons-material/TocRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { useLocation } from "react-router-dom";

const Menu = () => {
  console.log(useLocation().pathname);
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.not_connected}>
          <div className={styles.left}><WarningRoundedIcon sx={{verticalAlign: 'middle'}}/>Connectez-vous pour enregistrer vos tickets</div>
          <div className={styles.right}>
            <Button variant="contained" color='success' size='small'>Connexion</Button>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.text} style={{display: useLocation().pathname.startsWith('/ticket/my-tickets')  ? 'block' : 'none'}}>
            <TocRoundedIcon sx={{marginRight: '10px'}}/>
            Mes tickets
          </div>
          <div className={styles.text} style={{display: useLocation().pathname === '/ticket/my-profil' ? 'block' : 'none'}}>
            <EmojiPeopleRoundedIcon sx={{marginRight: '10px'}}/>
            Mon profil
          </div>
          <div className={styles.logo} style={{display: useLocation().pathname === '/ticket/' ? 'block' : 'none'}}>
            <img src={logoBlack} alt="Image of the logo"/>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Menu;
