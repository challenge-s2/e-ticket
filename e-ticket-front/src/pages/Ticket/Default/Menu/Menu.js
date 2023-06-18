import React, { useState } from "react";
import styles from "./Menu.module.scss";
import logoBlack from "../../../../utils/assets/Logo eTickets black.png"

import Button from '@mui/material/Button';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import TocRoundedIcon from '@mui/icons-material/TocRounded';

const Menu = ({page}) => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.not_connected}>
          <div className={styles.left}>Connectez-vous pour enregistrer vos tickets</div>
          <div className={styles.right}>
            <Button variant="contained" color='success' size='small'>Connexion</Button>
          </div>
        </div>
        <div className={styles.wrapper}>
          {page === 'my-tickets' 
            ? 
              <div className={styles.text}>
                <TocRoundedIcon sx={{marginRight: '10px'}}/>
                Mes tickets
              </div>
            :
              page === 'my-profil' 
              
            ?
              <div className={styles.text}>
                <EmojiPeopleRoundedIcon sx={{marginRight: '10px'}}/>
                Mon profil
              </div>
            :
              <div className={styles.logo}>
                <img src={logoBlack} alt="Image of the logo"/>
              </div>
          }

        </div>
        
      </div>
    </>
  );
};

export default Menu;
