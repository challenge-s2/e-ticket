import React from 'react';
import styles from "./FirstItem.module.scss"
import { Button } from '@mui/material';
import iphone_img from "../../../../utils/assets/iphone_img2.png"


const FirstItem = () => {
  return(
    <>
      <div className={styles.container}>

        <div className={styles.left}>
          <div className={styles.title}>L'outils révolutionnaire qui vous permet de fidéliser votre clientèle</div>
          <div className={styles.description}>
            Grâce à eTickets, vous pouvez gérer vos processus de gestion de produits, de menus et de tickets dématérialisés.
            Une solution personnalité qui s'adapte à tout type d'entreprise.
            </div>
          <div className={styles.button}>
            <a href="#form">
              <Button variant='contained' size="large" color='warning' >
                  Contactez-nous
              </Button>  
            </a>
          </div>        
        </div>

        <div className={styles.right}>
          <img src={iphone_img} alt=""/>
        </div>

      </div>
    </>
  );
}

export default FirstItem;